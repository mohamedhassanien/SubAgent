import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StudentsService } from 'src/app/shared/services/students/students.service';
import { ConfirmedValidator } from 'src/app/shared/validation/confirmed.validator';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  // Variables
  showPassword: boolean = true;
  showCurrentPassword: boolean = true;
  showNewPassword: boolean = true;
  showRepeatPassword: boolean = true;
  submittedEmail: boolean = false;
  submittedPassword: boolean = false;
  emailData!: any;
  passwordData!: any;

  // forms
  changeEmailForm!: FormGroup;
  changePasswordForm!: FormGroup;

  // Elements
  @ViewChild('email', { static: false }) email!: any;
  @ViewChild('password', { static: false }) password!: any;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _StudentsService: StudentsService
  ) {
    this._ActivatedRoute.fragment.subscribe((frag) => {
      if (frag === 'email') {
        this.email.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      } else if (frag === 'password') {
        this.password.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    });

    // To intialize change email form
    this.changeEmailForm = this._FormBuilder.group({
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

    // To intialize change password form
    this.changePasswordForm = this._FormBuilder.group(
      {
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
        repeatNewPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
      },
      {
        validator: ConfirmedValidator('newPassword', 'repeatNewPassword'),
      }
    );
  }

  ngOnInit(): void {
    window.scrollTo(0, 50);
  }

  // To show password whenever clicking on the eye icon
  showPasswordFunc(identifier: string) {
    if (identifier === 'password') this.showPassword = !this.showPassword;
    if (identifier === 'currentPassword')
      this.showCurrentPassword = !this.showCurrentPassword;
    if (identifier === 'newPassword')
      this.showNewPassword = !this.showNewPassword;
    if (identifier === 'repeatPassword')
      this.showRepeatPassword = !this.showRepeatPassword;
  }

  // changeEmailFormSumbission
  onSubmitEmail(formData: FormGroup) {
    this.submittedEmail = true;
    this.emailData = {};
    const { currentEmail, newEmail, yourPassword } = formData.value;
    const userToken = String(localStorage.getItem('token'));
    this._StudentsService
      .changeEmailAddress(currentEmail, userToken, yourPassword, newEmail)
      .subscribe((data: any) => {
        this.submittedEmail = false;
        const [emailData] = data;
        this.emailData = emailData;
        if (emailData.status === 200) this.changeEmailForm.reset();
      });
  }

  // changeEmailFormSumbission
  onSubmitPassword(formData: FormGroup) {
    this.submittedPassword = true;
    this.passwordData = {};
    const { currentPassword, newPassword } = formData.value;
    const userToken = String(localStorage.getItem('token'));
    const email = String(localStorage.getItem('userEmail'));
    this._StudentsService
      .changePassword(email, userToken, currentPassword, newPassword)
      .subscribe((data: any) => {
        console.log(data);
        this.submittedPassword = false;
        const [passwordData] = data;
        this.passwordData = passwordData;
        if (passwordData.status === 200) this.changePasswordForm.reset();
      });
  }

  // To reset data of any form
  resetData(identifier: string) {
    if (identifier === 'changeEmailForm') {
      this.changeEmailForm.reset();
      this.emailData.message = '';
      this.submittedEmail = false;
    }

    if (identifier === 'changePasswordForm') {
      this.changePasswordForm.reset();
      this.passwordData.message = '';
      this.submittedPassword = false;
    }
  }
}
