import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SelectItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { C } from '@angular/cdk/keycodes';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadImgsService } from 'src/app/shared/services/upload/upload-imgs.service';

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
  selector: 'dataentery',
  templateUrl: './dataentery.component.html',
  styleUrls: ['./dataentery.component.scss'],
})
export class DataenteryComponent implements OnInit {
  addForm!: FormGroup;

  addNewSchool!: FormGroup;
  listOfSchools: any;
  listOfIntakes: [];
  campusString: string;
  divs = [
    { id: 1, content: 'Div 1' },
  ];


  programIntakeMain = [];

  schoolIntake: SelectItem[] = [
    { label: 'fall', value: 'fall' },
    { label: 'spring', value: 'spring' },
  ];
  schoolType: SelectItem[] = [
    { label: 'type 1', value: 'type 1' },
    { label: 'type 2', value: 'type 2' },
    { label: 'type 3', value: 'type 3' },
  ];
  schoolCampus: SelectItem[] = [
    { label: 'Paris 1', value: 'Paris 1' },
    { label: 'Paris 2', value: 'Paris 2' },
    { label: 'Paris 3', value: 'Paris 3' },
  ];

  schoolCampus2: SelectItem[] = [
    { label: 'Paris 1', value: 'Paris 1' },
    { label: 'Paris 2', value: 'Paris 2' },
    { label: 'Paris 3', value: 'Paris 3' },
  ];

  entryLevel: SelectItem[] = [
    { label: 'BAC', value: '0' },
    { label: 'BAC+1', value: '1' },
    { label: 'BAC+2', value: '2' },
    { label: 'BAC+3', value: '3' },
    { label: 'BAC+4', value: '4' },
    { label: 'BAC+5', value: '5' },
  ];
  imgDocs: any[] = [];
  selectedFile: File;
  cover_pic_File: File;
  currentFile!: Upload;
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
  myForm!: FormGroup;
  constructor(
    private _EmployeeService: EmployeeService,
    private _FormBuilder: FormBuilder,
    private _ModalService: NgbModal,
    private uploadService: UploadImgsService
  ) {
    this.addForm = this._FormBuilder.group({
      program_name: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]*$')]],
      school_id: ['', [Validators.required]],
      program_overview: ['', [Validators.required]],
      program_intakes: this._FormBuilder.group({
        program_intake: '',
        entry_level: '',
        campus: '',
        price: '',
        duration: '',
        alternance: '',
        live_in_eu: '',
        not_live_in_eu: '',
        test: this._FormBuilder.group({
          not_live_in_eu: '',
        }),
      }),

      program_specializations: this._FormBuilder.group({
        specialization: '',
        price: '',
        alternance: '',
        language: '',
        live_in_eu: '',
        not_live_in_eu: '',
        campus: '',
        program_intake: '',
      }),
    });

    // this._EmployeeService.getAllSchoolsData().subscribe(
    //   (data: any) => {
    //     console.log(data[0].data)

    //     this.listOfSchools = data[0].data;

    //   }, (error) => {

    //   }
    // );
    this.addNewSchool = this._FormBuilder.group({
      school_name: ['', [Validators.required]],
      campus: ['', [Validators.required]],
      logo_pic_link: [''],
      cover_pic_link: [''],
      rank: [''],
      description_en: [''],
      school_type: [''],
    });
  }

  ngOnInit(): void {
    this.getAllSchools();
    this.getCampus();


    this.myForm = this._FormBuilder.group({
      program_name: ['',[Validators.required]],
      school_id: ['',[Validators.required]],
      program_overview: ['',[Validators.required]],
      program_years: this._FormBuilder.array([])

    });

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
            if (this.nameObject[identifier] === 'logo') {
              this.logoPicture = {
                name: this.nameObject[identifier],
                url: URL,
              };
            }
            if (this.nameObject[identifier] === 'coverImage') {
              this.coverPicture = {
                name: this.nameObject[identifier],
                url: URL,
              };
            }

            if (this.urlObject[identifier])
              this.uploadPercentage[identifier] = 0;
          }, 1000);
        }
      });
  }
  // To confirm action
  confirmAction(message: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      timer: 1500,
    });
  }

  // To confirm error
  errorAction(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  // onFileChanged(event) {
  //   this.selectedFile = event.target.files[0]
  // }
  chooseFile(event: any, identifier: string) {
    const file = <File>event.target.files[0];
    this.uploadFile(identifier, this.addNewSchool.value.school_name, file);
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  chooseFile2(event: any, identifier: string) {
    const file = <File>event.target.files[0];
    this.uploadFile(identifier, this.addNewSchool.value.school_name, file);
    this.cover_pic_File = event.target.files[0];
  }
  // coverPicChange(event){
  //   this.cover_pic_File = event.target.files[0]
  // }
  closeModal() {
    this._ModalService.dismissAll();
  }
  openModal(element: any, className: string, size: string, data: any[]) {
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  submit(formData: FormGroup) {
    const data = { ...formData.value };

    const school_name = this.addForm.get('program_name')?.value;
    const school_id = this.addForm.get('school_id')?.value;
    const program_overview = this.addForm.get('program_overview')?.value;


    // const program_intake = this.addForm.get('program_intakes.program_intake')?.value;
    // const program_price = this.addForm.get('program_intakes.price')?.value;
    // const program_entry_level = this.addForm.get('program_intakes.entry_level')?.value;
    // const program_campus = this.addForm.get('program_intakes.campus')?.value;
    // const program_duration = this.addForm.get('program_intakes.duration')?.value;
    // const program_alternance = this.addForm.get('program_intakes.alternance')?.value;
    // const program_live_in_eu = this.addForm.get('program_intakes.live_in_eu')?.value;
    // const program_not_live_in_eu = this.addForm.get('program_intakes.not_live_in_eu')?.value;
    // const specialization = this.addForm.get('program_specializations.specialization')?.value;
    // const specialization_price = this.addForm.get('program_specializations.price')?.value;
    // const specialization_alternance = this.addForm.get('program_specializations.alternance')?.value;
    // const specialization_language = this.addForm.get('program_specializations.language')?.value;
    // const specialization_campus = this.addForm.get('program_specializations.campus')?.value;
    // const specialization_live_in_eu = this.addForm.get('program_specializations.live_in_eu')?.value;
    // const specialization_not_live_in_eu = this.addForm.get('program_specializations.not_live_in_eu')?.value;
    // const specialization_intake = this.addForm.get('program_specializations.program_intake')?.value;

    // let program_intakes = [{
    //   program_intake: program_intake,
    //   entry_level: program_entry_level,
    //   campus: program_campus,
    //   price: program_price,
    //   duration: program_duration,
    //   alternance: program_alternance,
    //   live_in_eu: program_live_in_eu,
    //   not_live_in_eu: program_not_live_in_eu,
    // }];
    // let specializations = [{
    //   specialization: specialization,
    //   price: specialization_price,
    //   alternance: specialization_alternance,
    //   language: specialization_language,
    //   live_in_eu: specialization_live_in_eu,
    //   not_live_in_eu: specialization_not_live_in_eu,
    //   campus: specialization_campus,
    //   program_intake: specialization_intake,
    // }];
    // const intakePrice = this.addForm.get('intakePrice')?.value
    // console.log(intakePrice)
    // const logo_pic_link = this.selectedFile;
    // const cover_pic_link = this.cover_pic_File
    // const rank = this.addNewSchool.get('rank')?.value;
    // const description_en = this.addNewSchool.get('description_en')?.value;
    // const school_type = this.addNewSchool.get('school_type')?.value;


    const schoolName = this.addNewSchool.get('school_name')?.value;
    const campus = this.addNewSchool.get('campus')?.value;
    const rank = this.addNewSchool.get('rank')?.value;
    const descr_en = this.addNewSchool.get('description_en')?.value;
    const school_type = this.addNewSchool.get('school_type')?.value;
    const logo_pic_link = this.logoPicture.url;
    const cover_pic_link = this.coverPicture.url;

    const school = {
      school_name: schoolName,
      campus: campus,
      rank: rank,
      description_en: descr_en,
      school_type: school_type,
      logo_pic_link: logo_pic_link,
      cover_pic_link: cover_pic_link,
    };
    console.log('wwwwww');
    console.log(school);

    this._EmployeeService.addNewSchool(school).subscribe((data: any) => {
      console.log(data);
      //   const {status,code,message} = data;
      // if(status === 200){
      //   this.confirmAction(message)
      //   this._ModalService.dismissAll()
      // }else if(code === "201"){
      //   this.errorAction(message)
      //   this._ModalService.dismissAll()
      // }
      this.getAllSchools();
    });
  }

  getAllSchools() {
    this._EmployeeService.getSchoolNames().subscribe((data: any) => {
      console.log('schoolNames');
      console.log(data.data);
      this.listOfSchools = data.data;
      console.log(this.listOfSchools[0].school_name);
    });
  }
  getCampus() {
    this._EmployeeService.getAllCampus().subscribe((data: any) => {
      // console.log(data)
      this.campusString = data.data;
      // console.log(this.campusString)
    });
  }


  duplicateDiv() {
    const duplicate = Object.assign({});
    duplicate.id = this.divs.length + 1;
    this.divs.push(duplicate);
  }



  get programYears(): FormArray {
    return this.myForm.get('program_years') as FormArray;
  }

  createYearGroup(year: any = {}): FormGroup {
    return this._FormBuilder.group({
      program_year: [year.program_year || '',[Validators.required]],
      program_intakes: this._FormBuilder.array((year.program_intakes || []).map(intake => this.createIntakeGroup(intake))),
      program_specializations: this._FormBuilder.array((year.program_specializations || []).map(specialization => this.createSpecializationGroup(specialization)))
    })
  }
  createIntakeGroup(intake: any = {}): FormGroup {
    return this._FormBuilder.group({
      program_intake: [intake.program_intake || ''],
      entry_level: [intake.entry_level || ''],
      campus: [intake.campus || ''],
      price: [intake.price || 0],
      duration: [intake.duration || ''],
      alternance: [intake.alternance || ''],
      live_in_eu: [intake.live_in_eu || ''],
      not_live_in_eu: [intake.not_live_in_eu || ''],
      intake_language: [intake.intake_language || '']
    })
  }

  createSpecializationGroup(specialization: any = {}): FormGroup {
    return this._FormBuilder.group({
      specialization: [specialization.specialization || ''],
      price: [specialization.price || 0],
      alternance: [specialization.alternance || ''],
      language: [specialization.language || ''],
      live_in_eu: [specialization.live_in_eu || ''],
      not_live_in_eu: [specialization.not_live_in_eu || ''],
      campus: [specialization.campus || ''],
      program_intake: [specialization.program_intake || '']
    })
  }
  getIntakes(yearIndex: number): FormArray {
    return (this.programYears.at(yearIndex) as FormGroup).get('program_intakes') as FormArray;
  }

  getSpecializations(yearIndex: number): FormArray {
    return (this.programYears.at(yearIndex) as FormGroup).get('program_specializations') as FormArray;
  }
  //----------------------------------------------------Adding Functions---------------------------------------
  //------ To add a Year: ---------------------
  addYear(): void {
    this.programYears.push(this.createYearGroup());
  }
  //------ To add an Intake: -----------------
  addIntake(yearIndex: number): void {
    const year = this.programYears.at(yearIndex) as FormGroup;
    (year.get('program_intakes') as FormArray).push(this.createIntakeGroup());
  }
  //------ To add Specialization: -------------
  addSpecialization(yearIndex: number): void {
    const year = this.programYears.at(yearIndex) as FormGroup;
    (year.get('program_specializations') as FormArray).push(this.createSpecializationGroup());
  }
  //----------------------------------------------------Removing Functions---------------------------------------
  //------ To remove a year: ----------------------
  removeYear(yearIndex: number) {
    this.programYears.removeAt(yearIndex)
  }
  //------ To remove intake: ----------------------
  removeIntake(yearIndex: number, intakeIndex: number) {
    this.getIntakes(yearIndex).removeAt(intakeIndex);
  }
  //------ To remove specialization: -------------
  removeSpecialization(yearIndex: number, specializationIndex: number) {
    this.getSpecializations(yearIndex).removeAt(specializationIndex);
  }





  //   get programIntakes() {
  //     return this.myForm.get('program_intakes') as FormArray;
  //   }
  //   get specializations() {
  //     return this.myForm.get('program_specializations') as FormArray;
  //   }

  //   addInputField() {
  //     this.programIntakes.push(this._FormBuilder.group({
  //       program_intake: [''],
  //       price: [''],
  //       campus: [''],
  //       duration: [''],
  //       entry_level: [''],
  //       alternance: [''],
  //       live_in_eu: [''],
  //       not_live_in_eu: ['']
  //     }));
  //   }
  //   addspecializations() {
  //     this.specializations.push(this._FormBuilder.group({
  //       specialization:[''],
  //       price:[''],
  //       alternance:[''],
  //       language:[''],
  //       campus:[''],
  //       program_intake:[''],
  //       live_in_eu:[''],
  //       not_live_in_eu:[''],
  //     }));
  //   }


  //   removeInputField(index: number) {
  //     this.programIntakes.removeAt(index);
  //   }
  //   removespecializations(index: number) {
  //     this.specializations.removeAt(index);
  //   }

  onSubmit() {

    if(this.myForm.valid){
      console.log('Please Fill the Required Fields')
    }
    // Handle form submission logic here
    console.log(this.myForm.value);
    let data = this.myForm.value
    this._EmployeeService
      .addNewProgram(data)
      .subscribe(
        (data: any) => {
          console.log(data);
          const { status, message, code } = data;
          if (status === 200) {
            this.confirmAction(message);
          } else if (code === 201) {
            console.log(message)
            this.errorAction('Failed to add a program');
          }
        },
        (error) => { }
      );
  }

}
