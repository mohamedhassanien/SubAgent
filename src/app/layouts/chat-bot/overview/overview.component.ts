import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @Input('student') student!: any;
  @Input('chatData') chatData!: any;
  @Input('fieldsOfInterest') fieldsOfInterest!: any;
  @Input('otherFields') otherFields!: string;

  stuName = String(localStorage.getItem('name'));
  nationality = String(localStorage.getItem('nationality'));
  email = String(localStorage.getItem('userEmail'));

  constructor() {}

  ngOnInit(): void {
    
  }
}
