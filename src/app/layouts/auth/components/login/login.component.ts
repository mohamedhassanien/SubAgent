import { ChatBotService } from 'src/app/shared/services/chat-bot/chat-bot.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import {
  FacebookLoginProvider,
  SocialAuthService,
  MicrosoftLoginProvider
} from 'angularx-social-login';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { getAuth, linkWithPopup, OAuthProvider } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // To intialize login form
  loginForm!: FormGroup;

  // Conditions
  // To show password or hide password
  show: boolean = false;
  // To show error message
  error: boolean = false;
  forgotPassword: boolean = false;
  errorFB: boolean = false;
  counter: number = 0;
  isLoading: boolean = false;
  isVerified: boolean = false;
  verMsg: string = '';
  errMessage: string = '';

  // For Facebook Login
  public loggedIn!: boolean;
  public user!: any;

  provider = new OAuthProvider('microsoft.com');
  auth = getAuth();

  havError = false;

  constructor(
    public authService: AuthService,
    private studentService: StudentsService,
    private socialAuthService: SocialAuthService,
    private http: HttpClient,
    private router: Router,
    private _ChatBotService: ChatBotService,
    private afAuth: AngularFireAuth,
    private msalService: MsalService
  ) { }
  FB: any;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      keep: new FormControl(false),
    });
    // this.getLocation();
  }

  GoogleAuth() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (data: any) => {
        const {
          additionalUserInfo: {
            profile: { name, email, id, picture, password },
          },
          credential: { idToken },
        } = data;
        this.isLoading = true;
        this.isVerified = false;
        this.error = false;
        this.forgotPassword = false;
        let sha1 = require('sha1');
        let idhash = sha1(id);
        this.loginUser(email, idhash);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          confirmButtonColor: '#16294f',
        });
      }
    );
  }

  FaceBookAuth() {
    this.afAuth.signInWithPopup(new FacebookAuthProvider()).then(
      (data: any) => {
        const {
          additionalUserInfo: {
            profile: { name, email, id, picture },
          },
          credential: { idToken },
        } = data;
        this.isLoading = true;
        this.isVerified = false;
        this.error = false;
        this.forgotPassword = false;
        let sha1 = require('sha1');
        let idhash = sha1(id);
        this.loginUser(email, idhash);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          confirmButtonColor: '#16294f',
        });
      }
    );
  }

  // To show password or hide password
  showPassword() {
    this.show = !this.show;
  }

  // To login with facebook
  signInWithFB() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;

      this.loggedIn = user != null;

      const {
        email,
        name,
        authToken,
        photoUrl,
        id,
        response: {
          picture: {
            data: { url },
          },
        },
      } = user;

      this.authService
        .registerFBStudent(name, email, authToken, photoUrl, id)
        .subscribe((data: any) => {
          if (data[0].status == 200) {
            this.errorFB = false;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('type', 'student');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', data[0].data.username);
            localStorage.setItem('token', data[0].data.token);
            localStorage.setItem('name', data[0].data.name);
            localStorage.setItem('verified', data[0].data.verified);
            this.router.navigate(['/landing/home']);
          } else {
            this.errorFB = true;
          }
        });
    });
  }

  // To get IP address and location
  getLocation() {
    this.http
      .get<any>('https://geolocation-db.com/json/')
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        tap((response) => {
          console.log(response);
        })
      )
      .subscribe();
  }

  // to get chatbot data
  checkChatBot(userName: string, name: string) {
    this._ChatBotService.checkchatbot(userName).subscribe((data) => {
      if (userName !== null || userName !== '') {
        if (data) {
          this.router.navigate(['/chat-bot']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/profile']);
        }
      }
    });
  }

  loginUser(email: string, password: string) {
    this.authService.checkAuth(email, password).subscribe((data: any) => {
      const [
        {
          email,
          name,
          nationality,
          status,
          token,
          type,
          username,
          verified,
          phone,
          subagentName,
          subagentEmail,
          subagentUsername,
          FirstLogin
        },
      ] = data.message;
      if (status === 200) {
        this.error = false;
        this.forgotPassword = false;
        this.isVerified = false;
        this.isLoading = false;
        // To get picture from profile API
        this.studentService.profile(email).subscribe((data: any) => {
          const [
            {
              data: [{ profile_picture_url: picture }],
            },
          ] = data;

          localStorage.setItem('picture', picture);
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', username);
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        localStorage.setItem('nationality', nationality);
        localStorage.setItem('verified', verified);
        localStorage.setItem('phone', phone);
        localStorage.setItem('reloaded', 'false');

        if (type == '0') {
          sessionStorage.setItem('done', 'done');
          localStorage.setItem('type', 'student');
          this.checkChatBot(username, name);
          localStorage.setItem('FirstLogin', FirstLogin);
        } else if (type == '1') {
          sessionStorage.setItem('done', 'done');
          localStorage.setItem('type', 'employee');
          this.router.navigate([
            '/employees',
            username,
            'dashboard',
            'statistics',
          ]);
        } else if (type == '2') {
          sessionStorage.setItem('done', 'done');
          localStorage.setItem('type', 'owner');
          this.router.navigate([
            '/employees',
            username,
            'dashboard',
            'statistics',
          ]);
        } else if (type == '7') {
          localStorage.setItem('type', 'owner');
          sessionStorage.setItem('done', 'done');
          this.router.navigate([
            '/employees',
            username,
            'dashboard',
            'statistics',
          ]);
        } else if (type == '9') {
          localStorage.setItem('type', 'sub-agent');
          sessionStorage.setItem('done', 'done');
          this.router.navigate(['/sub-agents', name, 'dashboard']);
        } else if (type == '10') {
          localStorage.setItem('type', 'sub-agent-emp');
          localStorage.setItem('subagent-username', subagentUsername);
          localStorage.setItem('subagent-name', subagentName);
          localStorage.setItem('subagent-email', subagentEmail);
          this.router.navigate(['/sub-agents', subagentName, 'dashboard']);
        }
      } else {
        this.havError = true;
        this.isLoading = false;
        const [{ message }] = data;
        this.errMessage = message;
        console.log(this.errMessage);

        localStorage.clear();
        if (this.counter < 3) {
          this.error = true;
          this.counter++;
        } else {
          this.error = false;
          this.forgotPassword = true;
        }
      }
    });
  }

  // To submit form and send auth data to api
  onSubmit(loginForm: FormGroup) {
    this.isLoading = true;
    this.isVerified = false;
    this.error = false;
    this.forgotPassword = false;

    const { email, password: unhashedPassword, keep } = loginForm.value;
    // To hash the password
    let sha1 = require('sha1');
    const password = sha1(unhashedPassword);
    // Check if there's a token
    if (this.router.url !== '/auth/login') {
      // To get tokren from url
      const token =
        this.router.url.split('/')[this.router.url.split('/').length - 1];
      // To verify the user
      this.studentService
        .verifyAccount(email, password, token)
        .subscribe((data: any) => {
          const [{ status, message }] = data;
          if (status === 700 || status === 600 || status === 200) {
            this.isVerified = true;
            this.verMsg = message;
            this.isLoading = false;
            console.log(message);
          } else if (status === 203) {
            this.loginUser(email, password);
          }
        });
    } else if (this.router.url === '/auth/login') {
      this.loginUser(email, password);
    }
  }

  MicrosoftAuth() {
    this.msalService.loginPopup({ scopes: ['openid', 'profile', 'User.read'] }).subscribe(
      (data: any) => {
        console.log(data);
        const {
          additionalUserInfo: {
            profile: { name, email, id, picture },
          },
          credential: { idToken },
        } = data;
        this.isLoading = true;
        this.isVerified = false;
        this.error = false;
        this.forgotPassword = false;
        let sha1 = require('sha1');
        let idhash = sha1(id);
        this.loginUser(email, idhash);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          confirmButtonColor: '#16294f',
        });
      }
    );
  }
}
