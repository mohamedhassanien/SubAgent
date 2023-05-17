import { AnimationOptions } from 'ngx-lottie';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable, Subscription } from 'rxjs';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Program } from 'src/app/shared/models/program';
import { OwlOptions } from 'ngx-owl-carousel-o';

// To configure the snackBar
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { I } from '@angular/cdk/keycodes';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { SchoolsService } from 'src/app/layouts/emp-dashboard/services/schools/schools.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { ProgramsService } from '../../services/programs.service';
interface Field {
  name: string;
}

interface Url {
  cv: string;
  certificate: string;
}

interface Name {
  cv: string;
  certificate: string;
}
interface Percentage {
  cv: number;
  certificate: number;
}

@Component({
  selector: 'app-program-info',
  templateUrl: './program-info.component.html',
  styleUrls: ['./program-info.component.scss'],
})
export class ProgramInfoComponent implements OnInit {
  lewyer: string = 'jkjkjkj';

  files: File[] = [];
  studentUserName: string = String(localStorage.getItem('userName'));
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  upload(): void {
    //get image upload file obj;
  }
  [x: string]: any;
  title: string = 'Overview';

  fields: Field[] = [];
  languageTests: Field[] = [];
  selectedField: Field[] = [];

  citInfo: boolean = false;
  studentDegree: string = '';
  educationLevel: string = '';
  empid: string = '';
  testEnglish: any[] = [];
  testFrench: any[] = [];
  totalTests: any[] = [];
  fieldOfInterests: Field[] = [];

  budget: any;
  infoStudent: any;

  isSubmit = false;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  programData!: Program;
  ratedProgs!: any[];

  programName!: string;
  programId!: any;

  locations!: any[];
  locationsPercentage!: number;

  activities!: any[];
  activityPercentage!: number;

  studies!: any[];
  studyPercentage!: number;

  works!: any[];
  workPercentage!: number;

  schools!: any;
  SPECIALISATIONEror: boolean = false;

  cityPrograms!: any;

  // applyStatus: boolean = false;
  applyMsg!: string;

  screenWidth!: number;

  isFav: boolean[] = [];

  isLoaded: boolean = true;

  // Options for Owl carousel
  programsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    items: 1,
    nav: false,
  };

  uploadedFile!: File | undefined;
  currentFile!: Upload;

  uploadPercentage: Percentage = {
    cv: 0,
    certificate: 0,
  };

  nameObject: Name = {
    cv: '',
    certificate: '',
  };

  urlObject: Url = {
    cv: '',
    certificate: '',
  };

  form: any = FormGroup;

  stepperOrientation: Observable<StepperOrientation>;

  // Position of snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  options: AnimationOptions = {
    path: 'assets/images/students/application-being-reviewed.json',
  };

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProgramsService: ProgramsService,
    private _SchoolsService: SchoolsService,
    private _StudentsService: StudentsService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private _UploadService: UploadService
  ) {
    this._ActivatedRoute.params.subscribe((params) => {
      this.programName = params['name'];
      this.programId = params['id'];
    });
    // To call Program Info
    this.getProgramInfo(this.programId);
    // To call highest rated programmes
    this.ratedPrograms();
    // To get intial value of screen width
    this.screenWidth = window.innerWidth;
    // To get all applied programs
    this.getAppliedPrograms();
    this.fields = [
      { name: 'Arts, Design and Architecture' },
      { name: 'Business and Management' },
      { name: 'Computer Science and IT' },
      { name: 'Engineering and Technology' },
      { name: 'Marketing and communication' },
    ];
    this.languageTests = [];
    this.create();
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 768px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  name: string = String(localStorage.getItem('name'));
  userName: string = String(localStorage.getItem('userName'));
  email: string = String(localStorage.getItem('userEmail'));
  nationality: string = String(localStorage.getItem('nationality'));
  phone: any = localStorage.getItem('phone');

  //Add applied program to api
  postProgram() {
    this._ProgramsService
      .postAppliedProgram(
        this.userName,
        this.email,
        this.programId,
        this.urlObject.cv,
        this.urlObject.certificate
      )
      .subscribe();
  }
  ANYPROGRAM: boolean = true;
  PDFGAL: boolean = false;
  PDFFIGS: boolean = false;
  ngOnInit(): void {
    // console.log(this.programName, this.programId, this.name);
    this._StudentsService.profile(this.email).subscribe((data: any) => {
      this.infoStudent = data[0].data[0];
      this.selectedField = this.infoStudent.fieldOfInterests;
      console.log(this.infoStudent);

      this.urlObject = {
        cv: this.infoStudent.cv.fileUrl ? this.infoStudent.cv.fileUrl : '',
        certificate: this.infoStudent.certificate.fileUrl
          ? this.infoStudent.certificate.fileUrl
          : '',
      };
      // To get all saved files names from database
      this.nameObject = {
        cv: this.infoStudent.cv.fileName ? this.infoStudent.cv.fileName : '',
        certificate: this.infoStudent.certificate.fileName
          ? this.infoStudent.certificate.fileName
          : '',
      };

      this.dataStudent();
    });
    this.form.get('phone').disable();
    // To get all saved files URL from database
  }
  momo: boolean = false;
  nameCity: string = '';
  videoCity: string = '';
  //change video and cityname by click
  changeVideo(x: any, y: any, index: any) {
    this.videoCity = x;
    this.nameCity = y;
    console.log(index);
  }

  activeChange(index: any) {
    if (this.citInfo == false) {
      this.citInfo = true;
    }
    this.citInfo = false;
  }

  isVertical = false;

  @HostListener('window:resize') onWindowResize() {
    if (window.innerWidth <= 768) {
      this.isVertical = true;
    } else {
      this.isVertical = false;
    }
  }

  /////////////////////////////////////////////////////** */
  // my info
  dataStudent() {
    this.studentDegree = this.infoStudent.studentDegree;
    this.educationLevel = this.infoStudent.educationLevel;
    this.fieldOfInterests = this.infoStudent.fieldOfInterests;
    this.budget = this.infoStudent.budget[0] + '-' + this.infoStudent.budget[1];
    this.empid = this.infoStudent.empid;
    this.testEnglish = this.infoStudent.engTestsTypeAndScore;
    this.testFrench = this.infoStudent.frenchTestsTypeAndScore;
    this.totalTests = this.testEnglish.concat(this.testFrench);
  }

  create() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      educationLevel: ['', Validators.required],
      studentDegree: ['', Validators.required],
      selectedField: ['', Validators.required],
      budget: ['', Validators.required],
      phone: ['+' + this.phone],
    });
  }
  onSubmit(): void {
    console.log(this.form.value);
  }

  // Choose files
  chooseFile(event: any, identifier: string, userName: string) {
    const file = <File>event.target.files[0];
    this.uploadFile(identifier, userName, file);
  }

  // To upload a file
  uploadFile(identifier: string, userName: string, file: File) {
    const currentFile = new Upload(file);
    this.currentFile = currentFile;
    this._UploadService
      .uploadFile(currentFile, identifier, userName)
      .subscribe((percentage) => {
        this.uploadPercentage[
          identifier as keyof typeof this.uploadPercentage
        ] = Math.round(percentage ? percentage : 0);
        if (percentage === 100) {
          setTimeout(() => {
            this.urlObject[identifier as keyof typeof this.urlObject] =
              currentFile.url;
            this.nameObject[identifier as keyof typeof this.nameObject] =
              currentFile.name;
            if (this.urlObject[identifier as keyof typeof this.urlObject])
              this.uploadPercentage[
                identifier as keyof typeof this.uploadPercentage
              ] = 0;
          }, 1000);
        }
      });
  }

  // To Delete a file
  deleteFile(fileType: string, userName: string) {
    this._UploadService.deleteFile(
      this.currentFile,
      fileType,
      this.nameObject[fileType as keyof typeof this.nameObject],
      userName
    );
    this.urlObject[fileType as keyof typeof this.urlObject] = '';
    this.nameObject[fileType as keyof typeof this.nameObject] = '';
  }

  get f() {
    return this.form.controls;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  getProgramInfo(id: number) {
    this._ProgramsService.getSingleProgramInfo(id).subscribe((data: Program) => {
      const {
        WhattheydoInfo,
        Whattheystudy,
        Wheretheylive,
        Wheretheywork,
        programType,
        cities,
        spec,
      } = data;
      this.programData = data;
      this.nameCity = this.programData.cities[0].Name;
      this.videoCity = this.programData.cities[0].youtubelink;
      if (spec.length > 1) {
        this.SPECIALISATIONEror = true;
      }

      if (
        this.programData.schoolInfo.schoolName.includes('GALILEO') ||
        this.programData.schoolInfo.schoolName.includes('Galileo')
      ) {
        this.ANYPROGRAM = false;
        this.PDFGAL = true;
      }

      if (
        this.programData.schoolInfo.schoolName.includes('FIGS') ||
        this.programData.schoolInfo.schoolName.includes('Figs')
      ) {
        this.ANYPROGRAM = false;
        this.PDFFIGS = true;
      }

      // To call related schools API
      this.relatedSchools(programType);

      // To get Activities
      this.activities = WhattheydoInfo;
      let activityTotals = 0;
      WhattheydoInfo.map((obj: { number: number; }) => {
        activityTotals += obj.number;
      });
      this.activityPercentage = activityTotals;

      // To get Activities
      this.studies = Whattheystudy;
      let studyTotals = 0;
      Whattheystudy.map((obj: { number: number; }) => {
        studyTotals += obj.number;
      });
      this.studyPercentage = studyTotals;

      // To get Activities
      this.works = Wheretheywork;
      let workTotals = 0;
      Wheretheywork.map((obj: { number: number; }) => {
        workTotals += obj.number;
      });
      this.workPercentage = workTotals;

      // To get locations
      this.locations = Wheretheylive;
      let locationTotals = 0;
      Wheretheylive.map((obj: { number: number; }) => {
        locationTotals += obj.number;
      });
      this.locationsPercentage = locationTotals;
      this.isLoaded = false;
    });
  }

  relatedSchools(schoolType: string) {
    this._SchoolsService
      .getRelatedSchools(encodeURIComponent(schoolType))
      .subscribe((data: any) => {
        const [{ status, data: schools }] = data;
        this.schools = schools;
      });
  }

  ratedPrograms() {
    this._SchoolsService.getHighestRatedProgs().subscribe((data: any) => {
      const [{ data: progs }] = data;
      this.ratedProgs = progs;
    });
  }

  getAppliedPrograms() {
    const studentName = String(localStorage.getItem('userName'));
    this._ProgramsService
      .getWishlistedPrograms(studentName)
      .subscribe((data: any) => {
        // const dataArray = data as [];
        const [{ programs }] = data;
        programs.forEach((program: { [x: string]: string | any }) => {
          this.isFav[program['id']] = true;
        });
      });
  }

  getColor(index: number) {
    if (index === 0) return '#6F77F4';
    else if (index === 1) return '#FF5151';
    else return '#F6D86A';
  }

  getbgColor(index: number) {
    if (index === 0) return 'linear-gradient(180deg, #6F77F4 0%, #0800FF 100%)';
    else if (index === 1)
      return 'linear-gradient(180deg, #FF5151 0%, #FD8282 100%)';
    else return 'linear-gradient(180deg, #F6D86A 0%, #D5AC12 100%)';
  }

  setTitle(identifier: string) {
    this.title = identifier;
  }

  // To apply to a program
  applyProg() {
    if (!Boolean(localStorage.getItem('isLoggedIn'))) {
      this._snackBar.open('You Must be Logged in first!', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }

    this._StudentsService
      .applyProgram(
        this.programData.programName,
        this.programData.schoolInfo.schoolName,
        this.programData.cityInfo.Name
      )
      .subscribe((data: any) => {
        const [{ message }] = data;
        this.applyMsg = message;
        setTimeout(() => {
          this.applyMsg = '';
        }, 3000);
      });
  }

  // Add wishlisted programs
  addToFav(id: number) {
    this.isFav[id] = !this.isFav[id];
    const studentName = String(localStorage.getItem('userName'));
    // in case adding a program to wishlist
    if (this.isFav[id] == true) {
      this._ProgramsService
        .wishlistProgram(id, studentName)
        .subscribe((data: any) => {
          const [{ status }] = data;
          if (status === 201) {
            this._snackBar.open('Program has been Added to Wishlist!', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else {
            this._snackBar.open('Something went wrong!', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        });
      // in case removing a program from wishlist
    } else {
      this._ProgramsService
        .removeWishlistedProgram(id, studentName)
        .subscribe((data: any) => {
          const [{ status, deleted }] = data;
          if (deleted) {
            this._snackBar.open('Program has been Removed from Wishlist!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          } else {
            this._snackBar.open('Something went wrong!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        });
    }
  }
  eWord!: string;
  reload(id: number) {
    this.isLoaded = true;
    this.getProgramInfo(id);
  }
}
