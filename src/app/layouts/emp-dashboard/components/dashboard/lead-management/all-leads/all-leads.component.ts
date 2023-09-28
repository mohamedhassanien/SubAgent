import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { empStats } from 'src/app/shared/models/empStats';
import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-all-leads',
  templateUrl: './all-leads.component.html',
  styleUrls: ['./all-leads.component.scss'],
})
export class AllLeadsComponent implements OnInit {
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

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router
  ) {
    // To get students
    this.getStudents();
    // To call statistics
    this.getStatistics();
  }

  ngOnInit(): void {}

  // To get all students
  getStudents() {
    this.loading = true;
    this._EmployeeService.getAllEmployeesStudents().subscribe((data: any) => {
      const [{ status, employeeStudnents }] = data;
      console.log(employeeStudnents);
      this.originalStudents = employeeStudnents;
      this.allStudents = employeeStudnents;
      this.loading = false;
      console.log(this.allStudents);
    });
  }

  resetFilter() {
    this.getStudents();
  }

  // To get all statistics
  getStatistics() {
    const typeArray = this._Router.url.split('/');
    const type = typeArray[typeArray.length - 1];
    this._EmployeeService.getStatistics(type).subscribe((data: any) => {
      const [{ data: applicationStats }] = data;
      this.employeeStats = applicationStats;
    });
  }
}
