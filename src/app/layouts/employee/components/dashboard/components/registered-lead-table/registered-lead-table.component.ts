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
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { Comment } from 'src/app/shared/models/comment';

interface Intake {
  name: string;
}

interface Year {
  name: string;
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
  selector: 'app-registered-lead-table',
  templateUrl: './registered-lead-table.component.html',
  styleUrls: ['./registered-lead-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisteredLeadTableComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: Table;
  @Input() searchLeads!: string;
  @Input() sizeName!: number;
  @Input() allProspects!: Prospect[];
  @Input() originalProspects!: Prospect[];
  @Output() refresh = new EventEmitter();
  @Input('loading') loading!: boolean;

  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));

  sortName!: string;
  page: number = 1;

  allComments!: Comment[];
  commentForm!: FormGroup;
  editCommentForm!: FormGroup;

  editCommentMode: boolean[] = [];

  isAddingComment: boolean = true;
  isThereComments: boolean = false;

  currentFile!: Upload;

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

  // Phone number plugin
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  separateDialCode = false;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  //Menu Dropdowns
  intakes: Intake[] = [{ name: 'September' }, { name: 'January' }];
  selectedIntake: Intake | undefined;
  years: Year[] = [{ name: '2022' }, { name: '2023' }, { name: '2024' }];
  selectedYear: Year | undefined;
  prospectStatus: string[] = ['First Contact', 'Restored from prospect'];

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

  // To catch table from template

  selectedColumns!: Prospect[];

  uploadedFile!: File | undefined;
  screenWidth!: number;

  employees: any[] = [];

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router,
    private _ModalService: NgbModal,
    private _UploadService: UploadService,
    private _FormBuilder: FormBuilder
  ) {
    this.getAllEmployees();
  }

  ngOnInit(): void {
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

  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }

  // get current time
  getTime() {
    return new Date();
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

  // To get all comments
  getComments() {
    this._EmployeeService.getAllComments().subscribe((data: any) => {
      const [{ status, data: comments }] = data;
      console.log('getComments', status);
      this.allComments = comments;
    });
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
        console.log(status, 'HELLO');
        if (status === 200) {
          this.commentForm.reset();
          this.getComments();
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

  editFields(data: any) {
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
          this.refreshStudents();
        } else {
          this.errorAction(Message);
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
  }
  // To close any modal
  closeModal() {
    this._ModalService.dismissAll();
  }

  // To assign a lead to an prospect
  sendToLead(studentUserName: string) {
    this._EmployeeService
      .sendProspectToLeads(studentUserName)
      .subscribe((data: any) => {
        console.log(data);
        const { status, Message } = data;

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
        } else {
          this.errorAction();
        }
      });
  }

  // To assign a lead to an employee
  assignProspect(studentUserName: string, empName) {
    this._EmployeeService
      .sendRegistered(studentUserName, empName)
      .subscribe((data: any) => {
        const [{ status, message }] = data;
        console.log(status === 201, status);
        if (status === 201) {
          this.confirmAction(message);
          this.refreshStudents();
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
  getScoreColor(score: number) {
    if (score == 1) return 'red';
    else if (score == 2) return 'yellow';
    else if (score == 3) return 'orange';
    else if (score == 4) return 'blue';
    else if (score == 5) return 'green';
    else return 'white';
  }

  //Toggle new comment
  toggleNewComment(studentEmail: string) {
    this.isAddingComment = !this.isAddingComment;
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
}
