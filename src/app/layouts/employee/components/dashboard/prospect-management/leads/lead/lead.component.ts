import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { Comment } from 'src/app/shared/models/comment';
import Swal from 'sweetalert2';

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

interface City {
  name: string;
  code: string;
}

@Component({
  selector: '[app-lead]',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LeadComponent implements OnInit {
  @Input('student') student!: Student;
  @Input('index') index!: number;
  @Input('docs') docs!: any[];

  @Output() refresh = new EventEmitter();

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.editMode)
      this.editStudent(this.student.studentUserName);
  }

  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));
  editMode: boolean = false;

  mainLinkArr: string[] = this._Router.url.split('/');
  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 1];

  schools!: School[];
  selectedSchool!: School;
  programs!: Program[];
  countries!: any[];
  scores: number[] = [1, 2, 3, 4, 5];
  studentStatus: string[] = [
    'First Contact',
    'Checking Programs',
    'Preparing Docs',
    'Applied',
  ];

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

  @ViewChild('nameInput', { static: false }) private nameInput!: ElementRef;
  @ViewChild('emailInput', { static: false }) private emailInput!: ElementRef;
  @ViewChild('phoneInput', { static: false }) private phoneInput!: ElementRef;
  @ViewChild('schoolInput', { static: false }) private schoolInput!: ElementRef;
  @ViewChild('programInput', { static: false })
  private programInput!: ElementRef;
  @ViewChild('nationalityInput', { static: false })
  private nationalityInput!: ElementRef;
  @ViewChild('sourceInput', { static: false })
  private sourceInput!: ElementRef;
  @ViewChild('scoreInput', { static: false })
  private scoreInput!: ElementRef;
  @ViewChild('statusInput', { static: false })
  private statusInput!: ElementRef;
  @ViewChild('intakeMonthInput', { static: false })
  private intakeMonthInput!: ElementRef;
  @ViewChild('intakeYearInput', { static: false })
  private intakeYearInput!: ElementRef;

  constructor(
    private _Router: Router,
    private _EmployeeService: EmployeeService,
    private _StudentsService: StudentsService,
    private _UploadService: UploadService,
    private _ModalService: NgbModal,
    private _FormBuilder: FormBuilder
  ) {
    // To get all schools
    this.getSchools();
    // To get all programs
    this.getPrograms();
    // To get all countries
    this.getCountries();
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

  ngOnInit(): void {
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

  // To refresh students
  refreshStudents() {
    this.refresh.emit();
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

  // To get all schools
  getSchools() {
    this._EmployeeService.getSchoolsNames().subscribe((data: any) => {
      const [{ status, data: schools }] = data;
      this.schools = schools;
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
    });
  }

  // To get all comments
  getComments() {
    this._EmployeeService.getAllComments().subscribe((data: any) => {
      const [{ status, data: comments }] = data;
      this.allComments = comments;
    });
  }

  // To color bg of seriousness score
  getBGColor(score: number) {
    if (score == 1) return '#ea4335';
    else if (score == 2) return '#fbbc04';
    else if (score == 3) return '#46bdc6';
    else if (score == 4) return '#34a853';
    else if (score == 5) return '#047121';
    else return '#fff';
  }

  // To go to student profile
  goToProfile(element: any, identifier: string, studentEmail?: string) {
    // if (
    //   (identifier === 'profile' && element.readOnly) ||
    //   identifier === 'view'
    // ) {
    //   sessionStorage.setItem('studentEmail', String(studentEmail));
    //   this._Router.navigate(['/students', element.value, 'profile', 'myinfo']);
    // } else
    if (identifier === 'email' && element.readOnly)
      window.location.href = `mailto:${element.value}`;
    else if (identifier === 'phone' && element.readOnly)
      window.location.href = `https://api.whatsapp.com/send?phone=${element.value}`;
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

  downloadAll(files: string[]) {
    if (files.length === 0) this.errorAction("There's no Available Documents.");

    // const file = files[0];

    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (e) => {
    //   const blob = xhr.response;
    //   console.log(blob);
    // };
    // xhr.open('GET', file);
    // xhr.send();
    files.forEach((file, i) => {
      const a = document.createElement('a');
      a.href = file;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }

  // async mergeFiles(files: string[], name: string) {
  // const pdfFullDoc = await PDFDocument.create();

  // files.forEach(async (file, i) => {
  //   // const url = file;

  //   const pdfBytes = await fetch(file).then((res) => res.arrayBuffer());

  //   const pdfDoc = await PDFDocument.load(pdfBytes);

  //   const [firstPage] = await pdfFullDoc.copyPages(pdfDoc, [0]);

  //   if (i === 0) {
  //     pdfFullDoc.addPage(firstPage);
  //   } else {
  //     pdfFullDoc.insertPage(0, firstPage);
  //   }
  // });

  // const url1 = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
  // const url2 = 'https://pdf-lib.js.org/assets/with_large_page_count.pdf';

  // const firstDonorPdfBytes = await fetch(url1).then((res) =>
  //   res.arrayBuffer()
  // );
  // const secondDonorPdfBytes = await fetch(url2).then((res) =>
  //   res.arrayBuffer()
  // );

  // const firstDonorPdfDoc = await PDFDocument.load(firstDonorPdfBytes);
  // const secondDonorPdfDoc = await PDFDocument.load(secondDonorPdfBytes);

  // const pdfDoc = await PDFDocument.create();

  // const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [0]);
  // const [secondDonorPage] = await pdfDoc.copyPages(secondDonorPdfDoc, [742]);

  // pdfDoc.addPage(firstDonorPage);
  // pdfDoc.insertPage(0, secondDonorPage);

  // // Serialize the PDFDocument to bytes (a Uint8Array)
  // const pdfBytes = await pdfDoc.save();

  // // Trigger the browser to download the PDF document
  // download(pdfBytes, `${name}.pdf`, 'application/pdf');
  // }

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

  // To change status
  changeStatus(userName: string, event: any) {
    if (this.editMode === true) return;

    const statusValue = event.target.value;
    const type = 'user';
    this._EmployeeService
      .changeStatus(statusValue, userName, type)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.confirmAction();
          if (statusValue === 'Applied') this.confirmAction();
          this._Router.navigate([
            '/employees',
            this.empName,
            'dashboard',
            'application-management',
          ]);
          this.refreshStudents();
        } else {
          this.errorAction();
        }
      });
  }

  // To assign a lead to an employee
  assingLead(studentUserName: string, empUserName: string) {
    this._EmployeeService
      .assignLeads(studentUserName, empUserName)
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.confirmAction();
          this.refreshStudents();
        } else {
          this.errorAction();
        }
      });
  }

  // To edit student
  editStudent(userName: string) {
    const [
      studentName,
      studentEmail,
      studentUserName,
      studentPhone,
      studentSchool,
      studentProgram,
      studentNationality,
      studentSource,
      studentScore,
      studentStatus,
      studentMonth,
      studentYear,
    ] = [
      this.nameInput.nativeElement.value,
      this.emailInput.nativeElement.value,
      userName,
      this.phoneInput.nativeElement.value,
      this.schoolInput.nativeElement.value,
      this.programInput.nativeElement.value,
      this.nationalityInput.nativeElement.value,
      this.sourceInput.nativeElement.value,
      this.scoreInput.nativeElement.value,
      this.statusInput.nativeElement.value,
      this.intakeMonthInput.nativeElement.value,
      this.intakeYearInput.nativeElement.value,
    ];
    this._EmployeeService
      .editStudent(
        studentName,
        studentEmail,
        studentUserName,
        studentPhone,
        studentNationality,
        studentSchool,
        studentProgram,
        studentSource,
        studentScore,
        studentStatus,
        studentMonth,
        studentYear
      )
      .subscribe((data: any) => {
        const [{ status }] = data;
        if (status === 201) {
          this.confirmAction();
          if (studentStatus === 'Applied')
            this._Router.navigate([
              '/employees',
              this.empName,
              'dashboard',
              'application-management',
            ]);
          this.editMode = false;
          this.refreshStudents();
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

  // To open any modal
  openModal(element: any, className: string, size: string) {
    this._ModalService.open(element, { windowClass: className, size: size });
    // if (className === 'info-modal' && !this.editMode) {
    // }
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
          // this.editCommentForm.reset();
          // this.editCommentMode[index] = false;
          // this.getComments();
          console.log('ok')
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
}
