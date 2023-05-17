// import { Component, OnInit, ViewChild } from '@angular/core';
// import {
//   FormArray,
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
// import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
// import { StudentsService } from 'src/app/shared/services/students/students.service';
// import Swal from 'sweetalert2';
// import {
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';
// import {
//   DateAdapter,
//   MAT_DATE_FORMATS,
//   MAT_DATE_LOCALE,
// } from '@angular/material/core';
// import { MatDatepicker } from '@angular/material/datepicker';
// import * as _moment from 'moment';
// import { default as _rollupMoment, Moment } from 'moment';

// const moment = _rollupMoment || _moment;
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

// @Component({
//   selector: 'app-stats-info',
//   templateUrl: './stats-info.component.html',
//   styleUrls: ['./stats-info.component.scss'],
//   providers: [
//     NgbModalConfig,
//     NgbModal,
//     {
//       provide: DateAdapter,
//       useClass: MomentDateAdapter,
//       deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
//     },

//     { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
//   ],
// })
// export class StatsInfoComponent implements OnInit {
//   empName!: string;
//   empEmail!: string;

//   email!: string;
//   empId!: any;
//   myApplications: Array<any> = [];
//   myStudents: Array<any> = [];

//   searchText: string = '';
//   labelText: string = '';
//   studentSearch: string = '';

//   @ViewChild('content', { static: false }) private content;
//   @ViewChild('application', { static: false }) private application;
//   @ViewChild('viewMore', { static: false }) private viewMore;
//   @ViewChild('label', { static: false }) private label;

//   appForm!: FormGroup;
//   labelForm!: FormGroup;
//   commentsForm!: FormGroup;
//   deleteForm!: FormGroup;

//   status: any[] = [
//     'First Contact',
//     'Checking Programs',
//     'Preparing Documents',
//     'Applied',
//   ];
//   apps: any[] = [
//     'Application request',
//     'Preparing Documents',
//     'Sent to schools',
//     'Registered',
//     'Visa Accepted',
//     'Accepted',
//     'Rejected',
//   ];

//   allSchools: any = [];
//   schoolSelected: string = '';
//   schoolProgs: any = [];

//   // lables
//   lables: any = [];
//   studentLabel: any = [];

//   // myControl = new FormControl();
//   // options: string[] = ['One', 'Two', 'Three'];
//   // filteredOptions: Observable<string[]> = new Observable;

//   studentLabelArray: any = [];
//   // uniqueStudentLabelArray: any = [];

//   // comments
//   allComments: any = [];

//   //
//   settingForm!: FormGroup;
//   mailForm!: FormGroup;
//   emailAdress!: string;
//   city!: string;
//   img!: string;
//   name!: string;
//   phone!: string;
//   nationality!: string;
//   languageTest!: string;
//   profileData!: any;
//   studentData!: any;
//   programName!: string;
//   schoolName!: string;
//   id!: number;
//   // empName !: string;
//   // Documents
//   CV!: string;
//   ML!: string;
//   Pass!: string;
//   RL!: string;
//   PH!: string;
//   Trans!: string;
//   LC!: string;

//   // Condition to show documents that are uploaded

//   showDocs: boolean = true;
//   showInfo: boolean = false;

//   showCV: boolean = true;
//   showML: boolean = true;
//   showPass: boolean = true;
//   showTrans: boolean = true;
//   showRL: boolean = true;
//   showLC: boolean = true;

//   customSchoolCond: boolean = false;
//   customProgramCond: boolean = false;
//   customCityCond: boolean = false;

//   // private _filter(value: string): string[] {
//   //   const filterValue = value.toLowerCase();

//   //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
//   // }

//   constructor(
//     private form: FormBuilder,
//     private actRoute: ActivatedRoute,
//     private studServ: StudentsService,
//     private formBuilder: FormBuilder,
//     private employee: EmployeeService,
//     private router: Router,
//     config: NgbModalConfig,
//     private modalService: NgbModal
//   ) {
//     config.backdrop = 'static';
//     config.keyboard = false;

//     // initialize setting form
//     this.settingForm = formBuilder.group({
//       img: [''],
//       name: [''],
//       city: [''],
//       email: [''],
//       passport: [''],
//       cv: [''],
//       phone: [''],
//       ml: [''],
//       pass: [''],
//       rl: [''],
//       trans: [''],
//       lc: [''],
//       status: [''],
//       oldPassword: [''],
//       newPassword: [''],
//       confirmPassword: [''],
//     });
//   }

//   date = new FormControl(moment());
//   month: number = 0;
//   fullYear: number = 0;

//   setMonthAndYear(
//     normalizedMonthAndYear: Moment,
//     datepicker: MatDatepicker<Moment>
//   ) {
//     const ctrlValue = this.date.value;
//     ctrlValue.month(normalizedMonthAndYear.month());
//     ctrlValue.year(normalizedMonthAndYear.year());
//     this.date.setValue(ctrlValue);
//     this.month = this.date.value._d.getMonth() + 1;
//     this.fullYear = this.date.value._d.getFullYear();
//     var arrayOfDates: any = [];
//     this.myApplications.forEach((arr) => {
//       if (this.month == new Date(arr[9] * 1000).getMonth() + 1) {
//         arrayOfDates.push(arr);
//       }
//     });
//     this.myApplications = arrayOfDates;
//     datepicker.close();
//   }
//   resetDate() {
//     this.employee.getMyApplication(this.empName).subscribe((data) => {
//       this.myApplications = data;
//     });
//   }

//   ngOnInit(): void {
//     this.actRoute.params.subscribe((param) => {
//       this.empName = param.empId;

//       // to get Email
//       var emailIndex = document.cookie.indexOf('EmployeeEmail');
//       var emailValue = document.cookie.indexOf(';', emailIndex);
//       var value = document.cookie.substring(emailIndex, emailValue);
//       var array = value.split('=');
//       this.empEmail = array[1];
//     });

//     let empId = String(localStorage.getItem('EmpName'));
//     this.email = String(localStorage.getItem('EmpEmail'));

//     this.employee.getMyApplication(empId).subscribe(
//       (data: any) => {
//         if (data.length > 0) {
//           return (this.myApplications = data);
//         } else return false;
//       },
//       () => {
//         alert('something went wrong, Reload the page');
//       }
//     );
//     // // after get employee ID, get his application
//     // this.employee.getID()
//     // .subscribe(
//     //   (data : any) => {
//     //     if (data) return this.empId = data[0][2]
//     //     else return false
//     //   },
//     //   () => { alert('something wrong please try again')},
//     //   () => {
//     //     // request employee application
//     //     console.log(this.empName)

//     //     }
//     //   )

//     // display students
//     this.employee.getMyStudents(this.empEmail).subscribe(
//       (data: any) => {
//         if (data.length > 0) {
//           // to get studentArray
//           for (let i = 0; i < data.length; i++) {
//             for (let j = 0; j < data[i][31].length; j++) {
//               this.studentLabelArray.push(data[i][31][j]);
//             }
//           }
//           data = data.reverse();
//           return (this.myStudents = data);
//         } else return false;
//       },
//       (err) => {
//         alert('something went wrong, Reload the page');
//       }
//     );

//     this.employee.getAllSchools().subscribe((data) => {
//       this.allSchools = data;
//     });

//     this.appForm = this.form.group({
//       school: ['', [Validators.required]],
//       program: [''],
//       customSchool: [''],
//       customProgram: [''],
//       customCity: [''],
//     });

//     this.labelForm = this.form.group({
//       name: ['', [Validators.required]],
//       color: ['', [Validators.required]],
//     });

//     this.commentsForm = this.form.group({
//       new: ['', []],
//     });

//     this.deleteForm = this.form.group({
//       labelName: new FormArray([]),
//     });

//     this.getEmpLabels();
//   }

//   refreshApplication() {
//     this.employee.getMyApplication(this.empName).subscribe((data: any) => {
//       if (data.length >= 0) {
//         return (this.myApplications = data);
//       }
//     });
//   }

//   // To change status of applications in db
//   changeAppStatus(value: string, appId: number, studentUserName: string) {
//     // let empId = String(localStorage.getItem('EmpName'));
//     this.employee
//       .changeAppStatus(value, this.empName, appId, studentUserName)
//       .subscribe((data) => {
//         this.refreshApplication();
//       });
//   }

//   // To asign labels for each emp
//   getEmpLabels() {
//     // let empName = String(localStorage.getItem('EmpName'))
//     this.employee.getEmpLabels(this.empName).subscribe((data) => {
//       if (data) {
//         this.lables = data;
//       }
//     });
//   }

//   // To recall the API of get students
//   refreshStudents() {
//     // let empName = String(localStorage.getItem('EmpName'))
//     this.employee.getMyStudents(this.empEmail).subscribe(
//       (data: any) => {
//         if (data.length > 0) {
//           return (this.myStudents = data);
//         } else return false;
//       },
//       (err) => {
//         alert('something went wrong, Reload the page');
//       }
//     );
//   }

//   deleteApp(id: string) {
//     this.employee.deleteApp(id).subscribe((data) => {
//       this.refreshApplication();
//       this.modalService.dismissAll();
//     });
//   }

//   deleteAllApp(email: string) {
//     // let empName = String(localStorage.getItem('EmpName'))
//     this.employee.deleteAllApps(email, this.empName).subscribe((data) => {
//       this.refreshApplication();
//       this.modalService.dismissAll();
//     });
//   }

//   // go to student account
//   navigateToStudentDash(stuEmail: string) {
//     localStorage.setItem('StuEmail', stuEmail);
//     localStorage.setItem('isLoggedIn', 'true');
//     this.router.navigate(['/students']);
//   }

//   changeStatus(studendEmail: string, stats: string) {
//     this.studentEmail = studendEmail;
//     if (stats == this.status[3]) {
//       this.employee
//         .changeStudentStatus(studendEmail, stats)
//         .subscribe((data) => {
//           this.open(this.content);
//         });
//     } else {
//       this.employee
//         .changeStudentStatus(studendEmail, stats)
//         .subscribe((data) => {
//           this.refreshStudents();
//           // location.reload()
//         });
//     }
//   }

//   studentEmail: string = '';
//   newApplication() {
//     this.modalService.dismissAll();
//     this.schoolSelected = '';
//     this.modalService.open(this.application, { size: 'lg' });
//   }

//   viewMoreDetails(email: string) {
//     this.modalService.open(this.viewMore, { size: 'xl' });
//     // to show application info
//     // get student's profile by pass student's email to API (get student's email from the link's params)
//     this.studServ.profile(email).subscribe((data: any) => {
//       this.profileData = [
//         this.name,
//         ,
//         ,
//         ,
//         ,
//         this.nationality,
//         this.languageTest,
//         this.city,
//         ,
//         ,
//         ,
//         ,
//         this.phone,
//         ,
//         this.CV,
//         this.ML,
//         this.Pass,
//         this.RL,
//         this.PH,
//         this.Trans,
//         this.LC,
//       ] = data[0];

//       if (
//         this.CV == '' &&
//         this.LC == '' &&
//         this.ML == '' &&
//         this.Trans == '' &&
//         this.RL == '' &&
//         this.Pass == ''
//       ) {
//         this.showInfo = true;
//         this.showDocs = false;
//       }

//       if (this.CV == null || this.CV == '') this.showCV = false;
//       if (this.ML == null || this.ML == '') this.showML = false;
//       if (this.Pass == null || this.Pass == '') this.showPass = false;
//       if (this.Trans == null || this.Trans == '') this.showTrans = false;
//       if (this.RL == null || this.RL == '') this.showRL = false;
//       if (this.LC == null || this.LC == '') this.showLC = false;
//     });
//   }

//   selected(e) {
//     if (e.target.value == 'custom') {
//       this.schoolSelected = '';
//       this.customSchoolCond = true;
//       this.customProgramCond = true;
//       this.customCityCond = true;
//     } else {
//       this.schoolSelected = e.target.value;
//       this.employee.getSchoolProgs(this.schoolSelected).subscribe((data) => {
//         this.schoolProgs = data;
//       });
//     }
//   }

//   onSubmit(formData: any) {
//     if (formData.controls.customSchool.value != '') {
//       let school = formData.controls.customSchool.value;
//       let program = formData.controls.customProgram.value;
//       let city = formData.controls.customCity.value;
//       // let empName = String(localStorage.getItem('EmpName'))
//       this.employee
//         .createApplication(
//           program,
//           school,
//           this.studentEmail,
//           city,
//           this.empName
//         )
//         .subscribe((data) => {
//           this.refreshApplication();
//         });
//       this.modalService.dismissAll();
//       Swal.fire('Success!', 'You Created an application!', 'success');
//       this.refreshStudents();
//       this.customSchoolCond = false;
//       this.customProgramCond = false;
//       this.customCityCond = false;
//       this.appForm.setValue({
//         school: ['', [Validators.required]],
//         program: [''],
//         customSchool: [''],
//         customProgram: [''],
//         customCity: [''],
//       });
//     } else {
//       let school = formData.value.school;
//       let programArray = formData.value.program;
//       let array = programArray.split(',');
//       let program = array[0];
//       let city = array[1];
//       let empName = String(localStorage.getItem('EmpName'));
//       // console.log(school, program, this.studentEmail, city, empName)
//       this.employee
//         .createApplication(program, school, this.studentEmail, city, empName)
//         .subscribe((data) => {
//           this.refreshApplication();
//         });
//       this.modalService.dismissAll();
//       Swal.fire('Success!', 'You Created an application!', 'success');
//       this.refreshStudents();
//     }
//   }

//   changeLabel(label: any, studentEmail: string, student: any) {
//     // console.log(student)
//     var array: any = [];
//     for (let i = 0; i < student.length; i++) {
//       array[i] = student[i][0];
//     }
//     if (label == 'custom') {
//       this.open(this.label);
//     } else if (array.some((item) => item == label)) {
//       return;
//     } else {
//       this.employee
//         .connectIdWithEmail(label, studentEmail)
//         .subscribe((data) => {
//           console.log(data);
//           this.refreshStudents();
//         });
//     }
//   }

//   deleteLabel(id: number, email: string) {
//     this.employee.deleteLabel(id, email).subscribe((data) => {
//       this.refreshStudents();
//     });
//   }

//   onSubmitLabel(formData: any) {
//     // let empName = String(localStorage.getItem('EmpName'))
//     let string: string = String(formData.value.color);
//     let sub: string = string.substring(1, string.length);
//     this.employee
//       .createLabel(formData.value.name, this.empName, sub)
//       .subscribe((data) => {
//         this.getEmpLabels();
//         this.refreshStudents();
//       });
//     this.modalService.dismissAll();
//     Swal.fire('Success!', 'You Created a Label!', 'success');
//   }

//   open(content) {
//     this.modalService.open(content);
//   }

//   closeModal() {
//     this.modalService.dismissAll();
//     this.schoolSelected = '';
//     this.allComments = [];
//     // to reset deleteForm
//     let frmArray = this.deleteForm.get('labelName') as FormArray;
//     frmArray.clear();
//     this.refreshStudents();
//   }

//   // To set the background color of badges
//   getColor(label: any): any {
//     for (let i = 0; i < label.length; i++) {
//       switch (i) {
//         case i:
//           return `#${label[3]}`;
//         default:
//           return '#000';
//       }
//     }
//   }

//   // to filter labels to show to emp
//   filterLabels(value: string) {
//     if (value == 'all') {
//       this.refreshStudents();
//     }
//   }

//   // to get all comments
//   getComments(email: string) {
//     this.allComments = [];
//     this.employee.getComments(email).subscribe((data) => {
//       return (this.allComments = data);
//       // this.modalService.open(this.comments, { size: 'lg' })
//     });
//   }

//   onSubmitComment(formData: any, email: string) {
//     let empName = String(localStorage.getItem('EmpName'));
//     let comment = formData.value.new;
//     this.employee.addComment(email, empName, comment).subscribe((data) => {
//       if (data == true) {
//         this.getComments(email);
//         this.commentsForm.reset();
//       }
//     });
//   }

//   deleteComment(id: number, email: string) {
//     this.employee.deleteComment(id).subscribe((data) => {
//       if (data['deleted'] == true) {
//         this.getComments(email);
//       }
//     });
//   }

//   // to delete student
//   deleteStudent(email: string) {
//     // let empId = String(localStorage.getItem('EmpName'));
//     this.employee.moveToTrashBin(email, this.empId).subscribe((data) => {
//       if (data) {
//         this.refreshStudents();
//         this.modalService.dismissAll();
//       }
//     });
//   }

//   sortingDownName: boolean = false;
//   sortingUpName: boolean = true;
//   // sorting name
//   sortName() {
//     this.sortingDownName = !this.sortingDownName;
//     this.sortingUpName = !this.sortingUpName;
//     if (this.sortingDownName == false) {
//       this.myStudents = this.myStudents.reverse();
//       this.myStudents.sort(function (a, b) {
//         return a[0] < b[0] ? 1 : -1;
//       });
//     } else {
//       this.myStudents = this.myStudents.reverse();
//       this.myStudents.sort(function (a, b) {
//         return a[0] > b[0] ? 1 : -1;
//       });
//     }
//   }

//   sortingDownNat: boolean = false;
//   sortingUpNat: boolean = true;
//   // sorting Nationality
//   sortNat() {
//     this.sortingDownNat = !this.sortingDownNat;
//     this.sortingUpNat = !this.sortingUpNat;
//     if (this.sortingDownNat == false) {
//       this.myStudents = this.myStudents.reverse();
//       this.myStudents.sort(function (a, b) {
//         return a[5] < b[5] ? 1 : -1;
//       });
//     } else {
//       this.myStudents = this.myStudents.reverse();
//       this.myStudents.sort(function (a, b) {
//         return a[5] > b[5] ? 1 : -1;
//       });
//     }
//   }

//   sortDownEmail: boolean = false;
//   sortUpEmail: boolean = true;
//   // sorting Email
//   sortEmail() {
//     this.sortDownEmail = !this.sortDownEmail;
//     this.sortUpEmail = !this.sortUpEmail;
//     if (this.sortDownEmail == false) {
//       this.myStudents = this.myStudents.reverse();
//       this.myStudents.sort(function (a, b) {
//         return a[4] < b[4] ? 1 : -1;
//       });
//     } else {
//       this.myStudents = this.myStudents.reverse();
//       this.myStudents.sort(function (a, b) {
//         return a[4] > b[4] ? 1 : -1;
//       });
//     }
//   }

//   // To get the array of checked labels
//   onCheckLabel(label: number) {
//     const control = new FormControl(label, []);
//     (<FormArray>this.deleteForm.get('labelName')).push(control);
//     // console.log(this.deleteForm.get('labelName')?.value);
//   }

//   // delete labels from db
//   onSubmitDeleteLabels() {
//     this.employee
//       .deleteLabels(this.deleteForm.get('labelName')?.value)
//       .subscribe((data) => {
//         this.getEmpLabels();
//         this.refreshStudents();
//         let frmArray = this.deleteForm.get('labelName') as FormArray;
//         frmArray.clear();
//         this.modalService.dismissAll();
//       });
//   }
// }
