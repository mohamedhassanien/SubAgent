import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.scss'],
})
export class MyDocumentsComponent implements OnInit {
  fullName!: string;

  constructor() {
    this.fullName = String(localStorage.getItem('name'));
  }

  ngOnInit(): void {}
}
