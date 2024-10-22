import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-representative-password',
  templateUrl: './representative-password.component.html',
  styleUrls: ['./representative-password.component.scss']
})
export class RepresentativePasswordComponent implements OnInit {

  setPasswordForm!: FormGroup;

  // To show password or hide password
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {
this.setPasswordForm = new FormGroup({
  password: new FormControl('', [Validators.required])
});
  }

  onSubmit(setPasswordForm: FormGroup){

  }

  // To show password or hide password
  showPassword() {
    this.show = !this.show;
  }

}
