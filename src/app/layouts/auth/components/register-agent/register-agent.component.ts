import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-agent',
  templateUrl: './register-agent.component.html',
  styleUrls: ['./register-agent.component.scss']
})
export class RegisterAgentComponent implements OnInit {
  registerForm !: FormGroup;
  stepOne !: boolean;
  stepTwo !: boolean;
  stepThree !: boolean;
  constructor(private form: FormBuilder) { 
    this.stepOne = true
  }

  ngOnInit(): void {
    this.registerForm = this.form.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.email]],
        phone: ['', [Validators.required]],
        city: [''],
        profilePhoto: [''],
        cName: [''],
        cEmail: [''],
        cPhone: [''],
        cPosition: ['']
      }
    )
  }
  PrevToStep2(){
    this.stepOne = true
    this.stepTwo = false
  }
  NextToStep2(){
    this.stepOne = false
    this.stepTwo = true
  }
  NextToStep3(){
    this.stepTwo = false
    this.stepThree = true
  }
}
