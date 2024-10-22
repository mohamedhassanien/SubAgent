import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { Resume } from './../models/cv';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Upload } from 'src/app/shared/services/upload/upload';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
})
export class CvFormComponent implements OnInit {
  @Output() FormValuesChange: EventEmitter<any> = new EventEmitter();
  cvForm: FormGroup;
  resume = {} as Resume;
  active = 'info';

  constructor(private _Fb: FormBuilder, private _UploadService: UploadService) {
    this.cvForm = this._Fb.group({
      fullName: '',
      headline: '',
      adress: '',
      jobTitle: '',
      email: '',
      city: '',
      phone: '',
      linkedIn: '',
      zipcode: '',
      nationality: '',
      placeOfBirth: '',
      dateOfBirth: '',
      summary: '',
      exp: this._Fb.array([this.newExp()]),
      edu: this._Fb.array([this.newEdu()]),
      skill: this._Fb.array([this.newSkill()]),
      lang: this._Fb.array([this.newLang()]),
    });

    this.onExpChange();
    this.onEduChange();
    this.onSkillChange();
    this.onLanguageChange();
  }

  ngOnInit(): void {}

  changeData(e: any, identifier: string) {
    this.resume[identifier] = e.target.value;
    this.FormValuesChange.emit(this.resume);
  }

  // on Expericane values change
  onExpChange() {
    this.exp.valueChanges.subscribe((value) => {
      this.resume.exps = value;
      this.FormValuesChange.emit(this.resume);
    });
  }

  // on Education values change
  onEduChange() {
    this.edu.valueChanges.subscribe((value) => {
      this.resume.edus = value;
      this.FormValuesChange.emit(this.resume);
    });
  }

  // on Skill values change
  onSkillChange() {
    this.skill.valueChanges.subscribe((value) => {
      this.resume.skills = value;
      this.FormValuesChange.emit(this.resume);
    });
  }

  // on Skill values change
  onLanguageChange() {
    this.lang.valueChanges.subscribe((value) => {
      this.resume.langs = value;
      this.FormValuesChange.emit(this.resume);
    });
  }

  // To get experiance form
  get exp(): FormArray {
    return this.cvForm.get('exp') as FormArray;
  }

  // To get education form
  get edu(): FormArray {
    return this.cvForm.get('edu') as FormArray;
  }

  // To get skills form
  get skill(): FormArray {
    return this.cvForm.get('skill') as FormArray;
  }

  // To get language form
  get lang(): FormArray {
    return this.cvForm.get('lang') as FormArray;
  }

  // initalize Experiance Form
  newExp(): FormGroup {
    return this._Fb.group({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      present: false,
    });
  }

  // initalize Education Form
  newEdu(): FormGroup {
    return this._Fb.group({
      programName: '',
      schName: '',
      city: '',
      country: '',
      startDate: '',
      endDate: '',
      present: false,
    });
  }

  // initalize skills Form.
  newSkill(): FormGroup {
    return this._Fb.group({
      name: '',
      level: '',
    });
  }

  // initalize languages Form.
  newLang(): FormGroup {
    return this._Fb.group({
      name: '',
      level: '',
    });
  }

  // To add new Field.
  addField(identifier: string) {
    if (identifier == 'exp') {
      this.exp.push(this.newExp());
    } else if (identifier == 'edu') {
      this.edu.push(this.newEdu());
    } else if (identifier == 'lang') {
      this.lang.push(this.newEdu());
    } else {
      this.skill.push(this.newSkill());
    }
  }

  // To remove Field.
  removeFields(i: number, identifier: string) {
    if (identifier == 'edu') {
      this.edu.removeAt(i);
    } else if (identifier == 'exp') {
      this.exp.removeAt(i);
    } else if (identifier == 'lang') {
      this.lang.removeAt(i);
    } else {
      this.skill.removeAt(i);
    }
  }

  fileSelected!: File;
  currentImage!: Upload;

  // To choose an image
  // chooseImage(event: any): void {
  //   const file = <File>event.target.files[0];
  //   this.fileSelected = file;
  //   this.uploadImage('image');
  // }

  // Upload
  // uploadImage(type: string): void {
  //   const file: File = this.fileSelected;
  //   this.currentImage = new Upload(file);
  //   this._UploadService
  //     .uploadFile(this.currentImage, type)
  //     .subscribe((percentage) => {
  //       if (percentage === 100) {
  //         localStorage.setItem('picture', this.currentImage.url);
  //       }
  //     });
  // }

  imageURL!: string;

  showPreview(event: any) {
    const file = event.target.files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // export view page to PDF
  exportToPDF() {
    let selector = 'pdfContent';
    let node: any = document.getElementById('el')!;
    html2canvas(node, {
      scrollX: 0,
      scrollY: 0,
      scale: 5,
    })
      .then((canvas) => {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        //The height of the canvas which one pdf page can show;
        let pageHeight = (contentWidth / 592.28) * 841.89;
        //the height of canvas that haven't render to pdf
        let leftHeight = contentHeight;
        //addImage y-axial offset
        let position = 0;
        //a4 format [595.28,841.89]
        let imgWidth = 595.28;
        let imgHeight = (841.89 / contentWidth) * contentHeight;

        let pageData = canvas.toDataURL('image/jpeg', 1.0);

        let pdf = new jsPDF();

        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 5, 5, 200, 200);
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
            leftHeight -= pageHeight;
            position -= 841.89;
            //avoid blank page
            if (leftHeight > 0) {
              pdf.addPage();
            }
          }
        }
        let name = '.pdf';
        pdf.save(name);
      })
      .catch((err) => {
        console.log('error canvas', err);
      });
  }

  // To submit form
  onSubmit(form: any) {
    console.log(form.value);
    this.resume = form.value;
  }
}
