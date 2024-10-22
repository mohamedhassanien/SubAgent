import { StudentsService } from './../../../../shared/services/students/students.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  ngOnInit(): void {}
  // // form for request by an email
  // requestForm !: FormGroup
  // constructor(private formBuilder: FormBuilder,
  //   private studentServ: StudentsService) {}

  // ngOnInit(): void {
  //   this.requestForm = this.formBuilder.group(
  //     {
  //       email : ['', [Validators.email, Validators.required]],
  //       msg : ['', [Validators.required]]
  //     }
  //   )
  // }

  // // if the user want to send any question by email
  // request( form: FormGroup){
  //   // student email
  //   let email = form.controls.email.value
  //   // student's msg
  //   let msg = form.controls.msg.value

  //   this.studentServ.sendRequestByMail(email, msg).subscribe(
  //     (data: any) => {
  //       if (data) {
  //         alert('Email has been send')
  //         return location.reload()
  //       }
  //       else return false
  //     }
  //   )
  // }
}
