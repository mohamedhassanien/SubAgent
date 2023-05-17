import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/shared/models/application';
import { empStats } from 'src/app/shared/models/empStats';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-deleted-applications',
  templateUrl: './deleted-applications.component.html',
  styleUrls: ['./deleted-applications.component.scss'],
})
export class DeletedApplicationsComponent implements OnInit {
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
    this.getStatistics();
  }

  ngOnInit(): void {}

  // To get all students
  getApplications() {
    this.loading = true;
    this._EmployeeService.getDeletedApplications().subscribe((data: any) => {
      const [{ data: employeeApps }] = data;
      this.allApplications = employeeApps;
      this.originalApplications = employeeApps;
      this.loading = false;
    });
  }

  resetFilter() {
    this.getApplications();
  }

  // To get all statistics
  getStatistics() {
    const typeArray = this._Router.url.split('/');
    const type = typeArray[typeArray.length - 1];
    this._EmployeeService.getStatistics(type).subscribe((data: any) => {
      const [{ data: applicationStats }] = data;
      this.applicationStats = applicationStats;
    });
  }
}
