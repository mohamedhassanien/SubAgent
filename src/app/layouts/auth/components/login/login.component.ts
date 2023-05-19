import { ChatBotService } from 'src/app/shared/services/chat-bot/chat-bot.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatorService } from 'src/app/shared/services/translate/translate.service';

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

  constructor(
    public authService: AuthService,
    private studentService: StudentsService,
    private http: HttpClient,
    private router: Router,
    private _ChatBotService: ChatBotService,
    public translate: TranslateService,
    private translator: TranslatorService
  ) {
    this.translator.localEvent;
    translate.setDefaultLang('en');
    this.translator.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
  }
  FB: any;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      keep: new FormControl(false),
    });
    // this.getLocation();
  }

  // To show password or hide password
  showPassword() {
    this.show = !this.show;
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
  // checkChatBot(userName: string, name: string) {
  //   this._ChatBotService.checkchatbot(userName).subscribe((data) => {
  //     if (userName !== null || userName !== '') {
  //       if (data === true) {
  //         this.router.navigate(['/chat-bot']).then(() => {
  //           window.location.reload();
  //         });
  //       } else {
  //         this.router.navigate(['/students', name, 'profile', 'myinfo']);
  //       }
  //     }
  //   });
  // }

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
        },
      ] = data;
      if (status === 200) {
        this.error = false;
        this.forgotPassword = false;
        this.isVerified = false;
        this.isLoading = false;
        // To get picture from profile API
        this.studentService.profile(email).subscribe((data: any) => {
          // console.log(data);
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

        if (type == '0') {
          sessionStorage.setItem('done', 'done');
          localStorage.setItem('type', 'student');
          this.router
            .navigate(['/students', name, 'general', 'how-to-start'])
            .then((res) => {
              window.scrollBy(0, 388);
            });
        } else if (type == '1') {
          sessionStorage.setItem('done', 'done');
          localStorage.setItem('type', 'employee');
          this.router.navigate(['/landing/programs']);
        } else if (type == '2') {
          sessionStorage.setItem('done', 'done');
          localStorage.setItem('type', 'owner');
          this.router.navigate(['/landing/programs']);
        } else {
          localStorage.setItem('type', 'tech');
          sessionStorage.setItem('done', 'done');
          this.router.navigate(['/landing/programs']);
        }
      } else {
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
          } else if (status === 203) {
            this.loginUser(email, password);
          }
        });
    } else if (this.router.url === '/auth/login') {
      this.loginUser(email, password);
    }
  }
}
