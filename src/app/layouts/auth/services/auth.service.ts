import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { StudentsService } from 'src/app/shared/services/students/students.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState: any;
  private user!: any;
  private id!: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private stuServ: StudentsService,
    private httpClient: HttpClient
  ) {
    this.user = afAuth.authState;
  }

  // To autorize the data given by the user
  checkAuth(email: string, password: string) {
    return this.httpClient.post(
      environment.APIURL + `auth/login?email=${email}&password=${password}`,
      httpOptions
    );
  }

  // To register a new Student
  registerStudent(
    name: string,
    email: string,
    password: string,
    phone: number,
    country: string,
    age: number,
    representative: string
  ) {
    return this.httpClient.post(
      environment.APIURL +
        `student/register?name=${name}&email=${email}&password=${password}&phone=${phone}&nationality=${country}&age=${age}&empName=${representative}`,
      httpOptions
    );
  }

  registerFBStudent(
    name: string,
    email: string,
    token: string,
    photoUrl: string,
    id: string
  ) {
    return this.httpClient.post(
      environment.APIURL +
        `user_register_fb?name=${name}&email=${email}&profilepic=${photoUrl}&token=${token}&id=${id}`,
      httpOptions
    );
  }

  // To resend Confirmation email
  resendEmail(email: string, name: string) {
    return this.httpClient.post(
      environment.APIURL + `student/resendEmail?email=${email}&name=${name}`,
      httpOptions
    );
  }

  // To send forget password email to student's email
  forgetPassword(email: string) {
    return this.httpClient.post(
      environment.APIURL + `student/forgetpassword?email=${email}`,
      httpOptions
    );
  }

  // To change password
  changePassword(token: string, password: string) {
    return this.httpClient.post(
      environment.APIURL +
        `student/change_password?token=${token}&password=${password}`,
      httpOptions
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  // get userID from firebase
  get currentUserId(): string {
    // check at first if this user is auth or not
    return this.authState !== null ? this.authState.uid : '';
  }

  authUser() {
    return this.user;
  }

  // sign up to firebase
  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user.user;
        // store user data in firebase
        this.setUserData(email);
      })
      .catch((error) => console.log(error));
  }

  // login to firebase
  login(email: string, password: string, type: number) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          this.authState = user.user;
          // chech if the user is student or employee
          if (type == 1) {
            // employee
            return true;
          }
          // if the user is student
          else if (type == 0) {
            // student
            this.id = user.user?.uid;
            // get student's employeeID and store it in localstorage
            // to use it to get employee's student in chat-user-list component
            this.stuServ.profile(email).subscribe((data: any) => {
              // data[29] == employeeID in database
              if (data[29].legnth > 0)
                return localStorage.setItem('EmpName', String(data[29]));
            });
            // store studentID in localstorage
            return localStorage.setItem('studentID', String(this.id));
          }
        } else return false;
      });
  }

  // when log out from firebase -- never used
  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.afAuth.signOut();
  }
  // initial user data in firebase after login
  setUserData(email: string): void {
    // firebase path to user/id
    const path = `users/${this.currentUserId}`;
    // the data we want to push to the firebase database
    const data = {
      uid: this.currentUserId,
      email: email,
    };
    // update user data in firebase by pass data obj
    this.db
      .object(path)
      .update(data)
      .then(() => alert('done'))
      // catch the error
      .catch((error) => console.log(error));
  }
}
