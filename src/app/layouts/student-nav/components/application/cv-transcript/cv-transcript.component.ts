import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimationOptions } from 'ngx-lottie';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';

@Component({
  selector: 'app-cv-transcript',
  templateUrl: './cv-transcript.component.html',
  styleUrls: ['./cv-transcript.component.scss'],
})
export class CvTranscriptComponent implements OnInit {
  constructor(
    private _UploadService: UploadService,
    private _StudentsService: StudentsService,
    private _SharedService: SharedService,
    private _ModalService: NgbModal
  ) {}

  options: AnimationOptions = {
    path: '/assets/student.json',
  };

  userName: string = String(localStorage.getItem('userName'));
  firstSelectedFile!: File | undefined;
  secondSelectedFile!: File | undefined;
  currentFirstFile!: Upload;
  currentSecondFile!: Upload;

  firstSelectCondition: boolean = false;
  firstErrorMsg!: string | undefined;

  firstFileName!: string;
  firstFileUrl!: string;
  firstFilePercentage: number = 0;
  firstFileLoading: boolean = false;

  secondSelectCondition: boolean = false;
  secondErrorMsg!: string | undefined;

  secondFileName!: string;
  secondFileUrl!: string;
  secondFilePercentage: number = 0;
  secondFileLoading: boolean = false;

  ngOnInit(): void {
    this.getProfileData();
  }

  // Options for Animations
  trans: AnimationOptions = {
    path: '../../../../../../assets/images/navigator/application/ml/ml.json',
  };
  cv: AnimationOptions = {
    path: '/assets/images/navigator/application/cv/cv.json',
  };

  getProfileData() {
    const userEmail = String(localStorage.getItem('userEmail'));
    this._StudentsService.profile(userEmail).subscribe((res: any) => {
      console.log(res, 'XX');
      const [
        {
          data: [
            {
              cv: { fileName: firstFileName = '', fileUrl: firstFileUrl = '' },
              trans: {
                fileName: secondFileName = '',
                fileUrl: secondFileUrl = '',
              },
            },
          ],
        },
      ] = res;

      if (firstFileName === '' && firstFileUrl === '') {
        this.firstFileLoading = false;
      } else {
        this.firstFileLoading = true;
        this.firstFileUrl = firstFileUrl;
        this.firstFileName = firstFileName;
      }

      if (secondFileName === '' && secondFileUrl === '') {
        this.secondFileLoading = false;
      } else {
        this.secondFileLoading = true;
        this.secondFileUrl = secondFileUrl;
        this.secondFileName = secondFileName;
      }
    });
  }

  // To handle first File upload
  chooseFirst(event: any): void {
    const file = <File>event.target.files[0];
    if (file === undefined) {
      this.firstSelectCondition = true;
      this.firstErrorMsg = 'Please Choose a File First!';
      this.firstSelectedFile = undefined;
    } else {
      const fileName = file.name;
      const lastIndex = fileName.lastIndexOf('.');
      const fileExtension = fileName.slice(lastIndex + 1, fileName.length);
      this.uploadFirst();
      if (
        fileExtension === 'pdf' ||
        fileExtension === 'png' ||
        fileExtension === 'jpg' ||
        fileExtension === 'jpeg' ||
        fileExtension === 'doc'
      ) {
        this.firstSelectCondition = false;
        this.firstSelectedFile = <File>event.target.files[0];
        this.uploadFirst();
      } else {
        this.firstSelectedFile = undefined;
        this.firstSelectCondition = true;
        this.firstErrorMsg = 'Please Select a suitable File..';
      }
    }
  }
  // Upload first
  uploadFirst(): void {
    const fileType = 'cv';

    if (this.firstSelectedFile === undefined) {
      this.firstSelectCondition = true;
      this.firstErrorMsg = 'Please Choose a File First!';
      return;
    } else {
      this.firstSelectCondition = false;
      const file: File = this.firstSelectedFile;
      this.currentFirstFile = new Upload(file);

      this._UploadService
        .uploadFile(this.currentFirstFile, fileType, this.userName)
        .subscribe(
          (percentage) => {
            this.firstFileName = file.name;
            this.firstFileUrl = this.currentFirstFile.url;
            this.firstFileLoading = true;
            this.firstFilePercentage = Math.round(percentage ? percentage : 0);
            if (percentage === 100) {
              setTimeout(() => {
                this.firstFileUrl = this.currentFirstFile.url;
                this._SharedService.progressChanged.emit();
              }, 1000);
            }
          },
          () => {
            this.firstSelectCondition = true;
            this.firstErrorMsg = 'Something Went Wrong. Try again!';
          }
        );
    }
  }
  // Delete first
  deleteFirst() {
    const fileType = 'cv';

    this._UploadService.deleteFile(
      this.currentFirstFile,
      fileType,
      this.firstFileName,
      this.userName
    );
    this.firstFileLoading = false;
    this.firstSelectCondition = true;
    this.firstErrorMsg = 'File has been Deleted Successfully!';
    setTimeout(() => {
      this.firstSelectCondition = false;
      this.firstErrorMsg = undefined;
      this._SharedService.progressChanged.emit();
    }, 2500);
  }

  // To handle second File upload
  chooseSecond(event: any): void {
    const file = <File>event.target.files[0];
    if (file === undefined) {
      this.secondSelectCondition = true;
      this.secondErrorMsg = 'Please Choose a File First!';
      this.secondSelectedFile = undefined;
    } else {
      const fileName = file.name;
      const lastIndex = fileName.lastIndexOf('.');
      const fileExtension = fileName.slice(lastIndex + 1, fileName.length);
      this.uploadFirst();
      if (
        fileExtension === 'pdf' ||
        fileExtension === 'png' ||
        fileExtension === 'jpg' ||
        fileExtension === 'jpeg' ||
        fileExtension === 'doc'
      ) {
        this.secondSelectCondition = false;
        this.secondSelectedFile = <File>event.target.files[0];
        this.uploadSecond();
      } else {
        this.secondSelectedFile = undefined;
        this.secondSelectCondition = true;
        this.secondErrorMsg = 'Please Select a suitable File..';
      }
    }
  }
  // Upload second
  uploadSecond(): void {
    const fileType = 'trans';

    if (this.secondSelectedFile === undefined) {
      this.secondSelectCondition = true;
      this.secondErrorMsg = 'Please Choose a File First!';
      return;
    } else {
      this.secondSelectCondition = false;
      const file: File = this.secondSelectedFile;
      this.currentSecondFile = new Upload(file);

      this._UploadService
        .uploadFile(this.currentSecondFile, fileType, this.userName)
        .subscribe(
          (percentage) => {
            this.secondFileName = file.name;
            this.secondFileUrl = this.currentSecondFile.url;
            this.secondFileLoading = true;
            this.secondFilePercentage = Math.round(percentage ? percentage : 0);
            if (percentage === 100) {
              setTimeout(() => {
                this.secondFileUrl = this.currentSecondFile.url;
                this._SharedService.progressChanged.emit();
              }, 1000);
            }
          },
          () => {
            this.secondSelectCondition = true;
            this.secondErrorMsg = 'Something Went Wrong. Try again!';
          }
        );
    }
  }
  // Delete second
  deleteSecond() {
    const fileType = 'trans';

    this._UploadService.deleteFile(
      this.currentSecondFile,
      fileType,
      this.secondFileName,
      this.userName
    );
    this.secondFileLoading = false;
    this.secondSelectCondition = true;
    this.secondErrorMsg = 'File has been Deleted Successfully!';
    setTimeout(() => {
      this.secondSelectCondition = false;
      this.secondErrorMsg = undefined;
      this._SharedService.progressChanged.emit();
    }, 2500);
  }

  openModal(element: any, className: string, size: string, data: any[]) {
    this._ModalService.open(element, { windowClass: className, size: size });
  }
}
