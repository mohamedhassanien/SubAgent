import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { empStats } from 'src/app/shared/models/empStats';
import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-archived-prospects',
  templateUrl: './archived-prospects.component.html',
  styleUrls: ['./archived-prospects.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArchivedProspectsComponent implements OnInit {
  empName: string = String(localStorage.getItem('name'));

  loading: boolean = true;

  // To control number of rows every page
  sizes: number[] = [10, 25, 50];
  sizeName: number = 10;

  // Employees Statistics
  employeeStats!: empStats;

  // Students Arrays
  allStudents!: Student[];
  originalStudents!: Student[];

  // Pagination options
  page: number = 1;
  pageSize: number = 10;

  // To search for a lead
  searchLeads: string = '';

  empEmail = localStorage.getItem('userEmail');
  empUsername = localStorage.getItem('userName');

  archiveState = false;

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router
  ) {
    // To get students
    this.getStudents();
    this.archiveState = true;
    // To call statistics
  }

  ngOnInit(): void {}

  // To get all students
  getStudents() {
    this.loading = true;
    // this._EmployeeService.archiveAction(0, null, null, this.empUsername, this.empEmail).subscribe((data: any) => {
    this._EmployeeService.archiveAction(1,null,null,1,0).subscribe((data: any) => {
      const { status, Data } = data;
      this.originalStudents = Data;
      this.allStudents = Data;
      console.log(this.allStudents);
    });
  }

  resetFilter() {
    this.getStudents();
  }

  // To get all statistics
}
