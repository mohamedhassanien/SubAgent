import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': 'ZdjsjtHbJh8QNnrKK2Uei2Xa7w0hMaIE9z62n5UR',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(private _Http: HttpClient) {}

  savedValues(formValue: any, userName: any) {
    return this._Http.post(
      environment.APIURL + `cv?obj=${formValue}&username=${userName}`,
      httpOptions
    );
  }

  viewCV(userName: any) {
    return this._Http.post(
      environment.APIURL + `show_cv?username=${userName}`,
      httpOptions
    );
  }
}
