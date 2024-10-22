
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { empStats } from 'src/app/shared/models/empStats';
import { Application } from 'src/app/shared/models/application';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-site-applications',
  templateUrl: './site-applications.component.html',
  styleUrls: ['./site-applications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SiteApplicationsComponent implements OnInit {
  empName: string = String(localStorage.getItem('name'));
  loading: boolean = true;

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
    this.loading = true;
    this._EmployeeService.getSiteApps().subscribe((data: any) => {
      const [{ data: employeeApps }] = data;
      this.allApplications = employeeApps;
      this.loading = false;
      this.originalApplications = employeeApps;
    });
  }

  resetFilter() {
    this.getApplications();
  }

  // To get all statistics
}
