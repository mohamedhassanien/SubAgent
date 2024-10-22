import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsService } from './../../../shared/services/students/students.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  location!: string;
  subscribeForm!: FormGroup;
  subscribed: boolean = false;
  alreadySubscribed: boolean = false;
  isLoading: boolean = false;
  currentYear = new Date().getFullYear();

  constructor(
    private _Http: HttpClient,
    private _FormBuilder: FormBuilder,
    private _StudentsService: StudentsService
  ) {
  }

  ngOnInit(): void {
    
  }


}
