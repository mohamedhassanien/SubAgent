import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { log } from 'console';
import { Student } from 'src/app/shared/models/student';
import { Comment } from './../../../../../../shared/models/comment';
import { UploadService } from './../../../../../../shared/services/upload/upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Upload } from './../../../../../../shared/services/upload/upload';
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
import { Table } from 'primeng/table';
import { Application } from 'src/app/shared/models/application';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import Swal from 'sweetalert2';
import FileSaver from 'file-saver';

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
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationsTableComponent implements OnInit {
  @Input() allApplications!: Application[];
  @Input() originalApplications!: Application[];
  @Input() searchApps!: string;
  @Input() sizeName!: number;
  @Input('docs') docs!: any[];
  @Output() refresh = new EventEmitter();
  @Input('loading') loading!: boolean;
  @ViewChild('table', { static: false }) table!: Table;
  addForm!: FormGroup;

  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));

  sortName!: string;
  page: number = 1;

  schools!: School[];
  countries!: any[];

  programs!: Program[];
  employees: any[] = [];

  // Dropdowns
  scores: number[] = [1, 2, 3, 4, 5];
  appStatus: string[] = [
    'Sent to school',
    'Interview Preparation',
    'Accepted',
    'Alternance Found',
    'Deposit Paid',
    'Visa Ok',
    'Rejected',
    'Visa Refused',
    'Canceled',
  ];
  intakes: string[] = ['September', 'January'];
  years: number[] = [2022, 2023, 2024];

  mainLinkArr: string[] = this._Router.url.split('/');
  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 1];

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

  screenWidth!: number;
  searchSch: string = '';
  constructor(
    private _Router: Router,
    private _StudentsService: StudentsService,
    private _EmployeeService: EmployeeService,
    private _ModalService: NgbModal,
    private _FormBuilder: FormBuilder,
    private _UploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getSchools();
    this.getPrograms();
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

  selectedSch!: string;
  change(e: any) {
    this.selectedSch = e.value;
  }

  selectedProg: string = 'Enter a program';
  newProg(e: any) {
    this.selectedProg = e.target.value;
  }
  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
    });
  }

  addNewApp() {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const month = (<HTMLInputElement>document.getElementById('month')).value;
    const year = (<HTMLInputElement>document.getElementById('year')).value;
    const sch = this.selectedSch;
    const prog = this.selectedProg;
    const empUserName = String(localStorage.getItem('userName'));

    this._EmployeeService
      .addNewProgram(email, name, sch, prog, empUserName, month, year)
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
      const { status } = data;
      console.log(data);

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

  // To get all programs
  getPrograms() {
    this._EmployeeService.getProgramsNames().subscribe((data: any) => {
      const [{ status, data: programs }] = data;
      this.programs = programs;
    });
  }

  // To get all countries
  getCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
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
        vip,
      },
    } = data;

    this._EmployeeService
      .editApplication(
        studentFullName,
        studentEmail,
        studentUsername,
        studentPhone,
        studentNationality,
        studentSchoolName,
        studentProgramName,
        studentSource,
        studentScore,
        studensStatus,
        schoolCampus,
        studentIntakeMonth,
        studentIntakeYear,
        vip
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
        this.uploadPercentage[
          identifier as keyof typeof this.uploadPercentage
        ] = Math.round(percentage ? percentage : 0);
        if (percentage === 100) {
          setTimeout(() => {
            this.urlObject[identifier as keyof typeof this.urlObject] =
              currentFile.url;
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
          this.nameObject[fileType as keyof typeof this.nameObject],
          userName
        );
        this.urlObject[fileType as keyof typeof this.urlObject] = '';
        this.uploadPercentage[
          fileType as keyof typeof this.uploadPercentage
        ] = 0;

        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  openModal(element: any, className: string, size: string, data: any) {
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

    this._ModalService.open(element, { windowClass: className, size: size });
  }

  // To close any modal
  closeModal() {
    this._ModalService.dismissAll();
  }

  // To assign a lead to an employee
  assingLead(studentUserName: string, empUserName: string) {
    this._EmployeeService
      .assignLeads(studentUserName, empUserName)
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

  // To get app Date
  getAppDate(date: number) {
    const appDate = new Date(date * 1000);
    return `${appDate.getFullYear()}-${appDate.getMonth() + 1 < 10 ? '0' : ''}${
      appDate.getMonth() + 1
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
  // Phone number plugin
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  separateDialCode = false;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  seriousScores: string[] = ['1', '2', '3', '4', '5'];
  seriousNumber: string = 'Select Score';
  intakeMonths: string[] = ['January', 'September'];
  intakeMonthName: string = 'Select Month';

  intakeYears: string[] = ['2022', '2023'];
  intakeYearName: string = 'Select Year';

  schoolName: string = 'Select School';
  searchSchool!: string;
  countryName: string = 'Select Country';
  searchCountry!: string;
  selectedCountry!: string;

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
    if (status.toLowerCase() === 'sent to school') return '#b3e5fc';
    else if (status.toLowerCase() === 'deposit paid') return '#ffd8b2';
    else if (status.toLowerCase() === 'interview preparation') return '#eccfff';
    else if (status.toLowerCase() === 'rejected') return '#f93154';
    else if (status.toLowerCase() === 'visa ok') return '#c8e6c9';
    else if (status.toLowerCase() === 'visa refused') return '#dc3545';
    else if (status.toLowerCase() === 'canceled') return '#f112';
    else if (status.toLowerCase() === 'accepted') return '#198754';
    else if (status.toLowerCase() === 'alternance found') return '#b2ddb4';
    else return '#eee';
  }

  // To get colors for status
  getStatusColor(status: string) {
    if (status.toLowerCase() === 'Sent to school') return '#23547b';
    else if (status.toLowerCase() === 'deposit paid') return '#805b36';
    else if (status.toLowerCase() === 'interview preparation') return '#4e047e';
    else if (status.toLowerCase() === 'rejected') return '#fbfbfb';
    else if (status.toLowerCase() === 'visa ok') return '#203000';
    else if (status.toLowerCase() === 'visa refused') return '#ffffff';
    else if (status.toLowerCase() === 'canceled') return '#000';
    else if (status.toLowerCase() === 'accepted') return '#ffffff';
    else return '#000';
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
}
