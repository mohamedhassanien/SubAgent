import { ConfirmedValidator } from 'src/app/shared/validation/confirmed.validator';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../services/registeration/register.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss'],
})
export class ConfirmPasswordComponent implements OnInit {
  confirmPasswordForm!: FormGroup;
  token!: any;
  error!: boolean;
  show: boolean = false;
  private newPassword: any;
  constructor(
    private router: Router,
    private form: FormBuilder,
    private actRoute: ActivatedRoute,
    private https: RegisterService
  ) {}

  ngOnInit(): void {
    // get Token
    this.actRoute.params.subscribe((param) => {
      this.token = param['token'];
    });

    this.confirmPasswordForm = this.form.group(
      {
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
      },
      {
        // check if password and confirm password is equal
        validator: ConfirmedValidator('password', 'cpassword'),
      }
    );
  }

  onSubmit(formData: any) {
    // if the form is valid doesn't contain any errors
    if (formData.valid) {
      // send the request
      let sha1 = require('sha1');
      this.newPassword = formData.controls.password.value;
      const password = sha1(this.newPassword);

      this.https.updatePassword(this.token, password).subscribe((data) => {
        if (data) {
          return this.router.navigate(['/auth/login/0']);
        } else return (this.error = true);
      });
    } else return alert('please compelete the form');
  }

  // view password
  viewPassword() {
    this.show = !this.show;
  }
}
