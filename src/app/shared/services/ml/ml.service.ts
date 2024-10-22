import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class MlService {
  constructor(private _Http: HttpClient) {}

  savedValues(formValue: any, userName: any) {
    return this._Http.post(
      environment.APIURL + `ml?obj=${formValue}&username=${userName}`,
      httpOptions
    );
  }

  viewCV(userName: any) {
    return this._Http.post(
      environment.APIURL + `show_ml?username=${userName}`,
      httpOptions
    );
  }
}
