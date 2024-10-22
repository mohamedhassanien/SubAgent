import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
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
// import { GoogleAuthProvider, OAuthProvider , FacebookAuthProvider, getAuth, signInWithPopup } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import firebase from 'firebase/compat';
import {
  getAuth,
  signInWithPopup,
  OAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { MsalService } from '@azure/msal-angular';
import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterStudentComponent implements OnInit {
  // To intialize registeration form
  registerationForm!: FormGroup;

  // Conditions
  show: boolean = false;
  showConfirm: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  isChecked: boolean = true;
  isThirdParty: boolean = false;

  locationName: string = 'Select Country';
  searchLocation!: string;
  locations!: [];

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
    private afAuth: AngularFireAuth,
    private _EmployeeService: EmployeeService,
    private msalService: MsalService,
    private _StudentsService: StudentsService
  ) { }

  ngOnInit(): void {
    this.getAllEmployees()
    this.registerationForm = this.form.group(
      {
        // name: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        password: [
          '',
          this.isThirdParty && [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
          ],
        ],
        confirmPassword: [
          '',
          this.isThirdParty && [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
            ),
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

    this.getAllCountries();

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

  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.locations = countries;
    });
  }

  changeSelection(identifier: string, e?: any, value?: string) {
    if (identifier === 'location') {
      const inputval = e.target.innerText;
      this.locationName = inputval;
    }
    // else if (identifier === 'rank') {
    //   const inputval = e.target.innerText;
    //   this.rankName = inputval;
    // }
  }

  name: any = '';
  email: any = '';
  firstName: any = '';
  lastName: any = '';
  password: any = '';
  confirmPassword: any = '';

  GoogleAuth() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (data: any) => {
        const {
          additionalUserInfo: {
            profile: { name, email, id },
          },
        } = data;
        this.firstName = name.split(' ')[0];
        this.lastName = name.split(' ')[1];
        this.email = email;
        this.password = id;
        this.confirmPassword = id;
        this.hideelement.nativeElement.style.display = 'none';
        this.hideelement1.nativeElement.style.display = 'none';
        this.disableelement.nativeElement.disabled = true;
        this.disableelement1.nativeElement.disabled = true;
        this.isThirdParty = true;
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          confirmButtonColor: '#16294f',
        });
        this.isThirdParty = false;
      }
    );
  }

  FaceBookAuth() {
    this.afAuth.signInWithPopup(new FacebookAuthProvider()).then(
      (data: any) => {
        const {
          additionalUserInfo: {
            profile: { name, email, id },
          },
        } = data;
        this.firstName = name.split(' ')[0];
        this.lastName = name.split(' ')[1];
        this.email = email;
        this.password = id;
        this.confirmPassword = id;
        this.hideelement.nativeElement.style.display = 'none';
        this.hideelement1.nativeElement.style.display = 'none';
        this.disableelement.nativeElement.disabled = true;
        this.disableelement1.nativeElement.disabled = true;
        this.isThirdParty = true;
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          confirmButtonColor: '#16294f',
        });
        this.isThirdParty = false;
      }
    );
  }

  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.representatives = data.message;
    });
  }

  // To show password or hide it
  showPassword() {
    this.show = !this.show;
  }

  showConfirmPassword() {
    this.showConfirm = !this.showConfirm;
  }
  onCheckboxChange() {
    this.isChecked = !this.isChecked;
  }

  onSubmit(formData: FormGroup) {
    this.submitted = true;
    //   console.log('firstName: '+ formData.controls.firstName.valid,
    //   'lastName: '+formData.controls.lastName.valid,
    //   'email: '+formData.controls.email.valid,
    //   'phone: '+formData.controls.phone.valid,
    //   'country: '+formData.controls.country.valid,
    //   'age: '+formData.controls.age.valid,
    //   'password: '+formData.controls.password.valid,
    // 'formdata'+formData.valid)
    if (formData.controls.firstName.valid &&
      formData.controls.lastName.valid && formData.controls.email.valid &&
      formData.controls.phone.valid && formData.controls.country.valid
      && formData.controls.age.valid
      && formData.controls.password.valid) {
      this.isError = false;
      this.isLoading = true;
      this.firstName = formData.controls.firstName.value;
      this.lastName = formData.controls.lastName.value;
      this.name = this.firstName + '/' + this.lastName;
      this.email = formData.controls.email.value;
      let phone = formData.controls.phone.value.internationalNumber;
      let country = formData.controls.country.value;
      let age = formData.controls.age.value;
      // password
      var sha1 = require('sha1');
      let hashedPassword = sha1(formData.controls.password.value);

      const representative = formData.controls.contact.value;
      console.log(representative);

      sessionStorage.setItem('email', this.email);
      sessionStorage.setItem('name', this.name);

      this.authService
        .registerStudent(
          this.name,
          this.email,
          hashedPassword,
          phone,
          country,
          age,
          representative
        )
        .subscribe((data: any) => {
          if (data.status == 200) {
            this.router.navigate(['/auth/verfiy']);
          } else {
            this.isError = true;
            this.errorMessage = data.message;
          }
          this.isLoading = false;
        });
    } else {
      this.isError = true;
    }
  }
}
