import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ConfirmedValidator } from 'src/app/shared/validation/confirmed.validator';
import { Router } from '@angular/router';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { AuthService } from '../../services/auth.service';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatorService } from 'src/app/shared/services/translate/translate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  // To intialize registeration form
  registerationForm!: FormGroup;

  // Conditions
  show: boolean = false;
  showConfirm: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  // Phone number plugin
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  separateDialCode = false;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  representatives: any[] = [];

  // Arrays
  countries: any[] = [];

  @ViewChild('authhidden') hideelement!: ElementRef;
  @ViewChild('authhidden1') hideelement1!: ElementRef;
  @ViewChild('authdisabled') disableelement!: ElementRef;
  @ViewChild('authdisabled1') disableelement1!: ElementRef;

  constructor(
    private http: HttpClient,
    private form: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _EmployeeService: EmployeeService,
    public translate: TranslateService,
    private translator: TranslatorService
  ) {
    this.translator.localEvent;
    translate.setDefaultLang('en');
    this.translator.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
  }

  ngOnInit(): void {
    this.getAllEmployees();
    this.registerationForm = this.form.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        country: ['', [Validators.required]],
        age: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(3),
          ],
        ],
        contact: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );

    this.http
      .get('https://restcountries.com/v3.1/all')
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        tap((response) => {
          (response as []).forEach((obj: any) => {
            let object = { name: obj.name.common, flag: obj.flags.png };
            this.countries.push(object);
          });
          this.countries.sort((a, b) => (a.name > b.name ? 1 : -1));
        })
      )
      .subscribe();
  }
  name: string = '';
  email: string = '';
  password: any = '';
  confirmPassword: any = '';

  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.representatives = data;
    });
  }

  // To show password or hide it
  showPassword() {
    this.show = !this.show;
  }

  showConfirmPassword() {
    this.showConfirm = !this.showConfirm;
  }

  onSubmit(formData: FormGroup) {
    this.submitted = true;
    if (formData.valid) {
      this.isLoading = true;
      this.name = formData.controls['name'].value;
      this.email = formData.controls['email'].value;
      let phone = formData.controls['phone'].value.internationalNumber;
      let country = formData.controls['country'].value;
      let age = formData.controls['age'].value;
      // password
      var sha1 = require('sha1');
      this.password = sha1(formData.controls['password'].value);

      const representative = formData.controls['contact'].value;

      sessionStorage.setItem('email', this.email);
      sessionStorage.setItem('name', this.name);

      this.authService
        .registerStudent(
          this.name,
          this.email,
          this.password,
          phone,
          country,
          age,
          representative
        )
        .subscribe((data: any) => {
          console.log(data);

          if (data[0].status == 200) {
            this.router.navigate(['/auth/verfiy']);
          } else {
            this.isError = true;
            this.errorMessage = data[0].message;
          }
          this.isLoading = false;
        });
    }
  }
}
