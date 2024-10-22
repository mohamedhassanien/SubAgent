import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';

@Component({
  selector: 'app-acceptance-letter',
  templateUrl: './acceptance-letter.component.html',
  styleUrls: ['./acceptance-letter.component.scss']
})
export class AcceptanceLetterComponent implements OnInit {

  constructor(private _UploadService: UploadService,
    private _StudentsService: StudentsService,
    private _SharedService: SharedService) { }

  userName: string = String(localStorage.getItem('userName'));
  firstSelectedFile!: File | undefined;
  currentFirstFile!: Upload;

  firstSelectCondition: boolean = false;
  firstErrorMsg!: string | undefined;

  firstFileName!: string;
  firstFileUrl!: string;
  firstFilePercentage: number = 0;
  firstFileLoading: boolean = false;


  ngOnInit(): void {
    this.getProfileData()
  }


  getProfileData() {
    const userEmail = String(localStorage.getItem('userEmail'));
    this._StudentsService.profile(userEmail).subscribe((res: any) => {

      const [
        {
          data: [
            {
              lc: { fileName: firstFileName = '', fileUrl: firstFileUrl = '' },
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
      this.uploadFirst()
      if (
        fileExtension === 'pdf' ||
        fileExtension === 'png' ||
        fileExtension === 'jpg' ||
        fileExtension === 'jpeg' ||
        fileExtension === 'doc'
      ) {
        this.firstSelectCondition = false;
        this.firstSelectedFile = <File>event.target.files[0];
        this.uploadFirst()
      } else {
        this.firstSelectedFile = undefined;
        this.firstSelectCondition = true;
        this.firstErrorMsg = 'Please Select a suitable File..';
      }
    }
  }
  // Upload first
  uploadFirst(): void {
    const fileType = 'lc';

    if (this.firstSelectedFile === undefined) {
      this.firstSelectCondition = true;
      this.firstErrorMsg = 'Please Choose a File First!';
      return;
    } else {
      this.firstSelectCondition = false;
      const file: File = this.firstSelectedFile;
      this.currentFirstFile = new Upload(file);

      this._UploadService.uploadFile(this.currentFirstFile, fileType, this.userName).subscribe(
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
    const fileType = 'lc';

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

}
