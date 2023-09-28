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

  constructor(private http: HttpClient, private _Storage: AngularFireStorage) {}

  // get student profile === all student's information
  profile(email: string) {
    return this.http.post(
      environment.APIURL + `profile/getstudentInfo?email=${email}`,
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

  // Second step API
  secondStep(
    userEmail: string,
    userName: string,
    status: string,
    country: string,
    level: string,
    degree: string,
    interests: [],
    english: string,
    englishScores: string,
    french: string,
    frenchScores: string
  ) {
    return this.http.post(
      environment.APIURL +
        `student/stepTwoForStudent?studentEmail=${userEmail}&studentUserName=${userName}&educationStatus=${status}&countryWanted=${country}&educationLevel=${level}&studentDegree=${degree}&fieldsOfInterest=${interests}&studentEngTest=${english}&studentEngTestsTypeAndScore=${englishScores}&studentFrenchTest=${french}&studentFrenchTestsTypeAndScore=${frenchScores}`,
      httpOptions
    );
  }

  // Third step API
  thirdStep(
    email: string,
    userName: string,
    lang: string,
    min: number,
    max: number,
    vip:string
  ) {
    return this.http.post(
      environment.APIURL +
        `student/stepThreeStudent?studentEmail=${email}&studentUserName=${userName}&wantedStudeyLang=${lang}&studentMinBudget=${min}&studentMaxBudget=${max}&vip=${vip}`,
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
    return this.http.post(
      environment.APIURL +
        `student/aboutYou?studentEmail=${email}&studentUserName=${userName}&studentCountry=${country}&studentCity=${city}&studentJobTitle=${jobTitle}&studentDOB=${dob}&studentBio=${bio}&studentCollage=${faculty}&studentUni=${university}`,
      httpOptions
    );
  }

  // To Applay to a Program
  applyProgram(programName: string, schoolName: string, city: string) {
    return this.http.post(
      environment.APIURL +
        `program/student/studentApplyForProg?studentEmail=${this.email}&programName=${programName}&schoolName=${schoolName}&city=${city}`,
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
}
