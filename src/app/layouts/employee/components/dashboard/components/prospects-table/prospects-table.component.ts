import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterMatchMode, PrimeNGConfig, SelectItem } from 'primeng/api';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';

import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { Comment } from 'src/app/shared/models/comment';

import * as FileSaver from 'file-saver';
import { log } from 'console';

import { Options } from '@angular-slider/ngx-slider';

interface School {
  schoolName: string;
}
interface Program {
  programName: string;
}

interface Url {
  pass: string;
  identity_photo: string;
  cv: string;
  ml: string;
  trans: string;
  certificate: string;
  engTest: string;
  frenchTest: string;
  rl: string;
  professional_act: string;
}

interface Name {
  pass: string;
  identity_photo: string;
  cv: string;
  ml: string;
  trans: string;
  certificate: string;
  engTest: string;
  frenchTest: string;
  rl: string;
  professional_act: string;
}
interface Percentage {
  pass: number;
  identity_photo: number;
  cv: number;
  ml: number;
  trans: number;
  certificate: number;
  engTest: number;
  frenchTest: number;
  rl: number;
  professional_act: number;
}

@Component({
  selector: 'app-prospects-table',
  templateUrl: './prospects-table.component.html',
  styleUrls: ['./prospects-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProspectsTableComponent implements OnInit {
  @Input() searchLeads!: string;
  @Input() sizeName!: number;
  @Input() allStudents!: Student[];
  @Input() originalStudents!: Student[];
  @Input() archived!: boolean;
  @Input() deletedStudents!: boolean;

  @Output() refresh = new EventEmitter();

  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));
  emp_Id = String(localStorage.getItem('userName'));

  // suggestedPrograms = [
  //   { schoolName: 'Select School',
  //   programName: 'No Programs Available',
  //   programField:'',
  //   programSuggestion:'',
  //   progrmaPrice:'' },
  // ];

  schools!: School[];
  programs!: [];
  // schoolName: string = 'Select School';
  schoolSearch!: string;
  programSearch!: string;
  intakeSearch!: string;
  languageSearch!: string;
  locationSearch!: string;

  schoolPrograms!: any[];
  // schoolProgramName: string = 'No Programs Available';d
  schoolProgramsSearch!: string;

  countries!: any[];

  sortName!: string;
  page: number = 1;

  // Phone number plugin
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  separateDialCode = true;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  dateyear: number = new Date().getFullYear();

  // Dropdowns
  scores: number[] = [1, 2, 3, 4, 5];
  previousSchools = [
    { school: 'Other' },
    { school: 'Al Akhawayn University in Ifrane ( AUI )' },
    { school: 'ENCG Fès' },
    { school: 'ENCG Agadir' },
    { school: 'ENCG Oujda' },
    { school: 'ENCG Casa' },
    { school: 'ENCG Marrakesh' },
    { school: 'ENCG Dakhla' },
    { school: 'ENCG El Jadida' },
    { school: 'ENCG Settat' },
    { school: 'ENCG Tanger' },
    { school: 'ENCG Kenitra' },
    { school: 'ESCA' },
    { school: 'ISCAE' },
    { school: 'Université Internationale de Casa ( UIC )' },
    { school: 'Université Internationale de Rabat ( UIR )' },
    { school: 'EMSI Marrakesh' },
    { school: 'EMSI Casa' },
    { school: 'EMSI Rabat' },
    { school: 'Universiapolis Agadir' },
    { school: 'Université Mondiapolis Casa' },
    { school: 'Université Privée de Marrakech ( UPM )' },
    { school: 'INSAA Tanger' },
    { school: 'Lebanese American University ( LAU )' },
    { school: 'American University of Beirut ( AUB )' },
    { school: 'Notre Dame University - Louaize' },
    { school: 'MSB' },
    { school: 'ESPRIT' },
    { school: 'Université Paris-Dauphine' },
    { school: 'IHEC Carthage' },
    { school: 'Tunis Business School' },
    { school: 'Lycée Francais Alexandrie ( LFA )' },
    { school: 'Lycé Francais Caire ( LFC )' },
    { school: 'Lycée Francais MLS' },
    { school: 'Lycée Francais Concordia' },
    { school: 'Lycée Francais Nefertari' },
    { school: 'Lycée Francais Albert Camus' },
    { school: 'Lycé Francais Voltaire ( LFV )' },
    { school: 'École OASIS' },
    { school: 'The International School of Choueifat' },
    { school: 'AIS' },
    { school: 'El Alsson International Schools' },
    { school: 'Brest Business School ( BBS )' },
    { school: 'South Champaign Business School (SCBS)' },
    { school: 'KEDGE Business School' },
    { school: 'Clermont Business School' },
    { school: 'IAE' },
    { school: 'ISCID-CO' },
    { school: 'INSEEC Business School' },
  ];

  preSchoolList = this.previousSchools;

  studentStatus: string[] = [
    'First Contact',
    'Checking Programs',
    'Preparing Docs',
    'Applied',
  ];
  sources: SelectItem[] = [
    { label: 'Direct Message META', value: 'Direct Message META' },
    { label: 'Facebook Groups', value: 'Facebook Groups' },
    { label: 'Study in France FB Group', value: 'Study in France FB Group' },
    { label: 'WhatsApp Groups', value: 'WhatsApp Groups' },
    { label: 'Prospection : INSTA', value: 'Prospection : INSTA' },
    { label: 'Prospection : LINKEDIN', value: 'Prospection : LINKEDIN' },
    { label: 'WOM', value: 'WOM' },
    { label: 'Fair', value: 'Fair' },
    { label: 'Ambassador', value: 'Ambassador' },
    { label: 'Cyrus', value: 'Cyrus' },
    { label: 'Oussama', value: 'Oussama' },
    { label: 'Marwa', value: 'Marwa' },
    { label: 'Manal', value: 'Manal' },
    { label: 'Fatima', value: 'Fatima' },
    { label: 'Meta Ads', value: 'Meta Ads' },
    { label: 'Houda', value: 'Houda' },
    { label: 'Ani', value: 'Ani' },
    { label: 'Abdelwahab', value: 'Abdelwahab' },
    { label: 'Website', value: 'Website' },
    { label: 'Other', value: 'Other' },
  ];
  currentTime = new Date();
  year = this.currentTime.getFullYear();
  // intakes: string[] = ['September', 'January'];
  years: string[] = [
    (this.year - 1).toString(),
    this.year.toString(),
    (this.year + 1).toString(),
    (this.year + 2).toString(),
  ];
  intakes: string[] = ['January', 'September'];
  fields: string[] = [
    'Arts, Design & Architecture',
    'Business & Management',
    'Computer Science & IT',
    'Engineering & Technology',
    'Marketing & communication',
  ];

  selectedIntake: string = '';
  selectedYear: string = '';

  mainLinkArr: string[] = this._Router.url.split('/');
  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 2];

  // Table pagination
  first = 0;
  rows = 10;

  // To catch table from template
  @ViewChild('table', { static: false }) table!: Table;

  selectedColumns!: Student[];

  uploadedFile!: File | undefined;

  uploadPercentage: Percentage = {
    pass: 0,
    identity_photo: 0,
    cv: 0,
    ml: 0,
    trans: 0,
    certificate: 0,
    engTest: 0,
    frenchTest: 0,
    rl: 0,
    professional_act: 0,
  };

  nameObject: Name = {
    pass: '',
    identity_photo: '',
    cv: '',
    ml: '',
    trans: '',
    certificate: '',
    engTest: '',
    frenchTest: '',
    rl: '',
    professional_act: '',
  };

  urlObject: Url = {
    pass: '',
    identity_photo: '',
    cv: '',
    ml: '',
    trans: '',
    certificate: '',
    engTest: '',
    frenchTest: '',
    rl: '',
    professional_act: '',
  };

  currentFile!: Upload;

  allComments!: Comment[];

  suggestedSchoolForm!: FormGroup;
  editSuggestedSchoolForm!: FormGroup;

  commentForm!: FormGroup;
  editCommentForm!: FormGroup;

  editCommentMode: boolean[] = [];

  isAddingComment: boolean = true;
  isThereComments: boolean = false;

  screenWidth!: number;

  @Input('loading') loading!: boolean;

  // Program Suggestion

  // suggestedPrograms = [{ schoolName: 'Select School',
  // programName: 'No Programs Available'}];

  @ViewChild('f', { static: false }) AddSugForm!: NgForm;

  SchoolName: string = 'Pas encore décidée';
  ProgramName: string = '';
  test: any;
  addSugg_schoolName = '';

  suggestedPrograms: {
    id: number;
    schoolName: string;
    programName: string;
    Price: string;
    programfield: string;
    Language: string;
    Link: string;
    comment: string;
    intakeMonth: string;
    duration: string;
    location: string;
    suggested_programID: number;
    programID: number;
    choice: number;
  }[] = [];

  chosenProgram: {
    id: number;
    schoolName: string;
    programName: string;
    Price: string;
    Field: string;
    Language: string;
    Link: string;
    comment: string;
    intakeMonth: string;
    duration: string;
    location: string;
    suggested_programID: number;
    programID: number;
    choice: number;
  }[] = [];

  notchosen: {
    id: number;
    schoolName: string;
    programName: string;
    Price: string;
    Field: string;
    Language: string;
    Link: string;
    comment: string;
    intakeMonth: string;
    duration: string;
    location: string;
    suggested_programID: number;
    programID: number;
    choice: number;
  }[] = [];

  currentSP = {
    studentusername: '',
    programlanguage: '',
    programlink: '',
    comment: '',
    programintake: '',
    location: '',
    suggested_programID: 0,
    programid: 0,
    empid: this.empUserName,
    choice: 0,
  };

  editCard = {
    id: '',
    schoolName: '',
    programName: '',
    Price: '',
    Field: '',
    Language: '',
    Link: '',
    comment: '',
    intakeMonth: '',
    duration: '',
    location: '',
  };

  addAnotherProg = false;
  editProg = false;
  editCardIndex = 0;

  schoolImagePath = '../../../../../assets/images/schools/schools logos/';
  intakeMonth = 'Select School First';

  // PopUp Card Template
  @ViewChild('suggestedCard') suggestedCard;
  @ViewChild('suggested') suggested;
  employeeNames: [{ Name: string; Username: string; email: string }] = [
    { Name: '', Username: '', email: '' },
  ];
  ademp: string = '';

  // Filter
  prospectFilter: any;
  intakeFilter: any = '';
  YearFilter: any = '';
  currentYear = new Date().getFullYear();
  showGridViewContainer = false;

  locations!: [];
  school_name = [];

  constructor(
    private _EmployeeService: EmployeeService,
    private _StudentsService: StudentsService,
    private _Router: Router,
    private _ModalService: NgbModal,
    private _FormBuilder: FormBuilder,
    private _UploadService: UploadService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.addForm = this._FormBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      budget: '',
      source: '',
      Language_Test_Level: '',
      field_of_interest: '',
      current_previous_school: '',
      entry_level: '',
      intake: '',
      year: '',
      score: '',

      language_study: '',
      eng_test_name: '',
      eng_test_score: '',
      fr_test_name: '',
      fr_test_score: '',

      Which_table: '',
      comment: '',
    });

    this.addFormSuggest = this._FormBuilder.group({
      program_name: '',
      suggestedField: '',
      programPrice: '',
      intakeMonth: '',
      duration: '',
      programLink: '',
      programLanguage: '',
      location: '',
      comment: '',
      studentusername: '',
      empid: '',
      programintake: '',
      school_id: '',
      program_field: '',
      program_duration: '',
      program_price: '',
    });
  }
  getSchoolName: any;

  ngOnInit(): void {
    console.log('mainLink ' + this.mainLink);
    if (this.mainLink === 'archived-records') {
      this.loading = false;
    } else {
      this.filterAction();
      this.getEmployees();

      this._StudentsService.getAllCities().subscribe((res: any) => {
        const [{ status, data: cities }] = res;
        this.locations = cities;

        console.log(this.locations);
      });
      this._EmployeeService.getAllSchoolsData().subscribe((res: any) => {
        let data = res[0].data;

        this.getSchoolName = data;
      });
      // To get all comments
      // this.getComments();
      // To intialize add comment form
      this.commentForm = this._FormBuilder.group({
        comment: ['', Validators.required],
      });
      // To intialize edit comment form
      this.editCommentForm = this._FormBuilder.group({
        editComment: ['', Validators.required],
      });

      this.suggestedSchoolForm = this._FormBuilder.group({});
      if (this._ActivatedRoute.snapshot.queryParams['intake'] !== undefined) {
        this.selectedIntake = this._ActivatedRoute.snapshot.queryParams['intake'];
      }
      if (this._ActivatedRoute.snapshot.queryParams['year'] !== undefined) {
        this.selectedYear = this._ActivatedRoute.snapshot.queryParams['year'];
      }
    }

  }

  handleNavigation() {
    if (this.selectedYear !== '' && this.selectedIntake !== '') {
      if (this.mainLink === 'all-leads') {
        switch (this.selectedIntake) {
          case 'January':
            this.selectedYear === this.year.toString()
              ? this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'prospect-management',
                  'all-leads',
                  'jthisyear',
                ],
                {
                  queryParams: {
                    year: this.selectedYear,
                    intake: this.selectedIntake,
                  },
                }
              )
              : this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'prospect-management',
                  'all-leads',
                  'jannextyear',
                ],
                {
                  queryParams: {
                    year: this.selectedYear,
                    intake: this.selectedIntake,
                  },
                }
              );
            break;
          case 'September':
            this.selectedYear === this.year.toString()
              ? this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'prospect-management',
                  'all-leads',
                  'septhisyear',
                ],
                {
                  queryParams: {
                    year: this.selectedYear,
                    intake: this.selectedIntake,
                  },
                }
              )
              : this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'prospect-management',
                  'all-leads',
                  'janthisyear',
                ],
                {
                  queryParams: {
                    year: this.selectedYear,
                    intake: this.selectedIntake,
                  },
                }
              );
            break;
          default:
        }
      }
      if (this.mainLink === 'leads') {
        switch (this.selectedIntake) {
          case 'January':
            this.selectedYear === this.year.toString()
              ? this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'prospect-management',
                  'leads',
                  'jnthisyear',
                ],
                {
                  queryParams: {
                    year: this.selectedYear,
                    intake: this.selectedIntake,
                  },
                }
              )
              : this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'prospect-management',
                  'leads',
                  'jannextyear',
                ],
                {
                  queryParams: {
                    year: this.selectedYear,
                    intake: this.selectedIntake,
                  },
                }
              );
            break;
          case 'September':
            this.selectedYear === this.year.toString()
              ? this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'prospect-management',
                  'leads',
                  'septhisyear',
                ],
                {
                  queryParams: {
                    year: this.selectedYear,
                    intake: this.selectedIntake,
                  },
                }
              )
              : this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'prospect-management',
                  'leads',
                  'janthisyear',
                ],
                {
                  queryParams: {
                    year: this.selectedYear,
                    intake: this.selectedIntake,
                  },
                }
              );
            break;
          default:
        }
      }
    }
  }

  // To refresh students
  refreshStudents() {
    this.refresh.emit();
  }

  suggestedSchoolProg = 'Select School First';
  getSchoolsPrograms(schoolname: string) {
    if (this.editProg) {
      this._EmployeeService
        .getSchoolPrograms(schoolname)
        .subscribe((data: any) => {
          const { status, data: programs } = data;
          if (programs.length === 0) {
            this.schoolPrograms = [];
            this.suggestedSchoolProg = 'No Programs Available';
          } else {
            this.schoolPrograms = programs;
          }
        });
    } else {
      this._EmployeeService
        .getSchoolPrograms(this.SchoolName)
        .subscribe((data: any) => {
          const { status, data: programs } = data;
          if (programs.length === 0) {
            this.schoolPrograms = [];
            this.suggestedSchoolProg = 'No Programs Available';
          } else {
            this.schoolPrograms = programs;
            this.suggestedSchoolProg = 'Select Program';
          }
        });
    }
  }
  getProgramOfInterest(school: string) {
    let programs: any = [];
    this._EmployeeService.getSchPrograms(school).subscribe((data: any) => {
      data.map((program) => {
        programs.push(program.progname);
      });
      this.programs = programs;
    });
  }

  // To get all schools
  getSchools() {
    this._EmployeeService.getSchoolsNames().subscribe((data: any) => {
      const [{ status, data: schools }] = data;
      const schoolsArr = schools.map((obj: School) => obj);
      this.schools = schoolsArr;
    });
  }

  // To get all countries
  getCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      const countriesArr = countries.map((obj: any) => obj.country);
      this.countries = countriesArr;
    });
  }

  // To get all comments
  getComments() {
    this._EmployeeService.getAllComments().subscribe((data: any) => {
      const [{ status, data: comments }] = data;
      this.allComments = comments;
    });
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
      timer: 750,
    });
  }

  // Wait for confirmation to finish
  async confirmActionWait(
    message: string = 'Your work has been saved',
    button: boolean = false
  ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: button,
      timer: 750,
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

  // To switch to previous page programmatically
  prevPage() {
    this.first = this.first - this.rows;
  }

  nextPage() {
    this.first = this.first + this.rows;
  }

  isFirstPage(): boolean {
    return this.allStudents ? this.first === 0 : true;
  }

  isLastPage(): boolean {
    return this.allStudents
      ? this.first >= this.allStudents.length - this.rows
      : true;
  }

  // To reset table
  resetTable() {
    this.first = 0;
    this.refreshStudents();
    this.table.reset();
  }

  // To edit leads
  editFields(data: any) {
    if (data.field === 'reminders') return;
    const {
      data: {
        studentName,
        studentEmail,
        studentUserName,
        studentPhone,
        studentNationality,
        schoolOfInterest,
        programOfInterest,
        studentSource,
        studentSeriousnessScore,
        studentStatus,
        studentIntakeMonth,
        studentIntakeYear,
        studentEmpName,
        PreviousSchool,
        firstname,
        lastname
      },
    } = data;
    console.log(JSON.stringify(studentSource));
    let source: string = studentSource;
    if (typeof source === 'string') {
      console.log(JSON.stringify(source.split(',')));
    }

    if (
      studentEmpName === this.empUserName ||
      this.mainLink === 'leads' ||
      this.empUserName === 'Nicolas' ||
      this.empUserName === 'Oumaima EL HADDADI'
    ) {
      if (studentStatus === 'Applied') {
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this._EmployeeService
              .editStudent(
                studentEmail,
                studentUserName,
                studentPhone.number,
                studentNationality,
                schoolOfInterest,
                programOfInterest.replace(/&/g, 'and'),
                JSON.stringify(studentSource),
                studentSeriousnessScore,
                studentStatus,
                studentIntakeMonth,
                studentIntakeYear,
                PreviousSchool,
                this.mainLink === 'leads' ? this.empUserName : studentEmpName,
                firstname,
                lastname
              )
              .subscribe((res: any) => {
                const [{ status, Message }] = res;
                if (status === 201) {
                  this.confirmAction();
                  if (studentStatus === 'Applied') {
                    this._Router.navigate([
                      '/employees',
                      this.empName,
                      'dashboard',
                      'application-management',
                      'all-applications',
                      'totalapplication',
                    ]);
                    // }
                  }
                  this.filterAction();
                } else {
                  this.errorAction(Message);
                }
              });
            Swal.fire('Saved!', '', 'success');
          } else {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
      } else {
        this._EmployeeService
          .editStudent(
            
            studentEmail,
            studentUserName,
            studentPhone.number,
            studentNationality,
            schoolOfInterest,
            programOfInterest.replace(/&/g, 'and'),
            studentSource,
            studentSeriousnessScore,
            studentStatus,
            studentIntakeMonth,
            studentIntakeYear,
            PreviousSchool,
            this.mainLink === 'leads' ? this.empUserName : studentEmpName,
            firstname,
            lastname
          )
          .subscribe((res: any) => {
            const [{ status, Message }] = res;
            if (status === 201) {
              this.confirmAction();
              if (studentStatus === 'Applied') {
                this._Router.navigate([
                  '/employees',
                  this.empName,
                  'dashboard',
                  'application-management',
                  'all-applications',
                  'totalapplication',
                ]);
                // }
              }
              this.filterAction();
            } else {
              this.errorAction(Message);
            }
          });
      }

      if (
        studentStatus === 'Checking Programs' ||
        studentStatus === 'Preparing Docs'
      ) {
        this._EmployeeService
          .editStudent(
            
            studentEmail,
            studentUserName,
            studentPhone.number,
            studentNationality,
            schoolOfInterest,
            programOfInterest.replace(/&/g, 'and'),
            studentSource,
            studentSeriousnessScore,
            studentStatus,
            studentIntakeMonth,
            studentIntakeYear,
            PreviousSchool,
            this.mainLink === 'leads' ? this.empUserName : studentEmpName,
            firstname,
            lastname
          )
          .subscribe((res: any) => {
            const [{ status, Message }] = res;
            if (status === 201) {
              this.confirmAction();
              if (studentStatus === 'Applied') {
                // this._Router.navigate([
                //   '/employees',
                //   this.empName,
                //   'dashboard',
                //   'application-management',
                //   'all-applications',
                //   'totalapplication',
                // ]);
                // }
              }
              this.filterAction();
            } else {
              this.errorAction(Message);
            }
          });
        // this.openCard(studentUserName);
      }
    }
  }

  employees: any[] = [];
  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data.data;
    });
  }

  // To Archive a lead
  archiveLead(email: string) {
    this._EmployeeService.archiveLead(email).subscribe((res: any) => {
      const { status, message } = res[0];
      if (status === 201) {
        this.confirmAction(message);
        this.filterAction();
      } else {
        this.errorAction(message);
      }
    });
  }

  // To Archive a lead
  unarchiveLead(studentEmail: string) {
    this._EmployeeService.unarchiveLead(studentEmail).subscribe((data: any) => {
      const [{ status }] = data;
      if (status === 200) {
        this.confirmAction();
        this.refreshStudents();
        this._EmployeeService
          .getProspects(1, this.YearFilter, this.intakeFilter, null, null, 1, 0)
          .subscribe((data: any) => {
            this.allStudents = data.Data;
            // this.loading = false;
          });
      } else {
        this.errorAction();
      }
    });
  }

  // restore deleted student
  restoreStudent(studentEmail: string) {
    this._EmployeeService
      .restoreDeletedLeads(studentEmail)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 200) {
          this.confirmAction();
          this.refreshStudents();
        } else {
          this.errorAction();
        }
      });
  }

  openModalArchive(
    element: any,
    className: string,
    size: string,
    data: any[],
    archivEmail
  ) {
    this._ModalService.open(element, { windowClass: className, size: size });
    this.isAddingComment = true;
    this.isThereComments = false;
    if (className === 'comments-modal') {
      const email: string = archivEmail;
      this.getStudentComments(email);
    }
    let ngbModalOptions: NgbModalOptions = {
      windowClass: className,
      size: size,
      backdrop: 'static',
      keyboard: false,
    };
    this._ModalService.open(element, ngbModalOptions);
  }

  // restore deleted student
  restoreToProspect(userName: string) {
    this._EmployeeService
      .restoreToProspect(userName, this.emp_Id)
      .subscribe((data: any) => {
        const { status } = data;
        if (status === 201) {
          this.confirmAction();
          this.refreshStudents();
        } else {
          this.errorAction();
        }
      });
  }

  // Soft delete student
  deleteStudent(userName: string) {
    this._EmployeeService.softDeleteLead(userName).subscribe((data: any) => {
      const [{ status }] = data;
      if (status === 201) {
        this.confirmAction();
        this.refreshStudents();
      } else {
        this.errorAction();
      }
    });
  }

  // Open Edit Modal
  // openEditmodal(element: any,
  //   className: string,
  //   size: string,
  //   cardIndex:number){

  //   this.editCardIndex = cardIndex;
  //       this.editProg=true;
  //       console.log('edit mode')
  //       this.addSugg_schoolName = this.suggestedPrograms[cardIndex].schoolName;
  //       this.intakeMonth = this.suggestedPrograms[cardIndex].intakeMonth;
  //       this.editSuggestedSchoolForm = new FormGroup({
  //         "programName": new FormControl(this.suggestedPrograms[cardIndex].programName, [Validators.required]),
  //         "programField": new FormControl(this.suggestedPrograms[cardIndex].Field, [Validators.required]),
  //         "programPrice": new FormControl(this.suggestedPrograms[cardIndex].Price, [Validators.required]),
  //         "programLang": new FormControl(this.suggestedPrograms[cardIndex].Language, [Validators.required]),
  //         "programLink": new FormControl(this.suggestedPrograms[cardIndex].Link, [Validators.required]),
  //         "comment": new FormControl(this.suggestedPrograms[cardIndex].comment, [Validators.required]),
  //         "Duration": new FormControl(this.suggestedPrograms[cardIndex].duration, [Validators.required])
  //       });
  //       this._ModalService.dismissAll();

  //       this._ModalService.open(element, { windowClass: className, size: size });

  // }
  ProgramLocation = '';
  ProgramLanguage = 'Select School First';
  programID = 0;
  // To open any modal
  openModal(
    element: any,
    className: string,
    size: string,
    data: any[],
    editProg?: boolean
  ) {
    // console.log(this.suggestedSchoolForm);
    this.isAddingComment = true;
    this.isThereComments = false;

    if (className === 'suggested-modal-card') {
    }
    if (className === 'suggested-modal') {
      if (editProg) {
        this._ModalService.dismissAll();
        this.editCardIndex = data[0];
        const prog = this.suggestedPrograms[data[0]];
        this.selectedProgramId = prog.programID;
        this.editProg = true;
        this.addSugg_schoolName = prog.schoolName;
        this.ProgramLocation = prog.location;
        this.ProgramLanguage = prog.Language;
        this.intakeMonth = prog.intakeMonth;
        this.suggestedSchoolProg = prog.programName;
        // this.selectedProgramId = prog.suggested_programID;
        this.getSchoolsPrograms(this.addSugg_schoolName);
        this.editSuggestedSchoolForm = new FormGroup({
          programField: new FormControl(prog.programfield),
          programPrice: new FormControl(prog.Price),
          programLink: new FormControl(prog.Link),
          comment: new FormControl(prog.comment),
          Duration: new FormControl(prog.duration),
        });
      } else {
        this._ModalService.dismissAll();
        this.addSugg_schoolName = 'Select School';
        this.ProgramLocation = 'Select School First';
        this.ProgramLanguage = 'Select School First';
        this.intakeMonth = 'Select School First';
        this.suggestedSchoolProg = 'Select School First';
        this.suggestedSchoolForm = new FormGroup({
          programField: new FormControl(''),
          programPrice: new FormControl(''),
          programLink: new FormControl(''),
          comment: new FormControl(''),
          Duration: new FormControl(''),
        });
      }
    }
    if (className === 'comments-modal') {
      const email: string = data.toString();
      this.getStudentComments(email);
      // for (let comment of this.allComments) {
      //   if (comment.studentEmail === email) {
      //     comment.comment.replace(/°/g, '"');
      //     this.isAddingComment = false;
      //     this.isThereComments = true;
      //     break;
      //   }
      // }
    }
    if (className === 'documents-modal') {
      // To get all saved files from database
      this.urlObject = {
        pass: data[2].studentPass.fileUrl ? data[2].studentPass.fileUrl : '',
        identity_photo: data[6].studentIdentityPhoto.fileUrl
          ? data[6].studentIdentityPhoto.fileUrl
          : '',
        cv: data[0].studentCv.fileUrl ? data[0].studentCv.fileUrl : '',
        ml: data[1].studentMotivationLetter.fileUrl
          ? data[1].studentMotivationLetter.fileUrl
          : '',
        trans: data[4].studentTrans.fileUrl ? data[4].studentTrans.fileUrl : '',
        certificate: data[9].studentCertificate.fileUrl
          ? data[9].studentCertificate.fileUrl
          : '',
        engTest: data[7].studentEngTest.fileUrl
          ? data[7].studentEngTest.fileUrl
          : '',
        frenchTest: data[8].studentFrenchTest.fileUrl
          ? data[8].studentFrenchTest.fileUrl
          : '',
        rl: data[3].studentRl.fileUrl ? data[3].studentRl.fileUrl : '',
        professional_act: data[10].studentProfessionalAct.fileUrl
          ? data[10].studentProfessionalAct.fileUrl
          : '',
      };
      // To get all saved files names from database
      this.nameObject = {
        pass: data[2].studentPass.fileName ? data[2].studentPass.fileName : '',
        identity_photo: data[6].studentIdentityPhoto.fileName
          ? data[6].studentIdentityPhoto.fileName
          : '',
        cv: data[0].studentCv.fileName ? data[0].studentCv.fileName : '',
        ml: data[1].studentMotivationLetter.fileName
          ? data[1].studentMotivationLetter.fileName
          : '',
        trans: data[4].studentTrans.fileName
          ? data[4].studentTrans.fileName
          : '',
        certificate: data[9].studentCertificate.fileName
          ? data[9].studentCertificate.fileName
          : '',
        engTest: data[7].studentEngTest.fileName
          ? data[7].studentEngTest.fileName
          : '',
        frenchTest: data[8].studentFrenchTest.fileName
          ? data[8].studentFrenchTest.fileName
          : '',
        rl: data[3].studentRl.fileName ? data[3].studentRl.fileName : '',
        professional_act: data[10].studentProfessionalAct.fileName
          ? data[10].studentProfessionalAct.fileName
          : '',
      };
    }

    let ngbModalOptions: NgbModalOptions = {
      windowClass: className,
      size: size,
      backdrop: 'static',
      keyboard: false,
    };
    this._ModalService.open(element, ngbModalOptions);
  }
  // To close any modal
  closeModal() {
    this._ModalService.dismissAll();
    this.SuggestedProgUser = '';
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
        this.uploadPercentage[identifier] = Math.round(
          percentage ? percentage : 0
        );
        if (percentage === 100) {
          setTimeout(() => {
            this.urlObject[identifier] = currentFile.url;
            if (this.urlObject[identifier])
              this.uploadPercentage[identifier] = 0;
          }, 1000);
        }
      });
  }

  // To Delete a file
  deleteFile(fileType: string, userName: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._UploadService.deleteFile(
          this.currentFile,
          fileType,
          this.nameObject[fileType],
          userName
        );
        this.urlObject[fileType] = '';
        this.uploadPercentage[fileType] = 0;

        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  // get current time
  getTime() {
    return new Date();
  }

  // To delete a comment
  deleteComment(id: number, email: string) {
    this._EmployeeService.deleteOldComment(id).subscribe((data: any) => {
      const [{ status }] = data;
      if (status === 204) {
        // this.getComments();
        this.getStudentComments(email);
      }
    });
  }

  //Toggle new comment
  toggleNewComment(studentEmail: string) {
    this.isAddingComment = !this.isAddingComment;
  }

  //Toggle new comment
  // toggleNewSuggested() {
  //   this.suggestedPrograms.push({
  //     schoolName: 'Select School',
  //   programName: 'No Programs Available',
  //   Price:'',
  //   Field:'',
  //   Link:'',
  //   Language:'',
  //   comment:'',
  //   intakeMonth: '',
  //   duration: ''
  //   });
  //   // this.suggestedPrograms.push({
  //   //   schoolName: 'Select School',
  //   // programName: 'No Programs Available',
  //   // });
  // }

  // To switch edit comment
  changeEditComment(index: number, comment: string) {
    this.editCommentMode = [];
    this.editCommentForm.reset();
    this.editCommentForm.get('editComment')?.setValue(comment);
    this.editCommentMode[index] = true;
  }

  // To edit an comment
  editComment(formData: FormGroup, email: string, id: number, index: number) {
    this._EmployeeService
      .editOldComment(email, formData.value.editComment, id)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.editCommentForm.reset();
          this.editCommentMode[index] = false;
          // this.getComments();
          this.getStudentComments(email);
        }
      });
  }
  moringmail() {
    this._EmployeeService.MorningMail().subscribe((data: any) => { });
  }

  // Cancel edit comment
  cancelEditComment(index: number) {
    this.editCommentForm.reset();
    this.editCommentMode[index] = false;
  }

  // To add a comment
  submit(formData: FormGroup, studentEmail: string) {
    const comment = encodeURIComponent(formData.value.comment);
    this._EmployeeService
      .addNewComment(studentEmail, comment)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.archiveLead(studentEmail);
          this.commentForm.reset();
          this.getStudentComments(studentEmail);
          this._ModalService.dismissAll();
        }
      });
  }
  closeCard() {
    this.closeModal();
  }

  SuggestedProgUser: any;
  openCard(username: string) {
    console.log('openModalCard: ' + username);
    this.SuggestedProgUser = username;
    this.getAllPrograms(username);
    this.openModal(this.suggestedCard, 'suggested-modal-card', 'cardsize', []);
  }
  chosenProg = false;
  notchosenProg = false;

  getdata: any;
  getAllPrograms(username) {
    this._EmployeeService
      .getSuggestedProgram(username, this.empUserName)
      .subscribe((data: any) => {
        this.suggestedPrograms = data.message;
        this.chosenProgram = data.chosen;
        this.notchosen = data.unchosen;

        console.log('notchosen ' + this.notchosen);

        if (this.chosenProgram.length > 0) {
          this.chosenProg = true;
        }
        if (this.notchosen.length > 0) {
          this.notchosenProg = true;
        }

        this.getdata = data.message;

        console.log(this.getdata);
      });
  }

  // To get screen Width
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }

  //Setting progress bar value
  setProgressValue(value: number) {
    let max = 25;
    if (value > max) {
      value = 25;
    }
    return (value / max) * 100;
  }

  //Getting progress bar color
  getProgressColor(days: number): string {
    if (days <= 5) return 'progress-green';
    else if (days <= 10) return 'progress-yellow';
    else if (days <= 20) return 'progress-orange';
    else if (days <= 25) return 'progress-red';
    return 'progress-red';
  }

  // To get card background color for small screens
  getColor() {
    if (this.screenWidth < 768) {
      return 'linear-gradient(244deg, #FFF7F7 0%, #EDEEFF 100%)';
    } else {
      return '#F7F7F7';
    }
  }

  // To get colors for seriousness scores
  getBGColor(score: number) {
    if (score == 1) return 'danger';
    else if (score == 2) return 'warning';
    else if (score == 3) return 'warning';
    else if (score == 4) return 'success';
    else if (score == 5) return 'success';
    else return 'white';
  }

  // To get colors for status
  getStatusBG(status: string) {
    if (status === 'First Contact') return '#E8E8E8';
    else if (status === 'Checking Programs') return '#B9E5FE';
    else if (status === 'Preparing Docs') return '#FFF2C2';
    else return '#E0E1FB';
  }

  // To get colors for status
  getStatusColor(status: string) {
    if (status === 'First Contact') return '#121212';
    else if (status === 'Checking Programs') return '#121212';
    else if (status === 'Preparing Docs') return '#121212';
    else return '#121212';
  }

  exportExcel() {
    let allStudents: Student[] = [];
    let selectedStudents: Student[] = [];
    this.allStudents.map((student: any) => {
      delete student.studentEngTest;
      delete student.studentBio;
      delete student.studentBudget;
      delete student.studentJobTitle;
      delete student.studentSavedPrograms;
      delete student.studentProfilePictureUrl;
      delete student.studentDocs;
      delete student.studentFieldOfInterest;
      delete student.schoolOfInterest;
      delete student.studentCreatedAt;
      delete student.studentEducation;
      delete student.studentDateOfBirth;
      delete student.studentUserName;
      delete student.programOfInterest;
      delete student.studentEmail;
      allStudents.push(student);
    });
    if (this.selectedColumns) {
      this.allStudents.map((student: any) => {
        delete student.studentEngTest;
        delete student.studentBio;
        delete student.studentBudget;
        delete student.studentJobTitle;
        delete student.studentSavedPrograms;
        delete student.studentProfilePictureUrl;
        delete student.studentDocs;
        delete student.studentFieldOfInterest;
        delete student.schoolOfInterest;
        delete student.studentCreatedAt;
        delete student.studentEducation;
        delete student.studentDateOfBirth;
        delete student.studentUserName;
        delete student.programOfInterest;
        delete student.studentEmail;
        allStudents.push(student);
      });
    }
    console.log(allStudents);
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.selectedColumns ? this.selectedColumns : this.allStudents
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'students');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  // chat on whatsapp with student
  openWhatsApp(number) {
    if (number.number.includes('-')) {
      let num = number.number.split('-');
      let num1 = num.join('');
      let finalNumber = num1.replace(/\s/g, '').slice(1);
      window.open(`https://api.whatsapp.com/send?phone=${finalNumber}`);
    } else {
      let finalNumber = number.number.replace(/\s/g, '').slice(1);
      window.open(`https://api.whatsapp.com/send?phone=${finalNumber}`);
    }
  }

  assignProspect(studentUserName: string, empName) {
    console.log('employee name: ' + empName);
    this._EmployeeService
      .assignLeads(studentUserName, empName)
      .subscribe((data: any) => {
        const [{ status, message }] = data;
        if (status === 201) {
          this.confirmAction(message);
          this.refreshStudents();
          this.filterAction();
        } else {
          this.errorAction();
        }
      });
  }

  // Scroll left
  goLeft() {
    document.getElementById('left-most')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  // Scroll right
  goRight() {
    document.getElementById('right-most')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  // To get colors for seriousness scores
  getScoreColor(score: number) {
    if (score == 1) return 'red';
    else if (score == 2) return 'yellow';
    else if (score == 3) return 'orange';
    else if (score == 4) return 'blue';
    else if (score == 5) return 'green';
    else return 'white';
  }

  selectedProgram: any;
  programLanguages: any[] = [];
  programLocations: any[] = [];
  inTakeMonths: any[] = [];
  selectedProgramId = -9999999;

  changeSelection(
    identifier: string,
    e: any,
    programIndex?: number,
    value?: string,
    ID?: any
  ) {
    if (identifier === 'school') {
      this.SchoolName = e.target.innerText;
      this.addSugg_schoolName = e.target.innerText;
      this.getSchoolsPrograms(this.SchoolName);
      this.ProgramLocation = 'Select Program First';
      this.ProgramLanguage = 'Select Program First';
      this.intakeMonth = 'Select Program First';
      if (this.editProg) {
        this.editSuggestedSchoolForm.controls['programField'].setValue('');
        this.editSuggestedSchoolForm.controls['programPrice'].setValue('');
        this.editSuggestedSchoolForm.controls['Duration'].setValue('');
      } else {
        this.suggestedSchoolForm.controls['programField'].setValue('');
        this.suggestedSchoolForm.controls['programPrice'].setValue('');
        this.suggestedSchoolForm.controls['Duration'].setValue('');
      }
    }
    if (identifier === 'program') {
      this.suggestedSchoolProg = e.target.innerText;
      console.log(e.target.value);
      if (e.target.value) {
        // this.selectedProgram = this.schoolPrograms[programIndex];
        this.selectedProgram = this.schoolPrograms.find(
          (x) => x.id === parseInt(e.target.value)
        );
        // console.log('ddddd' + this.schoolPrograms.find(x => x.id === parseInt(e.target.value)));
        this.selectedProgramId = this.selectedProgram.id;
      }
      this.ProgramLocation = 'Select Location';
      this.ProgramLanguage = 'Select Language';
      this.intakeMonth = 'Select Intake';
      this.programLocations = this.selectedProgram.city;
      this.programLanguages = this.selectedProgram.language;
      this.inTakeMonths = this.selectedProgram.intake;
      // console.log('ddddd' + this.selectedProgram.id);
      if (this.editProg) {
        this.editSuggestedSchoolForm.controls['programField'].setValue(
          this.selectedProgram.type
        );
        this.editSuggestedSchoolForm.controls['programPrice'].setValue(
          this.selectedProgram.fee
        );
        this.editSuggestedSchoolForm.controls['Duration'].setValue(
          this.selectedProgram.length
        );
      } else {
        this.suggestedSchoolForm.controls['programField'].setValue(
          this.selectedProgram.type
        );
        this.suggestedSchoolForm.controls['programPrice'].setValue(
          this.selectedProgram.fee
        );
        this.suggestedSchoolForm.controls['Duration'].setValue(
          this.selectedProgram.length
        );
      }
    }

    if (identifier === 'location') {
      this.ProgramLocation = e.target.innerText;
    }

    if (identifier === 'language') {
      this.ProgramLanguage = e.target.innerText;
    }

    if (identifier === 'intakeMonth') {
      this.intakeMonth = e.target.innerText;
    }
    if (identifier === 'country') {
      const inputval = e.target.innerText;
      this.countryName = inputval;
    }
    if (identifier === 'residence') {
      const inputval = e.target.innerText;
      this.residenceCountry = inputval;
    }
  }

  showGridView() {
    this.showGridViewContainer = true;
    this._EmployeeService
      .filterProspectAction(
        this.prospectFilter,
        this.YearFilter,
        this.intakeFilter,
        0,
        0
      )
      .subscribe((data: any) => {
        this._EmployeeService.filterData.next(data.Data);
        this.allStudents = data.Data;
        this.addForm.patchValue(this.allStudents);
      });
  }
  showListView() {
    this.showGridViewContainer = false;
  }

  changeProspect(value) {
    this.prospectFilter = value;
    this.filterAction();
  }
  changeIntake(value) {
    this.intakeFilter = value;
    this.filterAction();
  }
  changeYear(value) {
    this.YearFilter = value;
    this.filterAction();
  }
  first_contact: any = [];
  checking_program: any = [];

  filterAction() {
    if (this.prospectFilter == undefined) {
      this.prospectFilter = 0;
    }
    if (this.intakeFilter == '') {
      this.intakeFilter = null;
    }
    if (this.YearFilter == '') {
      this.YearFilter = null;
    }
    if (this.archived && !this.deletedStudents) {
      this._EmployeeService
        .filterProspectAction(
          this.prospectFilter,
          this.YearFilter,
          this.intakeFilter,
          1,
          0
        )
        .subscribe((data: any) => {
          this.allStudents = data.Data;
          this._EmployeeService.filterData.next(data.Data);
          this.loading = false;
        });
    } else if (!this.archived && !this.deletedStudents) {
      this._EmployeeService
        .filterProspectAction(
          this.prospectFilter,
          this.YearFilter,
          this.intakeFilter,
          0,
          0
        )
        .subscribe((data: any) => {
          this.allStudents = data.Data;
          this._EmployeeService.filterData.next(data.Data);
          this.loading = false;
        });
    } else if (!this.archived && this.deletedStudents) {
      this._EmployeeService
        .filterProspectAction(
          this.prospectFilter,
          this.YearFilter,
          this.intakeFilter,
          0,
          1
        )
        .subscribe((data: any) => {
          this.allStudents = data.Data;
          this._EmployeeService.filterData.next(data.Data);
          this.loading = false;
        });
    }

    // this.inviteData = data.Data;
    // this.inviteData.map((status) => {
    //   if (status.status === 'Invited Lead') {
    //     return this.invite.push(status);
    //   };
    // })
    // this.accountCreatedListData = data.Data;
    // this.accountCreatedListData.map((status) => {
    //   if (status.status === 'Account Created') {
    //     return this.account.push(status);
    //   };
    // })
  }

  // -------------------------
  studentViewShow = true;
  addForm!: FormGroup;
  addFormSuggest!: FormGroup;
  countryName: string = 'Select Country';
  residenceCountry: string = 'Select Country';
  budgetValue: any = '';
  budgetOptions: Options = {
    floor: 5000,
    step: 5000,
    ceil: 100000,
    // minRange: 5000,
    // maxRange: 15000,
    // pushRange: true,
  };
  studentusername: any;
  searchCountry!: string;
  selectedSch!: string;
  is_checked: any;
  checked = true;

  changeChecked() {
    this.checked = false;
  }

  studentEdit(nationality: string, residenceCountry: string) {
    this.studentViewShow = false;
    this.residenceCountry = residenceCountry;
    this.countryName = nationality;
    // this.countryName

    console.log('test');
  }
  change(e: any) {
    this.selectedSch = e.value;
  }
  submitEdit(formData: FormGroup, studentUserName: string) {
    const data = { ...formData.value };
    const empId = String(localStorage.getItem('userName'));
    const nation = this.countryName;
    const countryOfResidence = this.residenceCountry;
    // const score = this.seriousNumber;

    const {
      phone: { e164Number: phoneNumber },
    } = data;
    console.log('phone---------------')
    console.log(data.phone)
    const phoneNumber1 = phoneNumber.replace('+','')
    console.log(phoneNumber1)
    const studentFirstName = this.addForm.get('firstname')?.value;
    const studentLastName = this.addForm.get('lastname')?.value;
    const studentEmail = this.addForm.get('email')?.value;

    const budget = this.budgetValue;
    const source = this.addForm.get('source')?.value;
    const field_of_interest = this.addForm.get('field_of_interest')?.value;
    const intake = this.addForm.get('intake')?.value;
    const year = this.addForm.get('year')?.value;
    const score = this.addForm.get('score')?.value;
    const entry_level = this.addForm.get('entry_level')?.value;
    let Which_table = this.addForm.get('Which_table')?.value;
    const prvschool = this.addForm.get('current_previous_school')?.value;
    
    if (Which_table == '') {
      Which_table = 0;
    }

    const language_study = this.addForm.get('language_study')?.value;
    const eng_test_name = this.addForm.get('eng_test_name')?.value;
    const eng_test_score = this.addForm.get('eng_test_score')?.value;
    const fr_test_name = this.addForm.get('fr_test_name')?.value;
    const fr_test_score = this.addForm.get('fr_test_score')?.value;

    const studnetSchoolInterest = '';
    const studnetProgInterest = '';
    const intakeMonth = '';

    this._EmployeeService
      .editStudentLead(
        studentUserName,
        studentFirstName,
        studentLastName,
        studentEmail,
        phoneNumber1,
        studnetSchoolInterest,
        studnetProgInterest,
        nation,
        countryOfResidence,
        score,
        empId,
        year,
        intake,
        field_of_interest,
        Which_table,
        budget,
        source,
        language_study,
        eng_test_name,
        eng_test_score,
        fr_test_name,
        fr_test_score,
        entry_level,
        prvschool
      )
      .subscribe(
        (res: any) => {
          console.log(res.status);
          const { Status, status, Message, message } = res;
          if (Status === 200) {
            this._ModalService.dismissAll();
            this.studentViewShow = true;
            this.confirmAction(message);
          } else if (status === 203) {
            this.errorAction(Message);
            this._ModalService.dismissAll();
            this.studentViewShow = true;
          }
        },
        (error) => { }
      );
  }

  changeEmp(empName: any) {
    var email = '';
    for (let i = 0; i < this.employeeNames.length; i++) {
      if (this.employeeNames[i].Username === empName) {
        email = this.employeeNames[i].email;
      }
    }

    console.log(empName);
    // console.log(empName.Username);
    // console.log(empName.email);
    this._EmployeeService
      .getProspects(1, this.YearFilter, this.intakeFilter, empName, email, 0, 0)
      .subscribe((data: any) => {
        this.allStudents = data.Data;
        // this.loading = false;
      });
  }

  getEmployees() {
    this._EmployeeService.getAllEmployeeNames().subscribe((data: any) => {
      const res: [{ Name; Username; email }] = data;
      // console.log(res);
      this.employeeNames = res;
    });
  }
  onademp(e: any) {
    this.ademp = e.target.value;
  }

  confirmChanges(): boolean {
    var res = false;
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        res = true;
      } else {
        // Swal.fire('Changes are not saved', '', 'info')
        res = false;
      }
    });
    return res;
  }

  resetYear = 'Year';
  resetIntake = 'Intake';
  resetAllProspect = 0;

  clearFilter() {
    this.resetYear = 'Year';
    this.resetIntake = 'Intake';
    this.resetAllProspect = 0;

    if (this.archived && !this.deletedStudents) {
      this._EmployeeService
        .filterProspectAction(0, null, null, 1, 0)
        .subscribe((data: any) => {
          this._EmployeeService.filterData.next(data.Data);
          this.allStudents = data.Data;
          this.addForm.patchValue(this.allStudents);
        });
    } else if (!this.archived && !this.deletedStudents) {
      this._EmployeeService
        .filterProspectAction(0, null, null, 0, 0)
        .subscribe((data: any) => {
          this._EmployeeService.filterData.next(data.Data);
          this.allStudents = data.Data;
          this.addForm.patchValue(this.allStudents);
        });
    } else if (!this.archived && this.deletedStudents) {
      this._EmployeeService
        .filterProspectAction(0, null, null, 0, 1)
        .subscribe((data: any) => {
          this._EmployeeService.filterData.next(data.Data);
          this.allStudents = data.Data;
          this.addForm.patchValue(this.allStudents);
        });
    }

    // this._EmployeeService.filterApplicationAction(0, null, null).subscribe((data: any) => {
    //   this._EmployeeService.filterData.next(data.Data);
    //   this.allStudents = data.Data;
    //   this.addForm.patchValue(this.allStudents);
    // });
  }

  // getPreviousSchools(e: any){
  //   if(e.target.value == ''){
  //     this.preSchoolList = this.previousSchools;
  //   }
  //   else{
  //     for (let i =0; i<this.previousSchools.length; i++){
  //       if(this.previousSchools[i].toLowerCase().includes(e.target.value.toLowerCase())){
  //         this.preSchoolList.push(this.previousSchools[i]);
  //       }
  //     }
  //   }
  // }

  getStudentComments(email: string) {
    this._EmployeeService.getStudentComments(email).subscribe((data: any) => {
      const [{ status, data: comments }] = data;
      this.allComments = comments;
    });
  }

  deleteProspect(username) {
    this._EmployeeService.deleteProspect(username).subscribe((data: any) => { });
  }
  theData: any;

  addSuggestedText() {
    const obj = {
      suggestedSchool: this.addFormSuggest.value['suggestedSchool'],
      programName: this.addFormSuggest.value['programName'],
      suggestedField: this.addFormSuggest.value['suggestedField'],
      // "programPrice": this.addFormSuggest.value['programPrice'],
      // "intakeMonth": this.addFormSuggest.value['intakeMonth'],
      // "duration": this.addFormSuggest.value['duration'],
      programLink: this.addFormSuggest.value['programLink'],
      programLanguage: this.addFormSuggest.value['programLanguage'],
      location: this.addFormSuggest.value['location'],
      comment: this.addFormSuggest.value['comment'],
      empid: this.empUserName,
      program_name: this.addFormSuggest.value['program_name'],
      studentusername: this.SuggestedProgUser,

      programintake: this.addFormSuggest.value['intakeMonth'],
      school_id: this.addFormSuggest.value['school_id'],
      program_field: this.addFormSuggest.value['program_field'],
      program_duration: this.addFormSuggest.value['duration'],
      program_price: this.addFormSuggest.value['programPrice'],
    };

    this._EmployeeService.addSuggestedPrograms(obj).subscribe((data: any) => {
      let message = data;
      let status = data.status;
      this.theData = data;

      if (status === 200) {
        this.confirmAction('success add program');
      } else {
        this.confirmAction('success add program');
      }

      this._ModalService.dismissAll();
      this.openCard(this.SuggestedProgUser);
    });
  }

  addSuggestedSchool(username) {
    const obj = {
      studentusername: this.SuggestedProgUser,
      programid: this.selectedProgramId,
      empid: this.empUserName,
      comment: this.suggestedSchoolForm.value['comment'],
      programlink: this.suggestedSchoolForm.value['programLink'],
      programintake: this.intakeMonth,
      programlanguage: this.ProgramLanguage,
      location: this.ProgramLocation,
    };
    console.log('original' + obj.programid);

    if (
      this.formChecker(
        obj.programid,
        obj.location,
        obj.programintake,
        obj.programlanguage,
        obj.programlink
      )
    ) {
      this._EmployeeService.addSuggestedPrograms(obj).subscribe((data: any) => {
        const { status, message } = data;
        this.theData = data;
        if (status == 200) {
          this.confirmAction(message);
        } else {
          this.errorAction(message);
        }
        this._ModalService.dismissAll();
        this.openCard(this.SuggestedProgUser);
      });
    } else {
      // this.errorAction('Fill requiered fields');

      this.openCard(this.SuggestedProgUser);
    }
  }

  editSuggestedProgram() {
    this.currentSP = {
      studentusername: this.SuggestedProgUser,
      programlanguage: this.ProgramLanguage,
      programlink: this.editSuggestedSchoolForm.value['programLink'],
      comment: this.editSuggestedSchoolForm.value['comment'],
      programintake: this.intakeMonth,
      location: this.ProgramLocation,
      suggested_programID:
        this.suggestedPrograms[this.editCardIndex].suggested_programID,
      programid: this.selectedProgramId,
      empid: this.empUserName,
      choice: 0,
    };
    if (
      this.formChecker(
        this.currentSP.programid,
        this.currentSP.location,
        this.currentSP.programintake,
        this.currentSP.programlanguage,
        this.currentSP.programlink
      )
    ) {
      this._EmployeeService
        .editSuggestedProgram(this.currentSP)
        .subscribe((data: any) => {
          const { status, message } = data;
          if (status == 200) {
            this.confirmAction(message);
            this.editProg = false;
          } else {
            this.errorAction(message);
          }
          this._ModalService.dismissAll();
          this.openCard(this.SuggestedProgUser);
        });
    } else {
      this.errorAction('Fill requiered fields');
    }

    console.log(this.currentSP);
  }

  deleteSuggestedProgram(index) {
    const editProgram = {
      empid: this.empUserName,
      studentusername: this.SuggestedProgUser,
      suggested_programID: this.suggestedPrograms[index].suggested_programID,
    };

    this._EmployeeService
      .deleteSuggestedProgram(editProgram)
      .subscribe((data: any) => {
        const { status, message } = data;
        if (status == 200) {
          this.confirmAction(message);
          this.getAllPrograms(this.SuggestedProgUser);
        } else {
          this.errorAction(message);
        }
      });
  }

  formChecker(
    programid,
    location,
    programintake,
    programlanguage,
    programlink
  ) {
    // programlanguage,
    //   programlink:,
    console.log(
      programid,
      location,
      programintake,
      programlanguage,
      programlink
    );
    var check: boolean[] = [];
    if (programid > 0) {
      check.push(true);
    } else {
      check.push(false);
    }
    if (
      location != 'Select School First' &&
      location != 'Select Program First' &&
      location != 'Select Location' &&
      location != ''
    ) {
      check.push(true);
    } else {
      check.push(false);
    }
    if (
      programintake != 'Select School First' &&
      programintake != 'Select Program First' &&
      programintake != 'Select Intake' &&
      programintake != ''
    ) {
      check.push(true);
    } else {
      check.push(false);
    }
    if (
      programlanguage != 'Select School First' &&
      programlanguage != 'Select Program First' &&
      programlanguage != 'Select Language' &&
      programlanguage != ''
    ) {
      check.push(true);
    } else {
      check.push(false);
    }
    if (programlink != '') {
      check.push(true);
    } else {
      check.push(false);
    }
    const allEqual = (arr) => arr.every((v) => v === arr[0]);
    console.log(check);
    if (check[0] == true && allEqual(check)) {
      return true;
    } else {
      return false;
    }
  }

  cancelForm() {
    if (this.editSuggestedSchoolForm.touched === true) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'There is some unsaved data',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this._ModalService.dismissAll();
          this.openCard(this.SuggestedProgUser);
        }
      });
    } else {
      this._ModalService.dismissAll();
    }
  }

  openSuggPopup(e: any, studentUserName) {
    console.log(e);
    if (e.value === 'Checking Programs') {
      this.openCard(studentUserName);
    }
    this.filterAction();
  }

  // To add a comment
  submitComment(formData: FormGroup, studentEmail: string) {
    const comment = encodeURIComponent(formData.value.comment);
    this._EmployeeService
      .addNewComment(studentEmail, comment)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          // this.archiveLead(studentEmail);
          this.commentForm.reset();
          this.getStudentComments(studentEmail);
          this._ModalService.dismissAll();
        }
      });
  }
}
