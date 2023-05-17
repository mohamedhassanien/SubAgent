import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  // To intialize the reset form group
  resetPasswordForm!: FormGroup;

  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(resetPasswordForm: FormGroup) {
    let email = resetPasswordForm.controls['email'].value;

    this.authService.forgetPassword(email).subscribe((data) => {
      console.log(data);
      if (data) {
        this.router.navigate(['/auth/check-your-inbox']);
      }
    });
  }
}
