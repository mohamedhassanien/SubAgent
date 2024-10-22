import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { finalize, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Upload } from './upload';
import { environment } from 'src/environments/environment.prod';
import { SharedService } from '../shared.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UploadImgsService {
  private userName: string = String(localStorage.getItem('userName'));
  private userEmail: string = String(localStorage.getItem('userEmail'));
  private userType: string = String(localStorage.getItem('type'));
  // private basePath: string = this.userType === 'student'? `/uploads/${this.userName}/` : ``;

  constructor(
    private _AngularFireDatabase: AngularFireDatabase,
    private _AngularFireStorage: AngularFireStorage,
    private _Http: HttpClient,
    private _SharedService: SharedService
  ) {}

  // To upload a file to fire base
  private saveFileData(fileUpload: Upload, userName?: string): void {
    this._AngularFireDatabase.list(this.userName).push(fileUpload);
  }

  uploadFile(
    fileUpload: Upload,
    fileType: string,
    schoolName?: string
  ): Observable<number | undefined> {
    const newFileName = fileUpload.file.name.includes(' ')
      ? fileUpload.file.name.split(' ').join('-')
      : fileUpload.file.name;
    const filePath = `${schoolName}${newFileName.replace(/'/g, '')}`;

    const storageRef = this._AngularFireStorage.ref(filePath);
    const uploadTask = this._AngularFireStorage.upload(
      filePath,
      fileUpload.file
    );
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name.replace(/'/g, '');
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }

  getFiles(): Observable<string[]> {
    const ref = this._AngularFireStorage.ref(`/schools/${this.userName}/`);
    return ref.listAll().pipe(
      switchMap((list) => {
        const calls: Promise<string>[] = [];
        list.items.forEach((item) => calls.push(item.getDownloadURL()));
        return Promise.all(calls);
      })
    );
  }

  getFilesTest(numberItems: number, userName: string): AngularFireList<Upload> {
    return this._AngularFireDatabase.list(this.userName, (ref) =>
      ref.limitToLast(numberItems)
    );
  }

  // To Open Uploaded File
  openFile(url: string) {
    if (this.userName) {
      window.open(url, '_blank');
    }
  }

  // To delete a file from fire base
  deleteFile(
    fileUpload: any = {},
    fileType: string,
    fileName: string,
    userName?: string
  ): void {
    let uploadedName = fileName;
    uploadedName === '' ? (uploadedName = fileUpload.name) : uploadedName;
    this.deleteFileDatabase(fileUpload.key, userName)
      .then(() => {
        const newFileName = uploadedName.includes(' ')
          ? uploadedName.split(' ').join('-')
          : uploadedName;
        this.deleteFileStorage(newFileName, userName);
        // To call deletefile API that deletes the file from our DataBase
        this.deleteFileApi(fileType, userName);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string, userName?: string): Promise<void> {
    return this._AngularFireDatabase.list(this.userName).remove(key);
  }

  private deleteFileStorage(name: string, userName?: string): void {
    const storageRef = this._AngularFireStorage.ref(this.userName);
    storageRef.child(name).delete();
  }

  // To save file API for organizing the code
  saveFileApi(
    fileType: string,
    url: string,
    fileName: string,
    userName?: string
  ) {
    this._Http
      .post(
        environment.APIURL +
          `student/saveStudentFile?studentUserName=${
            this.userType !== 'student' ? userName : this.userName
          }&fileType=${fileType}&fileUrl=${url}&fileName=${fileName}`,
        httpOptions
      )
      .subscribe((data) => console.log(data));
  }

  // To delete file API to organize the code
  deleteFileApi(fileType: string, userName?: string) {
    this._Http
      .post(
        environment.APIURL +
          `student/deleteStudentFile?studentUserName=${userName}&fileType=${fileType}`,
        httpOptions
      )
      .subscribe((data) => console.log(data));
  }

  // To upload Image to data base
  imageAPI(userName: string, userEmail: string, url: string) {
    this._Http
      .post(
        environment.APIURL +
          `student/saveLinkOfProfilePic?studentUserName=${userName}&studentEmail=${userEmail}&studentProfilePicture=${url}`,
        httpOptions
      )
      .subscribe((data) => {
        const imageUrl = decodeURIComponent(url);
        this._SharedService.profilePictureChanged.emit(imageUrl);
      });
  }
}
