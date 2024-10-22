import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileHandle } from '../../../../../../shared/directives/dragAndDrop.directive';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadImgsService } from 'src/app/shared/services/upload/upload-imgs.service';
import Swal from 'sweetalert2';
import { I } from '@angular/cdk/keycodes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Url {
  logo: string;
  coverImage: string;
}

interface Name {
  logo: string;
  coverImage: string;
}
interface Percentage {
  logo: number;
  coverImage: number;
}

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss'],
})
export class AddSchoolComponent implements OnInit {
  @Input() isEdit!: boolean;
  @Input() school;
  addSchForm!: FormGroup;
  selectedFiles?: FileList;
  currentFileUpload?: Upload;
  percentage = 0;
  fileUploads?: any[];
  fileUpload!: Upload;
  uploadPercentage: Percentage = {
    logo: 0,
    coverImage: 0,
  };

  nameObject: Name = {
    logo: 'logo',
    coverImage: 'coverImage',
  };

  urlObject: Url = {
    logo: '',
    coverImage: '',
  };

  locationName: string = 'Select Location';
  searchLocation!: string;
  locations!: [];

  ranks: string[] = ['5', '10', '20', '30', '40'];
  rankName: string = 'Select Rank';

  currentFile!: Upload;

  logo!: FileHandle;
  coverImage!: FileHandle;

  EFMD = false;
  AACSB = false;
  AMBA = false;
  EQUIS = false;
  EMBA = false;

  fields = ['Arts, Design & Architecture', 'Business & management	', 'Computer science & IT', 'Marketing & communication', 'Engineering & technology']
  schoolField = 'Select Field';

  constructor(
    private _FormBuilder: FormBuilder,
    private uploadService: UploadImgsService,
    private _EmployeeService: EmployeeService,
    private _StudentsService: StudentsService,
    private _ModalService: NgbModal
  ) {
    this.addSchForm = this._FormBuilder.group({
      schoolName: ['', [Validators.required]],
      alumni: ['', [Validators.required]],
      engdesc: ['', [Validators.required]],
      frdesc: ['', [Validators.required]],
      gmaps: ['', [Validators.required]],
      youtube: ['', [Validators.required]],
      EFMD: [false, [Validators.required]], 
      AACSB: [false, [Validators.required]],
      AMBA: [false, [Validators.required]],
      EQUIS: [false, [Validators.required]],
      EMBA: [false, [Validators.required]],
    });
  }

  imgDocs: any[] = [];
  userName = String(localStorage.getItem('userName'));
  // Choose files
  chooseFile(event: any, identifier: string) {
    const file = <File>event.target.files[0];
    this.uploadFile(identifier, this.addSchForm.value.schoolName, file);
    this.logo = event.target.files[0];

  }
  chooseFile2(event: any, identifier: string) {
    const file = <File>event.target.files[0];
    this.uploadFile(identifier, this.addSchForm.value.schoolName, file);
    this.coverImage = event.target.files[0];

  }

  filesDropped(file, type: string): void {
    console.log(file[0].file);

    if (type === 'logo') {
      this.logo = file;
    }
    if (type === 'coverImage') {
      this.coverImage = file;
    }
    this.uploadFile(type, this.addSchForm.value.schoolName, file[0].file);
  }

  coverPicture = {
    name: '',
    url: '',
  };
  logoPicture = {
    name: '',
    url: '',
  };
  // To upload a file
  uploadFile(identifier: string, schoolName: string, file: File) {
    const currentFile = new Upload(file);
    this.currentFile = currentFile;
    this.uploadService
      .uploadFile(currentFile, identifier, schoolName)
      .subscribe((percentage) => {
        this.uploadPercentage[identifier] = Math.round(
          percentage ? percentage : 0
        );
        if (percentage === 100) {
          setTimeout(() => {
            this.urlObject[identifier] = currentFile.url;
            let URL = encodeURIComponent(this.urlObject[identifier]);
            this.imgDocs.push({
              name: this.nameObject[identifier],
              url: URL,
            });
            if(this.nameObject[identifier] === 'logo'){
              this.logoPicture = {
                name: this.nameObject[identifier],
                url: URL,
              }
            }
            if(this.nameObject[identifier] === 'coverImage'){
              this.coverPicture = {
                name: this.nameObject[identifier],
                url: URL,
              }
            }

            if (this.urlObject[identifier])
              this.uploadPercentage[identifier] = 0;
          }, 1000);
        }
      });
  }

  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.locations = countries;
    });
  }

  ngOnInit(): void {
    console.log(this.school);
    this.getAllCountries();
    if (this.isEdit) {
      this.addSchForm.controls['schoolName'].setValue(this.school.name);
      this.locationName = this.school.country;
      this.rankName = this.school.ranking;
      this.logo = this.school.pics[0].url;
      this.coverImage = this.school.pics[1].url;
    }
  }

  // To change selections
  changeSelection(identifier: string, e?: any, value?: string) {
    if (identifier === 'location') {
      const inputval = e.target.innerText;
      this.locationName = inputval;
    } else if (identifier === 'rank') {
      const inputval = e.target.innerText;
      this.rankName = inputval;
    }
    else if(identifier === 'field'){
      const inputval = e.target.innerText;
      this.schoolField = inputval;
    }
  }

  // To confirm action
  confirmAction(
    message: string = 'Your work has been saved',
    button: boolean = false
  ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: button,
      timer: 1500,
    });
  }

  // To confirm error
  errorAction(message: string = 'Something went wrong!') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  sumbit(formData: FormGroup) {
    const { schoolName, engdesc, frdesc, alumni, gmaps, youtube, EFMD, AACSB, AMBA, EQUIS, EMBA} = formData.value;
    const country = this.locationName;
    const ranking = this.rankName;
    let pics: string = '';
    if (this.isEdit) {
      this.school.pics.map((picture) => {
        if (picture) {
          picture.url = picture.url.replace(/&/g, '%26');
        }
      });
      pics = JSON.stringify(this.school.pics);
    }
    if (!this.isEdit) {
      pics = JSON.stringify(this.imgDocs);
    }

    console.log(this.imgDocs);

    if (!this.isEdit) {
      const school = {
        "name": schoolName,
        "descr": engdesc,
        "descr_fr": frdesc,
        "alumni": alumni,
        "efmd": EFMD,
        "ranking": ranking,
        "aacsb": AACSB,
        "amba": AMBA,
        "equis": EQUIS,
        "field": this.schoolField,
        "country": country,
        "emba": EMBA,
        "gmaps": gmaps,
        "youtube": youtube,
        "coverpics": this.logoPicture.url,
        "logopics": this.coverPicture.url
      }
      this._EmployeeService
        .addSchool(school)
        .subscribe((data: any) => {
          if (data.status === 200) {
            this.addSchForm.reset;
            this.imgDocs = [];
            this.confirmAction(data.message);
            this._ModalService.dismissAll();
          } else {
            this.errorAction();
          }
        });
    } else {
      this._EmployeeService
        .editSchool(schoolName, country, ranking, pics, this.school)
        .subscribe((data: any) => {
          if (data.status === 200) {
            this.addSchForm.reset;
            this.imgDocs = [];
            this.confirmAction(data.message);
          } else {
            this.errorAction();
          }
        });
    }
  }
}
