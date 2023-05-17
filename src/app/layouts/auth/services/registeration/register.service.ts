import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}
  // Register as a new user
  register(
    name: string,
    email: string,
    password: string,
    phone: string,
    bio: string,
    nationality: string,
    langTest: string,
    score: number,
    interest: string
  ) {
    return this.http.post(
      environment.APIURL +
        `register/1?name=${name}&email=${email}&password=${password}&phone=${phone}&bio=${bio}&nationality=${nationality}&langtest=${langTest}&profilepic=None&serious_score=${score}&interst=${interest}`,
      httpOptions
    );
  }

  recommendStudent(
    name: string,
    email: string,
    phone: string,
    student: string,
    comment: string
  ) {
    return this.http.post(
      environment.APIURL +
        `ambassador/${name}/${student}/${phone}/${comment}/${email}`,
      httpOptions
    );
  }

  addNewStudent(
    name: string,
    email: string,
    password: string,
    phone: string,
    bio: string,
    nationality: string,
    langTest: string,
    empid: any,
    score: number,
    source: string,
    schoolInterest: string,
    programInterest: string
  ) {
    // Register a student
    return this.http.post(
      environment.APIURL +
        `empadd/1?name=${name}&email=${email}&password=${password}&phone=${phone}&bio=${bio}&nationality=${nationality}&langtest=${langTest}&profilepic=None&empid=${empid}&serious=${score}&source=${source}&sch_interest=${schoolInterest}&prog_interest=${programInterest}`,
      httpOptions
    );
  }

  // /ambassador/<string:ambassadorname>/<string:studentname>/<string:studentnumber>/<string:comments>/<string:ambassdaoremail>

  resetpassword(email: string) {
    return this.http.post<any>(
      environment.APIURL + `forgotpassword/1?email=${email}`,
      httpOptions
    );
  }

  // confirm password
  verifyUser(token: any) {
    return this.http.post(environment.APIURL + `change/${token}`, httpOptions);
  }

  // update password
  updatePassword(token: any, nPassword: any) {
    return this.http.post<any>(
      environment.APIURL + `updatepassword/${token}/${nPassword}`,
      httpOptions
    );
  }
  // this function should run to verfy if the user's account has been registered in database or not
  loginToken(token: any) {
    return this.http.post<any>(
      environment.APIURL + `verify/1?token=${token}`,
      httpOptions
    );
  }
}
