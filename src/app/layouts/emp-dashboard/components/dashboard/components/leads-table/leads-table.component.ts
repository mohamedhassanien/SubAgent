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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { Comment } from 'src/app/shared/models/comment';

import * as FileSaver from 'file-saver';
import { log } from 'console';

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
  selector: 'app-leads-table',
  templateUrl: './leads-table.component.html',
  styleUrls: ['./leads-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeadsTableComponent implements OnInit {
  @Input() searchLeads!: string;
  @Input() sizeName!: number;
  @Input() allStudents!: Student[];
  @Input() originalStudents!: Student[];

  @Output() refresh = new EventEmitter();

  type: string = String(localStorage.getItem('type'));
  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));

  schools!: School[];
  countries!: any[];

  sortName!: string;
  page: number = 1;

  // Dropdowns
  scores: number[] = [1, 2, 3, 4, 5];
  studentStatus: string[] = [
    'First Contact',
    'Checking Programs',
    'Preparing Docs',
    'Applied',
  ];
  intakes: string[] = ['September', 'January'];
  years: number[] = [2022, 2023, 2024];

  mainLinkArr: string[] = this._Router.url.split('/');
  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 1];

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

  commentForm!: FormGroup;
  editCommentForm!: FormGroup;

  editCommentMode: boolean[] = [];

  screenWidth!: number;

  @Input('loading') loading!: boolean;

  constructor(
    private _EmployeeService: EmployeeService,
    private _StudentsService: StudentsService,
    private _Router: Router,
    private _ModalService: NgbModal,
    private _FormBuilder: FormBuilder,
    private _UploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getCountries();
    this.getSchools();
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
  }

  // To refresh students
  refreshStudents() {
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
        vip,
      },
    } = data;

    this._EmployeeService
      .editStudent(
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
        studentIntakeYear
      )
      .subscribe((res: any) => {
        const [{ status, Message }] = res;
        if (status === 201) {
          this.confirmAction();
          if (studentStatus === 'Applied')
            this._Router.navigate([
              '/employees',
              this.empName,
              'dashboard',
              'application-management',
            ]);
        } else {
          this.errorAction(Message);
        }
      });
  }

  employees: any[] = [];
  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }

  // To assign a lead to an employee
  assingLead(studentUserName: string, empUserName: string) {
    this._EmployeeService
      .assignLeads(studentUserName, empUserName)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          console.log(empUserName);
          this.confirmAction();
          this.refreshStudents();
        } else {
          this.errorAction();
        }
      });
  }

  // To Archive a lead
  archiveLead(studentEmail: string) {
    this._EmployeeService.archiveLead(studentEmail).subscribe((data: any) => {
      const [{ status }] = data;
      if (status === 201) {
        this.confirmAction();
        this.refreshStudents();
      } else {
        this.errorAction();
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

  // restore deleted student
  restoreToProspect(userName: string) {
    this._EmployeeService.restoreToProspect(userName).subscribe((data: any) => {
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

  // To open any modal
  openModal(element: any, className: string, size: string, data: any[]) {
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

  // get current time
  getTime() {
    return new Date();
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
    const comment = encodeURIComponent(formData.value.comment);
    this._EmployeeService
      .addNewComment(studentEmail, comment)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.commentForm.reset();
          this.getComments();
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
    if (status === 'First Contact') return '#b3e5fc';
    else if (status === 'Checking Programs') return '#ffd8b2';
    else if (status === 'Preparing Docs') return '#eccfff';
    else return '#c8e6c9';
  }

  // To get colors for status
  getStatusColor(status: string) {
    if (status === 'First Contact') return '#23547b';
    else if (status === 'Checking Programs') return '#805b36';
    else if (status === 'Preparing Docs') return '#694382';
    else return '#256029';
  }

  exportExcel() {
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
}
