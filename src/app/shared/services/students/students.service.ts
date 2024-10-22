import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { AngularFireStorage } from '@angular/fire/compat/storage';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  email: string = String(localStorage.getItem('userEmail'));
  empUsername: string = String(localStorage.getItem('userName'));

  constructor(private http: HttpClient, private _Storage: AngularFireStorage) {}

  // get student profile === all student's information
  profile(email: string) {
    return this.http.get(
      environment.APIURL + `profile/studentInfo?email=${email}`,
      httpOptions
    );
  }

  // edit student steps
  editSteps(userName: string, studentsteps: any) {
    console.log(studentsteps);

    return this.http.post(
      environment.APIURL +
        `editappsteps?username=${userName}&studentsteps=${studentsteps}`,
      httpOptions
    );
  }

  // To Verify Account by logging in
  verifyAccount(email: string, password: string, token: string) {
    return this.http.post(
      environment.APIURL +
        `user/verify/account?token=${token}&userEmail=${email}&userPassword=${password}`,
      httpOptions
    );
  }

  // To get all wishlisted programs for a student
  getWishlistedPrograms(studentName: string) {
    return this.http.post(
      environment.APIURL + `student/getsavedprograms?student=${studentName}`,
      httpOptions
    );
  }

  // To change student's Email
  changeEmailAddress(
    oldEmail: string,
    token: string,
    password: string,
    newEmail: string
  ) {
    return this.http.post(
      environment.APIURL +
        `student/changeEmailAdress?studentOldEmail=${oldEmail}&studentToken=${token}&studentPassword=${password}&studentNewEmail=${newEmail}`,
      httpOptions
    );
  }

  // To change student's password
  changePassword(
    email: string,
    token: string,
    currentPassword: string,
    newPassword: string
  ) {
    return this.http.post(
      environment.APIURL +
        `student/changePassword?studentEmail=${email}&studentToken=${token}&studentCurrentPass=${currentPassword}&studentNewPass=${newPassword}`,
      httpOptions
    );
  }

  // To get all countries in order to choose one of them
  getAllCountries() {
    return this.http.get('https://countriesnow.space/api/v0.1/countries');
  }

  getAllCities() {
    return this.http.get(
      environment.APIURL + `/get/all/cities?empName=${this.empUsername}`,
      httpOptions
    );
  }

  // To Edit user's Info
  editInfo(
    email: string,
    userName: string,
    country: string,
    city: string,
    jobTitle: string,
    dob: string,
    bio: string,
    faculty: string,
    university: string
  ) {
    return this.http.put(
      environment.APIURL +
        `student/aboutyou?studentEmail=${email}&studentUserName=${userName}&studentCountry=${country}&studentCity=${city}&studentJobTitle=${jobTitle}&studentDOB=${dob}&studentBio=${bio}&studentCollage=${faculty}&studentUni=${university}`,
      httpOptions
    );
  }

  // ////////////////////////////////////////////////////////////////////////////////
  // get student's programs
  // pass only student's email to API
  appliedProgram() {
    // student email
    let email = localStorage.getItem('userEmail');
    return this.http.post(
      environment.APIURL + `appliedprograms/1?email=${email}`,
      httpOptions
    );
  }

  // send email request in upper-footer componant
  sendRequestByMail(email: string, msg: string) {
    //pass user email and his message
    return this.http.post(
      environment.APIURL + `contactus/${email}/${msg}`,
      httpOptions
    );
  }

  changePasswordProfile(
    email: string,
    oldpassword: string,
    newPassword: string
  ) {
    return this.http.post<any>(
      environment.APIURL +
        `changepasswordprofile/${email}/${oldpassword}/${newPassword}`,
      httpOptions
    );
  }

  // To subscribe to news
  subscribeNews(email: string) {
    return this.http.post(
      environment.APIURL + `student/getSubscribe?studentEmail=${email}`,
      httpOptions
    );
  }
  // To subscribe to news
  getStuProgress(name: string, email: string) {
    return this.http.post(
      environment.APIURL +
        `student/checkProgressBar?studentUserName=${name}&studentEmail=${email}`,
      httpOptions
    );
  }
  // send student data to book a session
  bookSession(userName: string) {
    return this.http.post(
      environment.APIURL + `/book?stusername=${userName}`,
      httpOptions
    );
  }

  // TO get representative info
  getRepresentative(empid: any) {
    return this.http.get(
      environment.APIURL + `representative?empid=${empid}`,
      httpOptions
    );
  }

  changeCountryPhone(
    email: string,
    userName: string,
    country: string,
    phone: any,
    firstName: string,
    lastName:string
  ) {
    return this.http.put(
      environment.APIURL +
        `student/aboutyou?studentEmail=${email}&studentUserName=${userName}&studentCountry=${country}&studentphone=${phone}&stundetfirstname=${firstName}&studentlastname=${lastName}`,
      httpOptions
    );
  }

  //studentname
}
