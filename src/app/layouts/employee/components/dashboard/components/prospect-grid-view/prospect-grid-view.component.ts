import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/shared/models/student';



import { log } from 'console';
import { Comment } from '../../../../../../shared/models/comment';
import { UploadService } from '../../../../../../shared/services/upload/upload.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Upload } from '../../../../../../shared/services/upload/upload';
import {
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Application } from 'src/app/shared/models/application';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';

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
  selector: 'app-prospect-grid-view',
  templateUrl: './prospect-grid-view.component.html',
  styleUrls: ['./prospect-grid-view.component.scss'],
})

export class ProspectGridViewComponent implements OnInit {
  prospectAllData: any;

  addForm!: FormGroup;


  SendToProspects = [
    {
      studentUserName: '15979366gfgf',
      empid: '35559771mohanad/Gadallah',
      name: 'gfgf',
      email: 'tasec70910@aersm.com',
      phone: '[objectObject]',
      date: '2024-02-29',
      score: 1,
      fieldOfInterest: 'Supply Chain / Achat',
      nationality: 'Albania',
      status: 'First Contact',
      source: 'Meta Ads',
    },
  ];



  inviteData: any[] = [];
  FirstContactData: any[] = [];
  accountCreatedList: any[] = [];
  checkingProgramsData: any[] = [];
  PreparingDocsData: any[] = [];

  dataLoaded = false;

  @ViewChild('sendAccountCreated') private sendAccountCreated = {} as ElementRef;
  @ViewChild('invitedLead') private invitedLead = {} as ElementRef;
  @ViewChild('sendProspect') private sendProspect = {} as ElementRef;
  @ViewChild('studentView') private studentView = {} as ElementRef;
  @ViewChild('documentsView') private documentsView = {} as ElementRef;

  @Input() allApplications!: Application[];
  @Input() originalApplications!: Application[];
  @Input() searchApps!: string;
  @Input() sizeName!: number;
  @Input('docs') docs!: any[];
  @Output() refresh = new EventEmitter();
  @Input('loading') loading!: boolean;
  @ViewChild('table', { static: false }) table!: Table;

  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));

  // Phone number plugin
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  separateDialCode = false;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  secondaryApplication: any = [];
  secondaryAppForm!: FormGroup;

  sortName!: string;
  page: number = 1;

  schools!: School[];
  campuses = [];
  secondarySchoolName: string = 'Select School';
  secondarySchoolSearch!: string;
  appStatusName: string = 'Select Status';
  campusName: string = 'Select School & Program';

  schoolPrograms;
  schoolProgramName: string = 'No Programs Available';
  schoolProgramsSearch!: string;
  countries!: any[];

  programs!: Program[];
  employees: any[] = [];

  // Dropdowns
  scores: number[] = [1, 2, 3, 4, 5];
  previousSchools: string[] = [
    'Other',
    'Al Akhawayn University in Ifrane ( AUI )',
    'ENCG Fès',
    'ENCG Agadir',
    'ENCG Oujda',
    'ENCG Casa',
    'ENCG Marrakesh',
    'ENCG Dakhla',
    'ENCG El Jadida',
    'ENCG Settat',
    'ENCG Tanger',
    'ENCG Kenitra',
    'ESCA',
    'ISCAE',
    'Université Internationale de Casa ( UIC )',
    'Université Internationale de Rabat ( UIR )',
    'EMSI Marrakesh',
    'EMSI Casa',
    'EMSI Rabat',
    'Universiapolis Agadir',
    'Université Mondiapolis Casa',
    'Université Privée de Marrakech ( UPM )',
    'INSAA Tanger',
    'Lebanese American University ( LAU )',
    'American University of Beirut ( AUB )',
    'Notre Dame University - Louaize',
    'MSB',
    'ESPRIT',
    'Université Paris-Dauphine',
    'IHEC Carthage',
    'Tunis Business School',
    'Lycée Francais Alexandrie ( LFA )',
    'Lycé Francais Caire ( LFC )',
    'Lycée Francais MLS',
    'Lycée Francais Concordia',
    'Lycée Francais Nefertari',
    'Lycée Francais Albert Camus',
    'Lycé Francais Voltaire ( LFV )',
    'École OASIS',
    'The International School of Choueifat',
    'AIS',
    'El Alsson International Schools',
    'Brest Business School ( BBS )',
    'South Champaign Business School (SCBS)',
    'KEDGE Business School',
    'Clermont Business School',
    'IAE',
    'ISCID-CO',
    'INSEEC Business School',
  ];
  appStatus: string[] = [
    'Sent to school',
    'Interview preparation',
    'Accepted',
    'Alternance found',
    'Deposit paid',
    'Visa ok',
    'Visa ok + Alternance',
    'Visa rejected',
    'Rejected',
    'Canceled',
  ];
  sources: string[] = [
    'Direct Message META : FB / INSTA / WSP',
    'Facebook Groups',
    'Study in France FB Group',
    'WhatsApp Groups',
    'Prospection : INSTA',
    'Prospection : LINKEDIN',
    'Fair',
    'Ambassador',
    'Cyrus',
    'Oussama',
    'Marwa',
    'Manal',
    'Fatima',
    'Meta Ads',
    'WOM',
    'Other'
  ];
  currentTime = new Date();
  year = this.currentTime.getFullYear();
  intakes: string[] = ['September', 'January'];
  years: string[] = [(this.year - 1).toString(), this.year.toString()];

  selectedIntake: string = '';
  selectedYear: string = '';

  mainLinkArr: string[] = this._Router.url.split('/');
  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 2];

  // Table pagination
  first = 0;
  rows = 10;

  // To catch table from template

  selectedColumns!: Application[];

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

  commentForm!: FormGroup;
  editCommentForm!: FormGroup;



  editCommentMode: boolean[] = [];

  isAddingComment: boolean = true;
  isThereComments: boolean = false;

  screenWidth!: number;
  searchSch: string = '';

  studentViewShow = true;
  getStudent: any;
  student;

  budgetValue: any = '';
  budgetOptions: Options = {
    floor: 5000,
    step: 5000,
    ceil: 100000,
    // minRange: 5000,
    // maxRange: 15000,
    // pushRange: true,
  };
  is_checked: any;
  checked = true;
  loaded = true;

  SchoolName: string = 'Pas encore décidée';
  ProgramName: string = '';
  test: any;
  addSugg_schoolName = '';

  suggestedPrograms: {
    schoolName: string,
    programName: string,
    Price: string,
    Field: string,
    Language: string,
    Link: string,
    comment: string,
    intakeMonth: string,
    duration: string
  }[] = [];

  currentSP = {
    schoolName: '',
    programName: '',
    Price: '',
    Field: '',
    Language: '',
    Link: '',
    comment: '',
    intakeMonth: '',
    duration: ''
  };

  editCard = {
    schoolName: '',
    programName: '',
    Price: '',
    Field: '',
    Language: '',
    Link: '',
    comment: '',
    intakeMonth: '',
    duration: ''
  };

  addAnotherProg = false
  editProg = false;
  editCardIndex = 0;

  schoolImagePath = "../../../../../assets/images/schools/schools logos/";
  intakeMonth = 'September';

  // PopUp Card Template
  @ViewChild('suggestedCard') suggestedCard;
  @ViewChild('suggested') suggested;

  suggestedSchoolForm!: FormGroup;
  editSuggestedSchoolForm!: FormGroup;

  schoolSearch!: string;

  SuggesdtedProgramData: any;
  suggestedProgramsflag = false;

  showFirstContactFilter = false;
  showCheckingProgramFilter = false;
  showPreparingDocsFilter = false;

  FirstContacName;
  FirstContacEmployee;
  FirstContacCountry;
  FirstContacScore;

  CheckingProgramName;
  CheckingProgramEmployee;
  CheckingProgramCountry;
  CheckingProgramScore;


  PreparingDocsName;
  PreparingDocsEmployee;
  PreparingDocsCountry;
  PreparingDocsScore;


  constructor(private _EmployeeService: EmployeeService,
    private _ModalService: NgbModal,
    private _Router: Router,
    private _StudentsService: StudentsService,
    private _FormBuilder: FormBuilder,
    private _UploadService: UploadService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.addForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
      comment: ''

    });
  }

  ngOnInit(): void {
    this.getprospects();

    if (this._ActivatedRoute.snapshot.queryParams['intake'] !== undefined) {
      this.selectedIntake = this._ActivatedRoute.snapshot.queryParams['intake'];
    }
    if (this._ActivatedRoute.snapshot.queryParams['year'] !== undefined) {
      this.selectedYear = this._ActivatedRoute.snapshot.queryParams['year'];
    }
    this.getCountries();
    this.getSchools();
    this.getPrograms();
    this.getAllEmployees();
    // To get all comments
    this.getComments();
    // To intialize add comment form
    this.commentForm = this._FormBuilder.group({
      comment: ['', Validators.required],
    });
    // To intialize edit comment form
    this.editCommentForm = this._FormBuilder.group({
      editComment: ['', Validators.required],
    });
    (<HTMLInputElement>document.getElementById('phone')).disabled;

    // To get all saved files from database
    this.urlObject = {
      pass: this.docs[2].studentPass.fileUrl
        ? this.docs[2].studentPass.fileUrl
        : '',
      identity_photo: this.docs[6].studentIdentityPhoto.fileUrl
        ? this.docs[6].studentIdentityPhoto.fileUrl
        : '',
      cv: this.docs[0].studentCv.fileUrl ? this.docs[0].studentCv.fileUrl : '',
      ml: this.docs[1].studentMotivationLetter.fileUrl
        ? this.docs[1].studentMotivationLetter.fileUrl
        : '',
      trans: this.docs[4].studentTrans.fileUrl
        ? this.docs[4].studentTrans.fileUrl
        : '',
      certificate: this.docs[9].studentCertificate.fileUrl
        ? this.docs[9].studentCertificate.fileUrl
        : '',
      engTest: this.docs[7].studentEngTest.fileUrl
        ? this.docs[7].studentEngTest.fileUrl
        : '',
      frenchTest: this.docs[8].studentFrenchTest.fileUrl
        ? this.docs[8].studentFrenchTest.fileUrl
        : '',
      rl: this.docs[3].studentRl.fileUrl ? this.docs[3].studentRl.fileUrl : '',
      professional_act: this.docs[10].studentProfessionalAct.fileUrl
        ? this.docs[10].studentProfessionalAct.fileUrl
        : '',
    };
    // To get all saved files from database
    this.nameObject = {
      pass: this.docs[2].studentPass.fileName
        ? this.docs[2].studentPass.fileName
        : '',
      identity_photo: this.docs[6].studentIdentityPhoto.fileName
        ? this.docs[6].studentIdentityPhoto.fileName
        : '',
      cv: this.docs[0].studentCv.fileName
        ? this.docs[0].studentCv.fileName
        : '',
      ml: this.docs[1].studentMotivationLetter.fileName
        ? this.docs[1].studentMotivationLetter.fileName
        : '',
      trans: this.docs[4].studentTrans.fileName
        ? this.docs[4].studentTrans.fileName
        : '',
      certificate: this.docs[9].studentCertificate.fileName
        ? this.docs[9].studentCertificate.fileName
        : '',
      engTest: this.docs[7].studentEngTest.fileName
        ? this.docs[7].studentEngTest.fileName
        : '',
      frenchTest: this.docs[8].studentFrenchTest.fileName
        ? this.docs[8].studentFrenchTest.fileName
        : '',
      rl: this.docs[3].studentRl.fileName
        ? this.docs[3].studentRl.fileName
        : '',
      professional_act: this.docs[10].studentProfessionalAct.fileName
        ? this.docs[10].studentProfessionalAct.fileName
        : '',
    };
  }

  FirstContactApp(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const status = "First Contact"
      const studentUserName = this.FirstContact[event.currentIndex].studentUserName;

      this._EmployeeService.prospectStatus(studentUserName, status).subscribe((data: any) => {
        const { state, message } = data[0];
        // if(state === 200){
        //   this.confirmAction(message);
        // }
        // else{
        //   this.errorAction();
        // }
        // this.openModal(this.invitedLead, 'add-modal', 'xl', [])
        // const {state, message} = data[0];
        // if(state === 200){
        //   this.confirmAction(message);
        // }
        // else{
        //   this.errorAction();
        // }
        this.confirmAction(message);
      });
    }
  }
  checkingProgramsApp(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const status = "Checking Programs"

    const studentUserName = this.accountList[event.currentIndex].studentUserName;

    this._EmployeeService.prospectStatus(studentUserName, status).subscribe((data: any) => {
      const { state, message } = data[0];
      // if(state === 200){
      //   this.confirmAction(message);
      // }
      // else{
      //   this.errorAction();
      // }
      // this.openModal(this.sendAccountCreated, 'add-modal', 'xl', [])

      this.confirmAction(message);
    });
  }
  PreparingDocsApp(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const status = "Preparing Docs"

    const studentUserName = this.PreparingList[event.currentIndex].studentUserName;

    this._EmployeeService.prospectStatus(studentUserName, status).subscribe((data: any) => {
      const { state, message } = data[0];
      // if(state === 200){
      //   this.confirmAction(message);
      // }
      // else{
      //   this.errorAction();
      // }
      this.confirmAction(message);
    });
  }



  sendToApplication(event: CdkDragDrop<any[]>) {

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
        if (event.previousContainer === event.container) {
        } else {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
        const studentUserName = this.SendToProspects[this.SendToProspects.length - 1].studentUserName;
        const status = "Applied"

        this._EmployeeService.sendToApplicationApp(studentUserName, status).subscribe((data: any) => {
          const { status, message } = data[0];
          if (status === 200) {
            this.confirmAction(message);
          }
          else {
            this.errorAction();
          }
        });
      }
    });

  }

  FirstContact: any;
  accountList: any;
  PreparingList: any;
  getprospects() {
    this._EmployeeService.filterData.subscribe(data => {
      this.dataLoaded = true;
      const FirstContactData = data.filter((val) => val.studentStatus === "First Contact");
      this.FirstContact = FirstContactData;

      const accountData = data.filter((val) => val.studentStatus === "Checking Programs");
      this.accountList = accountData;

      const PreparingData = data.filter((val) => val.studentStatus === "Preparing Docs");
      this.PreparingList = PreparingData;

    })
  }

  openNewModal(element: any, className: string, size: string, data: any[]) {
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  openView(name) {
    this._EmployeeService.getStudentData(name, 1).subscribe((data: any) => {
      this.getStudent = data;
      this.studentViewShow = true;
      this.openNewModal(this.studentView, 'add-modal studentViewWidth', 'xl', [])
    });
  }
  openDocuments(name) {
    console.log()
    this.openNewModal(this.documentsView, 'documents-modal', 'xl', [])
  }


  selectedSch!: string;
  change(e: any) {
    this.selectedSch = e.value;
  }

  selectedProg: string = 'Enter a program';
  newProg(e: any) {
    this.selectedProg = e.target.value;
  }
  // To get all countries


  addNewApp() {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const month = (<HTMLInputElement>document.getElementById('month')).value;
    const year = (<HTMLInputElement>document.getElementById('year')).value;
    const sch = this.selectedSch;
    const prog = this.selectedProg;
    const empUserName = String(localStorage.getItem('userName'));

    this._EmployeeService
      .addNewApplication(email, name, sch, prog, empUserName, month, year)
      .subscribe((data: any) => {
        const { status, message } = data;
        if (status == 201) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: message,
            timer: 1000,
          }).then((res) => {
            if (res.isDismissed == true) {
              this.closeModal();
            }
          });
        }
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
    return this.allApplications ? this.first === 0 : true;
  }

  isLastPage(): boolean {
    return this.allApplications
      ? this.first >= this.allApplications.length - this.rows
      : true;
  }

  // To reset table
  resetTable() {
    this.first = 0;
    this.refreshApplications();
    this.table.reset();
  }

  handleNavigation() {
    if (this.selectedYear !== '' && this.selectedIntake !== '') {
      if (this.mainLink === 'all-applications') {
        switch (this.selectedIntake) {
          case 'January':
            this.selectedYear === this.year.toString()
              ? this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'application-management',
                  'all-applications',
                  'appjan',
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
                  'application-management',
                  'all-applications',
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
                  'application-management',
                  'all-applications',
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
                  'application-management',
                  'all-applications',
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
      if (this.mainLink === 'applications') {
        switch (this.selectedIntake) {
          case 'January':
            this.selectedYear === this.year.toString()
              ? this._Router.navigate(
                [
                  '/employees',
                  this.empName,
                  'dashboard',
                  'application-management',
                  'applications',
                  'myappj',
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
                  'application-management',
                  'applications',
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
                  'application-management',
                  'applications',
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
                  'application-management',
                  'applications',
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

  // To restore App
  restoreApp(userName: string) {
    this._EmployeeService
      .restoreApplication(userName)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.confirmAction();
          this.refreshApplications();
        } else {
          this.errorAction();
        }
      });
  }

  // Soft delete student
  deleteApp(appID: number) {
    this._EmployeeService
      .softDeleteApplication(appID)
      .subscribe((data: any) => {
        const { status, message } = data;
        if (status === 201) {
          this.confirmAction(message);
          this.refreshApplications();
        } else {
          this.errorAction();
        }
      });
  }

  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }

  restoreApplication(appid: number) {
    this._EmployeeService
      .restoreDeletedApplications(appid)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 200) {
          this.confirmAction();
          this.refreshApplications();
        } else {
          this.errorAction();
        }
      });
  }

  restoreToLeads(userName: string) {
    this._EmployeeService.restoreToLeads(userName).subscribe((data: any) => {
      const [{ status }] = data;

      if (status === 201) {
        this.confirmAction();
        this.refreshApplications();
      } else {
        this.errorAction();
      }
    });
  }

  // To refresh applications
  refreshApplications() {
    this.refresh.emit();
  }

  // To get all schools
  getSchools() {
    this._EmployeeService.getSchoolsNames().subscribe((data: any) => {
      const [{ status, data: schools }] = data;
      const schoolsArr = schools.map((obj: School) => obj);
      this.schools = schoolsArr;
    });
  }

  getSchoolsPrograms() {
    if (this.secondarySchoolName !== 'Select School') {
      this._EmployeeService
        .getSchoolPrograms(this.secondarySchoolName)
        .subscribe((data: any) => {
          const { status, data: programs } = data;
          if (this.secondaryApplication.length === 0) {
            if (programs.length === 0) {
              this.schoolPrograms = [];
              this.schoolProgramName = 'No Programs Available';
            } else {
              this.schoolPrograms = programs;
              this.schoolProgramName = 'Select Program';
            }
          } else {
            this.schoolPrograms = programs;
            this.getProgramCampuses();
          }
        });
    }
  }

  getProgramOfInterest(school: string) {
    let programs: any = [];
    this._EmployeeService.getSchPrograms(school).subscribe((data: any) => {
      data.map((program) => {
        // Use replace to replace '&' with a different character or an empty string
        let modifiedProgName = program.progname.replace(/&/g, ' and ');
        programs.push(modifiedProgName);
      });
      this.programs = programs;
    });
  }
  getProgramCampuses() {
    for (let program of this.schoolPrograms) {
      if (this.secondaryApplication.length === 0) {
        if (program.name === this.schoolProgramName) {
          this.campuses = program.city;
          this.campusName = 'Select Campus';
        }
      } else {
        this.campuses = program.city;
      }
    }
  }

  // To get all programs
  getPrograms() {
    this._EmployeeService.getProgramsNames().subscribe((data: any) => {
      const [{ status, data: programs }] = data;
      this.programs = programs;
    });
  }

  // To get secondary application
  getSecondaryApp(username: string) {
    this._EmployeeService.getSecondaryApp(username).subscribe((data: any) => {
      const [{ status, data: secondaryApp }] = data;
      this.secondaryApplication = secondaryApp;
      if (secondaryApp.length !== 0) {
        this.secondarySchoolName = secondaryApp[0].studentSchoolName;
        this.schoolProgramName = secondaryApp[0].studentProgramName;
        this.campusName = secondaryApp[0].schoolCampus;
        this.appStatusName = secondaryApp[0].studensStatus;
        this.getSchoolsPrograms();
      }
    });
  }

  // To get all countries
  getCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      const countriesArr = countries.map((obj: any) => obj.country);
      this.countries = countriesArr;

      console.log(this.countries);
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
      timer: 700,
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

  // To edit leads
  editFields(data: any) {
    const {
      data: {
        studentFullName,
        studentEmail,
        studentUsername,
        studentPhone,
        studentSchoolName,
        studentProgramName,
        studentNationality,
        studentSource,
        studentScore,
        studensStatus,
        schoolCampus,
        studentIntakeMonth,
        studentIntakeYear,
        schoolFee,
        studentEmpName,
        appid,
        PreviousSchool,
      },
    } = data;
    if (
      studentEmpName === this.empUserName ||
      this.mainLink === 'applications' ||
      this.empUserName === 'Nicolas' ||
      this.empUserName === 'Oumaima EL HADDADI'
    ) {
      this._EmployeeService
        .editApplication(
          studentFullName,
          studentEmail,
          studentUsername,
          studentPhone.number,
          studentNationality,
          studentSchoolName,
          studentProgramName.replace(/&/g, 'and'),
          studentSource,
          studentScore,
          studensStatus,
          schoolCampus,
          studentIntakeMonth,
          studentIntakeYear,
          schoolFee,
          PreviousSchool,
          appid
        )
        .subscribe((res: any) => {
          const [{ status, Message }] = res;
          if (status == 201) {
            this.confirmAction(Message);
          } else {
            this.errorAction(Message);
          }
        });
    }
  }

  // To Archive a lead
  archiveApp(studentEmail: string) {
    this._EmployeeService
      .archiveApplication(studentEmail)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.confirmAction();
          this.refreshApplications();
        } else {
          this.errorAction();
        }
      });
  }

  // To Archive a lead
  unarchiveApp(studentEmail: string) {
    this._EmployeeService
      .unarchiveApplication(studentEmail)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 200) {
          this.confirmAction();
          this.refreshApplications();
        } else {
          this.errorAction();
        }
      });
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

  openModal(element: any, className: string, size: string, data: any, editProg?: boolean) {
    this.isAddingComment = true;
    this.isThereComments = false;

    if (className === 'comments-modal') {
      const email: string = data.toString();
      for (let comment of this.allComments) {
        if (comment.studentEmail === email) {
          comment.comment.replace(/°/g, '"');
          this.isAddingComment = false;
          this.isThereComments = true;
          break;
        }
      }
    }
    if (className === 'secondary-modal') {
      this.getSecondaryApp(data);
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

    // Add suggested program

    if (className === 'suggested-modal-card') {

    }
    if (className === 'suggested-modal') {
      if (editProg) {
        // this.editCardIndex = cardIndex;
        this.editProg = true;
        console.log('edit mode')
        //   this.editSuggestedSchoolForm = new FormGroup({
        //     "programName": new FormControl(this.currentSP.programName, [Validators.required]),
        //     "programField": new FormControl(this.currentSP.Field, [Validators.required]),
        //     "programPrice": new FormControl(this.currentSP.Price, [Validators.required]),
        //     "programLang": new FormControl(this.currentSP.Language, [Validators.required]),
        //     "programLink": new FormControl(this.currentSP.Link, [Validators.required]),
        //     "comment": new FormControl(this.currentSP.comment, [Validators.required]),
        //     "intakeMonth": new FormControl(this.currentSP.intakeMonth, [Validators.required]),
        //     "Duration": new FormControl(this.currentSP.duration, [Validators.required])
        //   });
      }
      else {
        const username: string = data.toString();
        // this.getAllProgram(username);
        if (this.suggestedPrograms.length > 0) {
          const pro = this.suggestedPrograms[this.suggestedPrograms.length - 1];
          this.addSugg_schoolName = pro.schoolName;
          this.intakeMonth = pro.intakeMonth;
          this.suggestedSchoolForm = new FormGroup({
            "programName": new FormControl(pro.programName, [Validators.required]),
            "programField": new FormControl(pro.Field, [Validators.required]),
            "programPrice": new FormControl(pro.Price, [Validators.required]),
            "programLang": new FormControl(pro.Language, [Validators.required]),
            "programLink": new FormControl(pro.Link, [Validators.required]),
            "comment": new FormControl(pro.comment),
            "Duration": new FormControl(pro.duration, [Validators.required])
          });
        }
        else {
          this.addSugg_schoolName = 'Pas encore décidée';
          this.intakeMonth = 'September';
          this.suggestedSchoolForm = new FormGroup({
            "programName": new FormControl(null, [Validators.required]),
            "programField": new FormControl(null, [Validators.required]),
            "programPrice": new FormControl(null, [Validators.required]),
            "programLang": new FormControl(null, [Validators.required]),
            "programLink": new FormControl(null, [Validators.required]),
            "comment": new FormControl(null),
            "Duration": new FormControl(null, [Validators.required])
          });
        }

      }
      //Create Program Suggestion Form 

      const username: string = data.toString();
      this.getSuggestedPrograms(username);
    }

    this._ModalService.open(element, { windowClass: className, size: size });
  }

  // To close any modal
  closeModal() {
    this._ModalService.dismissAll();
  }

  assignApplication(studentUserName: string, empName) {
    this._EmployeeService
      .assignLeads(studentUserName, empName)
      .subscribe((data: any) => {
        const [{ status, message }] = data;
        if (status === 201) {
          this.confirmAction(message);
          this.refreshApplications();
        } else {
          this.errorAction();
        }
      });
  }

  // To get colors of reminders
  getReminders(period: number) {
    if (period < 15) {
      return 'gray';
    } else if (period >= 15 && period < 30) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  // get current time
  getTime() {
    return new Date();
  }
  prospectFilter: any;
  intakeFilter: any = '';
  YearFilter: any = '';
  currentYear = new Date().getFullYear();
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
    this._EmployeeService.filterProspectAction(this.prospectFilter, this.YearFilter, this.intakeFilter, 0, 0).subscribe((data: any) => {
      this.prospectAllData = data.Data;

      const filteredDataAccount = this.prospectAllData.filter((val) => val.studentStatus === "First Contact");
      this.FirstContactData = filteredDataAccount;
      const filteredDataAccountChecking = this.prospectAllData.filter((val) => val.studentStatus === "Checking Programs");
      this.checkingProgramsData = filteredDataAccountChecking;

      const filteredDataAccountCheckingPreparing = this.prospectAllData.filter((val) => val.studentStatus === "Preparing Docs");
      this.PreparingDocsData = filteredDataAccountCheckingPreparing;

      // this.prospectAllData = data.Data;
      // this.prospectAllData.map((status) => {
      //   if (status.studentStatus === 'First Contact') {
      //     this.FirstContactData.push(status);
      //   };
      // })
      // this.prospectAllData.map((status) => {
      //   if (status.studentStatus === 'Checking Programs') {
      //     this.checkingProgramsData.push(status);
      //   };
      // })
      // this.prospectAllData.map((status) => {
      //   if (status.studentStatus === 'Preparing Docs') {
      //     this.PreparingDocsData.push(status);
      //   };
      // })

    });
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
  changeIntake(value) {
    this.intakeFilter = value;
    this.filterAction();
  }
  changeProspect(value) {
    this.prospectFilter = value;
    this.filterAction();
  }
  changeYear(value) {
    this.YearFilter = value;
    this.filterAction();
  }
  // To get app Date
  getAppDate(date: number) {
    const appDate = new Date(date * 1000);
    return `${appDate.getFullYear()}-${appDate.getMonth() + 1 < 10 ? '0' : ''}${appDate.getMonth() + 1
      }-${appDate.getDate() < 10 ? '0' : ''}${appDate.getDate()}`;
  }

  // To delete a comment
  deleteComment(id: number) {
    this._EmployeeService.deleteOldComment(id).subscribe((data: any) => {
      const [{ status }] = data;
      if (status === 204) {
        this.getComments();
      }
    });
  }

  //Toggle new comment
  toggleNewComment(studentEmail: string) {
    this.isAddingComment = !this.isAddingComment;
  }

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
          this.getComments();
        }
      });
  }

  // Cancel edit comment
  cancelEditComment(index: number) {
    this.editCommentForm.reset();
    this.editCommentMode[index] = false;
  }
  // To add a comment
  submit(formData: FormGroup, studentEmail: string) {
    this._EmployeeService
      .addNewComment(studentEmail, formData.value.comment)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.commentForm.reset();
          this.getComments();
        }
      });
  }
  seriousScores: string[] = ['1', '2', '3', '4', '5'];
  seriousNumber: string = 'Select Score';
  intakeMonths: string[] = ['January', 'September'];
  intakeMonthName: string = 'Select Month';

  intakeYears: string[] = ['2022', '2023'];
  intakeYearName: string = 'Select Year';

  schoolName: string = 'Select School';
  searchSchool!: string;
  countryName: string = 'Select Country';
  residenceCountry: string = 'Select Country';
  searchCountry!: string;
  selectedCountry!: string;

  // To get screen Width
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
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

  //Setting progress bar value
  setProgressValue(value: number) {
    let max = 25;
    if (value > max) {
      value = 25;
    }
    return (value / max) * 100;
  }

  //Getting progress bar color
  getProgressColor(days: number, status: string): string {
    if (days <= 5) return 'progress-green';
    else if (days <= 10) return 'progress-yellow';
    else if (days <= 20) return 'progress-orange';
    if (
      days > 20 &&
      (status.toLowerCase() === 'visa ok' ||
        status.toLowerCase() === 'visa ok + alternance')
    ) {
      return 'progress-grey';
    } else if (days > 20) return 'progress-red';
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
    if (status.toLowerCase() === 'sent to school') return '#E8E8E8';
    else if (status.toLowerCase() === 'deposit paid') return '#B9E5FE';
    else if (status.toLowerCase() === 'interview preparation') return '#FFF2C2';
    else if (status.toLowerCase() === 'rejected') return '#FF5151';
    else if (status.toLowerCase() === 'visa ok') return '#8DD76A';
    else if (status.toLowerCase() === 'alternance found') return '#9ADF98';
    else if (status.toLowerCase() === 'visa ok + alternance') return '#94D078';
    else if (status.toLowerCase() === 'accepted') return '#fbe8ea';
    else if (status.toLowerCase() === 'cancelled') return '#FC9A64';
    else if (status.toLowerCase() === 'visa rejected') return '#DDB363';
    else return '#CA3C3C';
  }

  // To get colors for status
  getStatusColor(status: string) {
    if (status.toLowerCase() === 'rejected') return '#FDFDFD';
    else return '#121212';
  }

  exportExcel() {
    this.selectedColumns
      .map((x) => x.appDateOfCreation)
      .reduce((accum, digit) => accum * 10 + digit, 0);
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.selectedColumns ? this.selectedColumns : this.allApplications
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

  // _changeSelection(identifier: string, e?: any, value?: string) {
  //   if (identifier === 'school') {
  //     const inputval = e.target.innerText;
  //     this.secondarySchoolName = inputval;
  //     this.getSchoolsPrograms();
  //   }
  //   if (identifier === 'program') {
  //     const inputval = e.target.innerText;
  //     this.schoolProgramName = inputval;
  //     this.getProgramCampuses();
  //   }
  //   if (identifier === 'campus') {
  //     const inputval = e.target.innerText;
  //     this.campusName = inputval;
  //   }
  //   if (identifier === 'status') {
  //     const inputval = e.target.innerText;
  //     this.appStatusName = inputval;
  //   }
  // }
  changeSelection(identifier: string, e?: any, value?: string) {

    if (identifier === 'school') {
      this.SchoolName = e.target.innerText;
      this.addSugg_schoolName = e.target.innerText;
    }
    if (identifier === 'program') {
      this.ProgramName = e.target.innerText;
    }

    if (identifier === 'intakeMonth') {
      this.intakeMonth = e.target.innerText;
    }
    if (identifier === 'score') {
      const inputval = e.target.innerText;
      this.seriousNumber = inputval;
    } else if (identifier === 'country') {
      const inputval = e.target.innerText;
      this.countryName = inputval;
    }
    else if (identifier === 'residence') {
      const inputval = e.target.innerText;
      this.residenceCountry = inputval;
    }
  }
  addSecondaryApp(student) {
    if (this.secondaryApplication.length === 0) {
      this._EmployeeService
        .createSecondaryApplication(
          student.studentUsername,
          student.studentEmail,
          this.secondarySchoolName,
          this.schoolProgramName,
          this.campusName,
          this.appStatusName
        )
        .subscribe((res: any) => {
          const { status, message } = res;
          if (status == 200) {
            this.confirmAction(message);
          } else {
            this.errorAction(message);
          }
        });
    } else {
      this._EmployeeService
        .editSecondaryApplication(
          student.studentFullName,
          student.studentEmail,
          student.studentUsername,
          student.studentPhone.number,
          student.studentNationality,
          this.secondarySchoolName,
          this.schoolProgramName,
          student.studentSource,
          student.studentScore,
          this.appStatusName,
          this.campusName,
          student.studentIntakeMonth,
          student.studentIntakeYear,
          student.schoolFee,
          this.secondaryApplication[0].appid
        )
        .subscribe((res: any) => {
          const [{ status, Message }] = res;
          if (status == 201) {
            this.confirmAction(Message);
          } else {
            this.errorAction(Message);
          }
        });
    }
  }

  studentEdit() {
    this.studentViewShow = false;
    console.log('test');
  }
  changeV(e: any) {
    this.budgetValue = e.target.value;
  }
  changeChecked() {
    this.checked = false;
  }

  submitEdit(formData: FormGroup) {
    const data = { ...formData.value };
    const empId = String(localStorage.getItem('userName'));
    const nation = this.countryName;
    const countryOfResidence = this.residenceCountry;
    // const score = this.seriousNumber;

    const { phone: { number: phoneNumber } } = data;


    const studentfName = this.addForm.get('firstName')?.value
    const studentlName = this.addForm.get('lastName')?.value
    const studentEmail = this.addForm.get('email')?.value


    const budget = this.budgetValue
    const source = this.addForm.get('source')?.value
    const field_of_interest = this.addForm.get('field_of_interest')?.value
    const intake = this.addForm.get('intake')?.value
    const year = this.addForm.get('year')?.value
    const score = this.addForm.get('score')?.value
    const entry_level = this.addForm.get('entry_level')?.value
    let Which_table = this.addForm.get('Which_table')?.value

    if (Which_table == '') {
      Which_table = 0;
    }


    const language_study = this.addForm.get('language_study')?.value
    const eng_test_name = this.addForm.get('eng_test_name')?.value
    const eng_test_score = this.addForm.get('eng_test_score')?.value
    const fr_test_name = this.addForm.get('fr_test_name')?.value
    const fr_test_score = this.addForm.get('fr_test_score')?.value
    const comment = this.addForm.get('comment')?.value

    const password = '@';
    const iswebsite = 0;
    const studnetSchoolInterest = '';
    const studnetProgInterest = '';
    const intakeMonth = '';

    this._EmployeeService.addNewLead(
      studentfName,
      studentlName,
      studentEmail,
      phoneNumber,
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
      password,
      iswebsite,
      source,
      language_study,
      eng_test_name,
      eng_test_score,
      fr_test_name,
      fr_test_score,
      comment,
      entry_level
    ).subscribe(
      (res: any) => {
        console.log(res[0].status);
        if (res[0].status === 201) {
          this.confirmAction(res[0].message);
        } else if (res[0].status === 203) {
          this.errorAction(res[0].message);
        }
        this._ModalService.dismissAll();
      }, (error) => {

      }
    );
  }

  archiveProspect(studentEmail: any) {
    this._EmployeeService.archiveLead(studentEmail).subscribe((data: any) => {
      console.log(studentEmail);
      const [{ status }] = data;
      if (status === 201) {
        this.confirmAction();
        this.refreshStudents();
      } else {
        this.errorAction();
      }
    });
  }

  // To refresh students
  refreshStudents() {
    this.refresh.emit();
  }


  addSuggestedSchool(username: string, element: any) {
    // console.log(this.editProg)
    if (this.editProg) {
      this.currentSP = {
        schoolName: this.SchoolName,
        programName: this.editSuggestedSchoolForm.value['programName'],
        Field: this.editSuggestedSchoolForm.value['programField'],
        Price: this.editSuggestedSchoolForm.value['programPrice'],
        Link: this.editSuggestedSchoolForm.value['programLink'],
        Language: this.editSuggestedSchoolForm.value['programLang'],
        comment: this.editSuggestedSchoolForm.value['comment'],
        intakeMonth: this.intakeMonth,
        duration: this.editSuggestedSchoolForm.value['Duration']
      };

      this.closeModal()
      this.editProg = false;

    }
    else {
      this.currentSP = {
        schoolName: this.addSugg_schoolName,
        programName: this.suggestedSchoolForm.value['programName'],
        Field: this.suggestedSchoolForm.value['programField'],
        Price: this.suggestedSchoolForm.value['programPrice'],
        Link: this.suggestedSchoolForm.value['programLink'],
        Language: this.suggestedSchoolForm.value['programLang'],
        comment: this.suggestedSchoolForm.value['comment'],
        intakeMonth: this.intakeMonth,
        duration: this.suggestedSchoolForm.value['Duration']
      };
      this.suggestedPrograms.unshift(this.currentSP);
      // this.suggestedSchoolForm.reset();
    }
    console.log("added obj" + this.currentSP);

    this.schoolImagePath = this.schoolImagePath + this.currentSP.schoolName + '.png';
    this._ModalService.dismissAll();
    //Open Detail Card
    this.openModal(
      element,
      'suggested-modal-card',
      'cardsize',
      []
    );
    // }
  }

  openCard(username: string) {
    // this.getAllProgram(username);
    this.openModal(
      this.suggestedCard,
      'suggested-modal-card',
      'cardsize',
      []
    );
  }

  openSuggPopup(data: any) {
    this.suggestedProgramsflag = true;
    this.SuggesdtedProgramData = data;
    localStorage.setItem('ChosenUserName', this.SuggesdtedProgramData.studentUserName);
    this.openCard(this.SuggesdtedProgramData.studentUserName);
  }

  dismissPopUp(username: string) {
    // console.log(this.editProg);
    if (this.editProg) {

      this.currentSP = {
        schoolName: this.SchoolName,
        programName: this.editSuggestedSchoolForm.value['programName'],
        Field: this.editSuggestedSchoolForm.value['programField'],
        Price: this.editSuggestedSchoolForm.value['programPrice'],
        Link: this.editSuggestedSchoolForm.value['programLink'],
        Language: this.editSuggestedSchoolForm.value['programLang'],
        comment: this.editSuggestedSchoolForm.value['comment'],
        intakeMonth: this.intakeMonth,
        duration: this.editSuggestedSchoolForm.value['Duration']
      };
      this.closeModal()

    }
    else {
      this.currentSP = {
        schoolName: this.SchoolName,
        programName: this.suggestedSchoolForm.value['programName'],
        Field: this.suggestedSchoolForm.value['programField'],
        Price: this.suggestedSchoolForm.value['programPrice'],
        Link: this.suggestedSchoolForm.value['programLink'],
        Language: this.suggestedSchoolForm.value['programLang'],
        comment: this.suggestedSchoolForm.value['comment'],
        intakeMonth: this.intakeMonth,
        duration: this.suggestedSchoolForm.value['Duration']
      };
    }
    this.addFinalSugProg(username);
  }

  addFinalSugProg(username: string) {
    this._EmployeeService
      .addSuggestedProgram(username, JSON.stringify(this.suggestedPrograms))
      .subscribe(async (data: any) => {
        const { status, message } = data;
        if (status === 200) {
          await this.confirmAction(message);

          this._ModalService.dismissAll();
          console.log("status", status);
          console.log(this.suggestedPrograms);
        }
        // console.log(this.programField.nativeElement.value());
      });
  }

  editSugProg(username: string) {

    this.editCard = {
      schoolName: this.addSugg_schoolName,
      programName: this.editSuggestedSchoolForm.value['programName'],
      Field: this.editSuggestedSchoolForm.value['programField'],
      Price: this.editSuggestedSchoolForm.value['programPrice'],
      Link: this.editSuggestedSchoolForm.value['programLink'],
      Language: this.editSuggestedSchoolForm.value['programLang'],
      comment: this.editSuggestedSchoolForm.value['comment'],
      intakeMonth: this.intakeMonth,
      duration: this.editSuggestedSchoolForm.value['Duration']
    };

    this.suggestedPrograms[this.editCardIndex] = this.editCard;

    // this.addSuggestedSchool(username);
    this._ModalService.dismissAll();
    //Open Detail Card
    this.openModal(
      this.suggestedCard,
      'suggested-modal-card',
      'cardsize',
      []
    );
  }


  deleteSuggestedProgram(index: number) {
    this.suggestedPrograms.splice(index, 1);
    // this.closeModal();
  }

  addAnotherSugProg(username: any, userName: string, element: any) {
    console.log(username);
    this.closeModal();
    this.openModal(
      element,
      'suggested-modal',
      'xl',
      username
    );
  }

  getAllProgram(username: string) {
    this._EmployeeService.getSuggestedProgram(username)
      .subscribe((data: any) => {
        this.suggestedPrograms = data;
      })
  }


  // Open Edit Modal
  openEditmodal(element: any,
    className: string,
    size: string,
    cardIndex: number) {

    this.editCardIndex = cardIndex;
    this.editProg = true;
    console.log('edit mode')
    this.addSugg_schoolName = this.suggestedPrograms[cardIndex].schoolName;
    this.intakeMonth = this.suggestedPrograms[cardIndex].intakeMonth;
    this.editSuggestedSchoolForm = new FormGroup({
      "programName": new FormControl(this.suggestedPrograms[cardIndex].programName, [Validators.required]),
      "programField": new FormControl(this.suggestedPrograms[cardIndex].Field, [Validators.required]),
      "programPrice": new FormControl(this.suggestedPrograms[cardIndex].Price, [Validators.required]),
      "programLang": new FormControl(this.suggestedPrograms[cardIndex].Language, [Validators.required]),
      "programLink": new FormControl(this.suggestedPrograms[cardIndex].Link, [Validators.required]),
      "comment": new FormControl(this.suggestedPrograms[cardIndex].comment, [Validators.required]),
      "Duration": new FormControl(this.suggestedPrograms[cardIndex].duration, [Validators.required])
    });
    this._ModalService.dismissAll();

    this._ModalService.open(element, { windowClass: className, size: size });

  }

  getSuggestedPrograms(username: string) {
    this._EmployeeService
      .getSuggestedProgram(username)
      .subscribe((data: any) => {
        if (data.length !== 0) {
          this.suggestedPrograms = JSON.parse(data[0][0].replace(/'/g, '"'));
        }
      });
  }
  firstContactFilter() {
    this.showFirstContactFilter = !this.showFirstContactFilter;
  }
  CheckingProgramFilter() {
    this.showCheckingProgramFilter = !this.showCheckingProgramFilter;
  }
  PreparingDocsFilter() {
    this.showPreparingDocsFilter = !this.showPreparingDocsFilter;
  }
}
