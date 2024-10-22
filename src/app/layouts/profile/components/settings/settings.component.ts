import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { easingOptions } from 'aos';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { ConfirmedValidator } from 'src/app/shared/validation/confirmed.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  openName: boolean = false;
  openEmail: boolean = false;
  openPass: boolean = false;
  openMobile: boolean = false;
  openCountry: boolean = false;

  secpass: boolean = false;
  secrepass: boolean = false;
  emailpass: boolean = false;
  orgineye: boolean = false;
  @ViewChild('extra') extra!: ElementRef;
  // Conditions
  show: boolean = false;
  showRepeat: boolean = false;

  fullName: string = '';
  lastName: string = '';
  userEmail: string = '';
  country: string = '';
  budget: any;
  phoneNum: any;
  countries: any[] = [];
  // To catch token from params
  token: any = '';

  // To intialize changeing password form
  changeForm!: FormGroup;
  phoneForm!: FormGroup;
  changeEmailForm!: FormGroup;
  CountryForm!: FormGroup;
  nameForm!: FormGroup;
  countryForm!: FormGroup;
  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _StudentsService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInformation();

    // To intialize change password form
    this.changeForm = this.formBuilder.group({
      currentPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });

    // To intialize change email form
    this.changeEmailForm = this.formBuilder.group({
      currentEmail: ['', [Validators.required, Validators.email]],
      newEmail: ['', [Validators.required, Validators.email]],
      yourPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });

    // To intialize change name form
    this.nameForm = this.formBuilder.group({
      namestudent: ['', [Validators.required]],
      laststudent: ['', [Validators.required]],
    });

    // To intialize change country form
    this.countryForm = this.formBuilder.group({
      countrystudent: ['', [Validators.required]],
    });

    this.activeRoute.params.subscribe((param) => {
      this.token = 'param.token';
    });

    // getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
    });
    // }
  }

  // To confirm action
  confirmAction(
    message: string = 'Your work has been saved',
    button: boolean = false
  ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: button,
      timer: 750,
    });
  }

  // To confirm error
  errorAction(message: string = 'Something went wrong!') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  // name
  showName() {
    if (this.openName == false) {
      this.openName = true;
    } else {
      this.openName = false;
    }
  }

  // email
  showEmail() {
    if (this.openEmail == false) {
      this.openEmail = true;
    } else {
      this.openEmail = false;
    }
  }

  // password
  showPass() {
    if (this.openPass == false) {
      this.openPass = true;
    } else {
      this.openPass = false;
    }
  }

  // password
  showMobile() {
    if (this.openMobile == false) {
      this.openMobile = true;
    } else {
      this.openMobile = false;
    }
  }

  // country
  showCountry() {
    if (this.openCountry == false) {
      this.openCountry = true;
    } else {
      this.openCountry = false;
    }
  }

  eyepass() {
    if (this.secpass == false) {
      this.secpass = true;
    } else {
      this.secpass = false;
    }
  }
  eyerepass() {
    if (this.secrepass == false) {
      this.secrepass = true;
    } else {
      this.secrepass = false;
    }
  }
  eyeorigin() {
    if (this.orgineye == false) {
      this.orgineye = true;
    } else {
      this.orgineye = false;
    }
  }

  // To show password or hide it
  showPassword() {
    this.show = !this.show;
  }

  // To show repeated password or hide it
  showRepeatPassword() {
    this.showRepeat = !this.showRepeat;
  }

  // get data information
  getInformation() {
    let email = String(localStorage.getItem('userEmail'));
    this._StudentsService.profile(email).subscribe((res: any) => {
      console.log(res);
      const [
        {
          data: [{ name, lastname, email, nationality, phone, budget }],
        },
      ] = res;

      this.fullName =
        name[0].toUpperCase() + name.substr(1).toLowerCase().replace('/', ' ');
      this.lastName =
      lastname[0].toUpperCase() + lastname.substr(1).toLowerCase().replace('/', ' ');
      this.userEmail = email;
      this.country = nationality;
      this.phoneNum = phone;
      this.budget = budget;
      this.fullName = name.replace('/', ' ');
      this.lastName = lastname.replace('/', ' ');
      this.nameForm.controls['namestudent'].setValue(this.fullName);
      this.nameForm.controls['laststudent'].setValue(this.lastName);
      this.changeEmailForm.controls['currentEmail'].setValue(this.userEmail);
      this.countryForm.controls['countrystudent'].setValue(this.country);

      // phoneNumber
      this.phoneForm = this.formBuilder.group({
        phonenumber: ['+' + this.phoneNum, Validators.required],
      });
    });
  }

  passwordData!: any;
  // Submitting the formPassword
  onSubmitPassword(formData: FormGroup) {
    this.passwordData = {};
    const { currentPassword, newPassword } = formData.value;
    var sha1 = require('sha1');
    let currentHashedPassword = sha1(currentPassword);
    let newHashedPassword = sha1(newPassword);
    const userToken = String(localStorage.getItem('token'));
    const email = String(localStorage.getItem('userEmail'));
    this._StudentsService
      .changePassword(
        email,
        userToken,
        currentHashedPassword,
        newHashedPassword
      )
      .subscribe((data: any) => {
        console.log(data);
        // this.submittedPassword = false;
        const [passwordData] = data;
        this.passwordData = passwordData;
        this.showPass();
        if (data[0].status === 200) {
          this.confirmAction(data[0].message);
        } else {
          this.errorAction();
        }
      });
  }

  emailData!: any;
  // changeEmailFormSumbission
  onSubmitEmail(formData: FormGroup) {
    this.emailData = {};
    const { currentEmail, newEmail, yourPassword } = formData.value;
    var sha1 = require('sha1');
    let hashedPassword = sha1(yourPassword);
    const userToken = String(localStorage.getItem('token'));
    this._StudentsService
      .changeEmailAddress(currentEmail, userToken, hashedPassword, newEmail)
      .subscribe((data: any) => {
        const [emailData] = data;
        this.emailData = emailData;
        this.showEmail();
        if (data[0].status === 200) {
          this.confirmAction(data[0].message);
          this.router.navigate(['/auth/login']);
          localStorage.clear();
        } else {
          this.errorAction();
        }
      });
  }

  // change  phone
  onSubmit1(formData: FormGroup) {
    console.log(formData.value);
    const email = String(localStorage.getItem('userEmail'));
    const userName = String(localStorage.getItem('userName'));
    this._StudentsService
      .changeCountryPhone(
        email,
        userName,
        '',
        formData.value.phonenumber.number,
        '',
        ''
      )
      .subscribe((data: any) => {
        this.phoneNum = formData.value.phonenumber.number;
        if (data[0].status === 201) {
          this.confirmAction(data[0].message);
        } else {
          this.errorAction();
        }
      });
    this.showMobile();
  }

  onSubmitName(formData: FormGroup) {
    console.log(formData.value);
    const email = String(localStorage.getItem('userEmail'));
    const userName = String(localStorage.getItem('userName'));
    this._StudentsService
      .changeCountryPhone(email, userName, '', '', formData.value.namestudent, formData.value.laststudent)
      .subscribe((data: any) => {
        console.log(data);
        this.fullName = formData.value.namestudent;
        this.lastName = formData.value.laststudent;
        if (data[0].status === 201) {
          this.confirmAction(data[0].message);
        } else {
          this.errorAction();
        }
      });
    this.showName();
  }

  onSubmitCountry(formData: FormGroup) {
    console.log(formData.value, this.country);
    const email = String(localStorage.getItem('userEmail'));
    const userName = String(localStorage.getItem('userName'));
    this._StudentsService
      .changeCountryPhone(
        email,
        userName,
        formData.value.countrystudent,
        '',
        '',
        ''
      )
      .subscribe((data: any) => {
        this.country = formData.value.countrystudent;
        if (data[0].status === 201) {
          this.confirmAction(data[0].message);
        } else {
          this.errorAction();
        }
      });
    this.showCountry();
  }
}
