import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { empStats } from 'src/app/shared/models/empStats';
import { Application } from 'src/app/shared/models/application';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyApplicationsComponent implements OnInit {
  empName: string = String(localStorage.getItem('name'));

  // To control number of rows every page
  sizes: number[] = [10, 25, 50];
  sizeName: number = 10;

  applicationStats!: empStats;

  allApplications!: Application[];
  originalApplications!: Application[];

  searchApps: string = '';

  // Pagination options
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router
  ) {
    // To get students
    this.getApplications();
    // To call statistics
  }

  ngOnInit(): void {}

  // To get all students
  getApplications() {
    this._EmployeeService.getEmployeeApps().subscribe((data: any) => {
      const [{ data: employeeApps }] = data;
      employeeApps.map((app) => {
        app.studentPhone = '+' + app.studentPhone;
        if (app.studentSource !== null) {
          if (app.studentSource?.replace(' ', '').includes('/')) {
            app.studentSource = app.studentSource.trim().split('/');
          } else {
            app.studentSource = [app.studentSource?.trim()];
          }
        }
      });
      this.allApplications = employeeApps;
      this.originalApplications = employeeApps;
    });
  }

  resetFilter() {
    this.getApplications();
  }

  // To get all statistics
}
