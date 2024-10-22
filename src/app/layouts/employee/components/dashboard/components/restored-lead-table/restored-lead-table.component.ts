import { Prospect } from '../../../../../../shared/models/prospect';
import FileSaver from 'file-saver';
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
import { Router } from '@angular/router';
import { FilterMatchMode, PrimeNGConfig, SelectItem } from 'primeng/api';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { max } from 'rxjs/operators';
import { Comment } from 'src/app/shared/models/comment';

import { Options } from '@angular-slider/ngx-slider';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// interface Intake {
//   name: string;
// }

// interface Year {
//   name: string;
// }

@Component({
  selector: 'app-restored-lead-table',
  templateUrl: './restored-lead-table.component.html',
  styleUrls: ['./restored-lead-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RestoredLeadTableComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: Table;
  @Input() searchLeads!: string;
  @Input() sizeName!: number;
  @Input() allProspects!: Prospect[];
  @Input() originalProspects!: Prospect[];
  @Output() refresh = new EventEmitter();
  @Input('loading') loading!: boolean;

  empName = localStorage.getItem('name');
  empUserName: string = String(localStorage.getItem('userName'));
  currentYear = new Date().getFullYear();

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

  //Menu Dropdowns
  // intakes: Intake[] = [{ name: 'September' }, { name: 'January' }];
  // selectedIntake: Intake | undefined;
  // years: Year[] = [{ name: '2022' }, { name: '2023' }, { name: '2024' }];
  // selectedYear: Year | undefined;
  // prospectStatus: string[] = ['First Contact', 'Restored from prospect'];

  // Dropdowns
  scores: number[] = [1, 2, 3, 4, 5];
  fieldsOfInterest: string[] = [
    'Arts, Design & Architecture',
    'Business & Management',
    'Computer Science & IT',
    'Engineering & Technology',
    'Marketing & communication',
    '',
  ];
  

  mainLinkArr: string[] = this._Router.url.split('/');

  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 1];

  // Table pagination
  first = 0;
  rows = 10;

  allComments!: Comment[];
  commentForm!: FormGroup;
  editCommentForm!: FormGroup;

  editCommentMode: boolean[] = [];

  isAddingComment: boolean = true;
  isThereComments: boolean = false;

  // To catch table from template

  selectedColumns!: Prospect[];

  uploadedFile!: File | undefined;
  screenWidth!: number;

  employees: any[] = [];
  showGridViewContainer = false;

  addForm!: FormGroup;
  // Filter
  myLeadFilter: any;
  intakeFilter: any = '';
  YearFilter: any = '';

  inviteData: any;
  accountCreatedListData: any;

  studentViewShow = true;
  countryName: string = 'Select Country';
  residenceCountry: string = 'Select Country';
  seriousNumber: string = 'Select Score';
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
  countries!: any[];
  selectedSch!: string;
  is_checked: any;
  checked = true;

  currentTime = new Date();
  year = this.currentTime.getFullYear();
  intakes: string[] = ['September', 'January'];
  years: string[] = [
    (this.year - 1).toString(),
    this.year.toString(),
    (this.year + 1).toString(),
    (this.year + 2).toString(),
  ];

  allCountriess = [
    'Afghanistan',
    'land Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'AndorrA',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo, The Democratic Republic of the',
    'Cook Islands',
    'Costa Rica',
    'Cote D Ivoire',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands (Malvinas)',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and Mcdonald Islands',
    'Holy See (Vatican City State)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran, Islamic Republic Of',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, Democratic People S Republic of',
    'Korea, Republic of',
    'Kuwait',
    'Kyrgyzstan',
    'Lao People S Democratic Republic',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libyan Arab Jamahiriya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Macedonia, The Former Yugoslav Republic of',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova, Republic of',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestinian Territory, Occupied',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russian Federation',
    'RWANDA',
    'Saint Helena',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan, Province of China',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'United States Minor Outlying Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Viet Nam',
    'Virgin Islands, British',
    'Virgin Islands, U.S.',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
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

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router,
    private _ModalService: NgbModal,
    private _FormBuilder: FormBuilder,
    private _StudentsService: StudentsService,
    private route: ActivatedRoute
  ) {
    this.addForm = this._FormBuilder.group({
      firstname: [
        '',
        [Validators.required],
      ],
      lastname: [
        '',
        [Validators.required],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      budget: '',
      source: [],
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
  }

  ngOnInit(): void {
    this.filterAction();

    // To get all comments

    this.getAllEmployees();
    this.getCountries();

    // To intialize add comment form
    this.commentForm = this._FormBuilder.group({
      comment: ['', Validators.required],
    });
    // To intialize edit comment form
    this.editCommentForm = this._FormBuilder.group({
      editComment: ['', Validators.required],
    });
  }

  unarchiveLead(studentEmail: string) {
    this._EmployeeService.unarchiveLead(studentEmail).subscribe((data: any) => {
      const [{ status }] = data;
      if (status === 200) {
        this.confirmAction();
        this.refreshStudents();

        this._EmployeeService.getProspects(1, this.YearFilter, this.intakeFilter, null, null, 0, 0).subscribe((data: any) => {
          this.allProspects = data.Data;
          // this.loading = false;
        });

      } else {
        this.errorAction();
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
    });
  }
  studentEdit(nationality, residenceCountry: string) {
    this.studentViewShow = false;
    this.residenceCountry = residenceCountry;
    this.countryName = nationality;
  }
  changeSelection(identifier: string, e?: any, value?: string) {
    if (identifier === 'score') {
      const inputval = e.target.innerText;
      this.seriousNumber = inputval;
    } else if (identifier === 'country') {
      const inputval = e.target.innerText;
      this.countryName = inputval;
    } else if (identifier === 'residence') {
      const inputval = e.target.innerText;
      this.residenceCountry = inputval;
    }
  }
  change(e: any) {
    this.selectedSch = e.value;
  }
  changeChecked() {
    this.checked = false;
  }

  submitEdit(formData: FormGroup, userName: string) {
    const data = { ...formData.value };
    const empId = String(localStorage.getItem('userName'));
    const nation = this.countryName;
    const countryOfResidence = this.residenceCountry;
    // const score = this.seriousNumber;

    // const {
    //   phone: { number: phoneNumber },
    // } = data;
    const {
      phone: { e164Number: phoneNumber },
    } = data;
    console.log('phone---------------')
    console.log(data.phone)
    const phoneNumber1 = phoneNumber.replace('+','')

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
        userName,
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
          const { status, Message ,Status,message} = res;
          if (Status === 200) {
            this.confirmAction(message);
            this._ModalService.dismissAll();
            this.studentViewShow = true;
          } else if (status === 203) {
            this.errorAction(Message);
            this._ModalService.dismissAll();
            this.studentViewShow = true;
            
          } 
        },
        (error) => {}
      );
  }
  // To refresh students
  refreshStudents() {
    this.refresh.emit();
  }

  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data.data;
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

  // To confirm error
  errorAction(message: string = "You don't have acces") {
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
        name,
        email,
        fieldOfInterest,
        phone,
        score,
        status,
        nationality,
        username,
      },
    } = data;
    this._EmployeeService
      .editLead(
        name,
        email,
        fieldOfInterest,
        phone.number,
        score,
        status,
        nationality,
        username
      )
      .subscribe((res: any) => {
        const [{ status, Message }] = res;

        this.confirmAction();
        this.refreshStudents();
        
        if (status === 201) {
         
        } else {
          this.errorAction(Message);
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
    return this.allProspects ? this.first === 0 : true;
  }

  isLastPage(): boolean {
    return this.allProspects
      ? this.first >= this.allProspects.length - this.rows
      : true;
  }

  // To reset table
  resetTable() {
    this.first = 0;
    this.refreshStudents();
    this.table.reset();
  }

  // To open any modal
  openModal(element: any, className: string, size: string, data: any[]) {
    this._ModalService.open(element, { windowClass: className, size: size });
    this.isAddingComment = true;
    this.isThereComments = false;
    if (className === 'comments-modal') {
      const email: string = data.toString();
      this.getStudentComments(email);
    }
  }

  // To close any modal
  closeModal() {
    this._ModalService.dismissAll();
  }

  // get current time
  getTime() {
    return new Date();
  }

  // To delete a comment
  deleteComment(id: number, studentEmail: string) {
    this._EmployeeService.deleteOldComment(id).subscribe((data: any) => {
      const [{ status }] = data;
      if (status === 204) {
        // this.getComments();
        this.getStudentComments(studentEmail);
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
          this.getStudentComments(email);
          // this.getComments();
        }
      });
  }

  // Cancel edit comment
  cancelEditComment(index: number) {
    this.editCommentForm.reset();
    this.editCommentMode[index] = false;
  }
  setProgressValue(value: number) {
    let max = 25;
    if (value > max) {
      value = 25;
    }
    return (value / max) * 100;
  }
  getProgressColor(days: number): string {
    if (days <= 5) return 'progress-green';
    else if (days <= 10) return 'progress-yellow';
    else if (days <= 20) return 'progress-orange';
    else if (days <= 25) return 'progress-red';
    return 'progress-red';
  }
  // To add a comment
  submit(formData: FormGroup, studentEmail: string) {
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


  submitArchive(formData: FormGroup, studentEmail: string) {
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

      this._EmployeeService.filterAction(4, null, null, 1).subscribe(data=>{
        console.log('1')
      });

      
  }


  // To assign a lead to an prospect
  sendToLead(studentUserName: string) {
    this._EmployeeService
      .sendProspectToLeads(studentUserName)
      .subscribe((data: any) => {
        const [{ status, Message }] = data;

        if (status === 201) {
          this.confirmAction(Message);
          this._Router.navigate([
            '/employees',
            this.empName,
            'dashboard',
            'prospect-management',
            'leads',
            'mytotalleads',
          ]);
          this.filterAction();
        } else {
          this.errorAction();
        }
      });
  }
  // To assign a lead to an employee
  assignProspect(studentUserName: string, empName) {
    this._EmployeeService
      .assignLeads(studentUserName, empName)
      .subscribe((data: any) => {
        const [{ status, message }] = data;
        if (status === 201) {
          this.confirmAction(message);
          this.refreshStudents();
          setInterval(function (this) {
            this.filterAction();
          }, 1000);
        } else {
          this.errorAction();
        }
      });
  }

  // To get screen Width
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
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
  getScoreColor(score: number) {
    if (score == 1) return 'red';
    else if (score == 2) return 'yellow';
    else if (score == 3) return 'orange';
    else if (score == 4) return 'blue';
    else if (score == 5) return 'green';
    else return 'white';
  }

  // To get BG colors for status
  getStatusBG(status: string) {}
  // To get colors for status
  getStatusColor(status: string) {}

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.selectedColumns ? this.selectedColumns : this.allProspects
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
  showGridView() {
    this.showGridViewContainer = true;
    this._EmployeeService
      .filterAction(this.myLeadFilter, this.YearFilter, this.intakeFilter, 0)
      .subscribe((data: any) => {
        this._EmployeeService.filterData.next(data.Data);
        this.allProspects = data.Data;
        this.addForm.patchValue(this.allProspects);
      });
  }
  showListView() {
    this.showGridViewContainer = false;
  }

  // changeMyLead(value) {
  //   if (value == 0) {
  //     this._EmployeeService.myLead().subscribe((data: any) => {
  //       this.allProspects = data.Data;
  //     });
  //   } else if (value == 1) {
  //     this._EmployeeService.directLeads().subscribe((data: any) => {
  //       this.allProspects = data.Data;
  //     });
  //   } else if (value == 2) {
  //     this._EmployeeService.WebsiteLeads().subscribe((data: any) => {
  //       this.allProspects = data.Data;
  //     });
  //   }else if (value == 3) {
  //     this._EmployeeService.FutureLeads().subscribe((data: any) => {
  //       this.allProspects = data.Data;
  //     });
  //   }
  // }
  // changeIntake(month) {
  //   this._EmployeeService.IntakeMonth(month).subscribe((data: any) => {
  //     this.allProspects = data.Data;
  //   });
  // }
  // changeYear(month) {
  //   this._EmployeeService.IntakeYear(month).subscribe((data: any) => {
  //     this.allProspects = data.Data;
  //   });
  // }

  changeMyLead(value) {
    this.myLeadFilter = value;
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
  invite: any = [];
  account: any = [];

  filterAction() {
    if (this.myLeadFilter == undefined) {
      this.myLeadFilter = 4;
    }
    if (this.intakeFilter == '') {
      this.intakeFilter = null;
    }
    if (this.YearFilter == '') {
      this.YearFilter = null;
    }
    this._EmployeeService
      .filterAction(this.myLeadFilter, this.YearFilter, this.intakeFilter, 1)
      .subscribe((data: any) => {
        this._EmployeeService.filterData.next(data.Data);
        this.allProspects = data.Data;
        this.addForm.patchValue(this.allProspects);
      });
  }

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
      const email: string = data.toString();
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
  resetYear = 'Year';
  resetIntake = 'Intake';
  resetAllLeads = 4;

  clearFilter() {
    this.resetYear = 'Year';
    this.resetIntake = 'Intake';
    this.resetAllLeads = 4;

    this._EmployeeService
      .filterAction(1, null, null, 0)
      .subscribe((data: any) => {
        this._EmployeeService.filterData.next(data.Data);
        this.allProspects = data.Data;
        this.addForm.patchValue(this.allProspects);
      });
  }

  sendToProspect(prospect) {
    const status = 'Send to prospects';
    this._EmployeeService
      .sendToProspect(prospect, status)
      .subscribe((data: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your student was send to Prospect',
          timer: 3000,
        });
      });
  }

  getStudentComments(email: string) {
    this._EmployeeService.getStudentComments(email).subscribe((data: any) => {
      const [{ status, data: comments }] = data;
      this.allComments = comments;
    });
  }
}
