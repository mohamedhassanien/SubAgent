import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/shared/models/application';
import { empStats } from 'src/app/shared/models/empStats';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-appjanthisyear',
  templateUrl: './appjanthisyear.component.html',
  styleUrls: ['./appjanthisyear.component.scss'],
})
export class AppjanthisyearComponent implements OnInit {
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

  ngOnInit(): void {
   
  }

  status: string = 'Total Applications';
  st1: boolean = true;
  st2: boolean = false;
  st3: boolean = false;
  st4: boolean = false;
  st5: boolean = false;
  st6: boolean = false;
  st7: boolean = false;
  st8: boolean = false;

  sentToSchFilteration: any[] = [];
  sentToSchRemiders: number = 0;
  senttoschool!: number;

  interviewPreFilteration: any[] = [];
  interviewPreRemiders: number = 0;
  interviewprepation!: number;

  acceptedFiltertion: any[] = [];
  acceptedReminders: number = 0;
  accepted!: number;

  alterancefound!: number;
  depositpaid!: number;
  visaok!: number;
  rejected!: number;
  VisaRefused!: number;
  totalapp!: number;

  filterStatus(x: string) {
    this.status = x;
    this.getApplications();
  }

  // To get all students
  getApplications() {
    this.loading = true;
  }



  resetFilter() {
    this.getApplications();
  }

  // To get all statistics

}
