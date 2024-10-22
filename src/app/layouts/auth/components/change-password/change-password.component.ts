import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/Auth/auth.service';
import { ConfirmedValidator } from 'src/app/shared/validation/confirmed.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  // Conditions
  show: boolean = false;
  showRepeat: boolean = false;

  // To catch token from params
  token: any = '';

  // To intialize changeing password form
  changeForm!: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        repeatPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
      },
      {
        validator: ConfirmedValidator('password', 'repeatPassword'),
      }
    );

    this.activeRoute.params.subscribe((param) => {
      this.token = param.token;
    });
  }

  // To show password or hide it
  showPassword() {
    this.show = !this.show;
  }

  // To show repeated password or hide it
  showRepeatPassword() {
    this.showRepeat = !this.showRepeat;
  }
  confirmAction(message: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      timer: 2000,
    });
  }

  // To confirm error
  errorAction(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
 
  // Submitting the form
  onSubmit(formData: FormGroup) {
    let sha1 = require('sha1');
    const password = sha1(formData.controls.password.value);

    this.authService.changePassword(this.token, password).subscribe((data) => {
      console.log(data[0]);
      if (data[0].status === 200) {
       this.confirmAction(data[0].message)
       this.router.navigate(['/auth/login']);
      }
     else if(data[0].status === 400){
      this.errorAction(data[0].message)
     }
    });
  }
}
