import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empStats } from 'src/app/shared/models/empStats';
import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {


  loading: boolean = true;

  // To control number of rows every page
  sizes: number[] = [10, 25, 50];
  sizeName: number = 10;

  // Employees Statistics
  employeeStats!: empStats;

  // Students Arrays
  allStudents!: Student[];
  originalStudents!: Student[];
  stidentsts!: any[];

  // Pagination options
  page: number = 1;
  pageSize: number = 10;

  // To search for a lead
  searchLeads: string = '';





  userEmail: string = String(localStorage.getItem('userEmail'));
  userName: string = String(localStorage.getItem('userName'));
  Studintuser: string =''



  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router
  ) {
    // To get students
    this.getStudents();
    // To call statistics
  }

  ngOnInit(): void {
    this.getStudentCount();
    this.getStudents();
    this.Studintuser = String(localStorage.getItem('StudintName'));

    this._EmployeeService.getProspectNotifications(this.userName, this.userEmail ,this.Studintuser ).subscribe((data: any) => {
      console.log('this Data');
      const [{ employeeStudnents }] = data;
      employeeStudnents.map((student) => {
        student.studentPhone = '+' + student.studentPhone;
        if (student.studentSource !== null) {
          // if (student.studentSource?.replace(' ', '').includes('/')) {
          //   student.studentSource = student.studentSource.trim().split('/');
          // } else {
          //   student.studentSource = [student.studentSource?.trim()];
          // }
        }
      });
      this.originalStudents = employeeStudnents;
      // Filter by status First Contact & Reminders > = 10
      this.firstCoFilteration = this.originalStudents.filter(
        (el) => el.reminders >= 10 && el.studentStatus === 'First Contact'
      );
      this.firstCoReminders = this.firstCoFilteration.length;

      // Filter by status Checking Programs & Reminders > = 7
      this.checkingProFilteration = this.originalStudents.filter(
        (el) => el.reminders >= 7 && el.studentStatus === 'Checking Programs'
      );
      this.checkingProReminders = this.checkingProFilteration.length;

      // Filter by status Preparing Docs & Reminders > = 10
      this.preparingDocsFilteration = this.originalStudents.filter(
        (el) => el.reminders >= 7 && el.studentStatus === 'Preparing Docs'
      );
      this.preparingDocsReminders = this.preparingDocsFilteration.length;

      if (this.status === 'Total Users') {
        this.allStudents = this.originalStudents;
      } else {
        this.allStudents = this.originalStudents.filter(
          (p) => p.studentStatus === this.status
        );
      }
      this.loading = false;
    });
  }
  status: string = 'Total Users';
  firstCoFilteration: any[] = [];
  firstCoReminders: Number = 0;
  FirstContact!: number;

  checkingProFilteration: any[] = [];
  checkingProReminders: Number = 0;
  CheckingPrograms!: number;

  preparingDocsFilteration: any[] = [];
  preparingDocsReminders: Number = 0;
  preparingDocs!: number;

  totalusers!: number;
  tUsers: boolean = true;
  fContact: boolean = false;
  cPrograms: boolean = false;
  pDocs: boolean = false;

  filterStatus(x: string) {
    this.status = x;
   
  }

  // To get all students
  getStudents() {
    this.loading = true;
  
  }

  getStudentCount() {
    this._EmployeeService
      .getAllEmployeesStudentsCount()
      .subscribe((data: any) => {
        this.FirstContact = data['First Contact'];
        this.CheckingPrograms = data['Checking Programs'];
        this.preparingDocs = data['Preparing Docs'];
        this.totalusers =
          this.FirstContact + this.CheckingPrograms + this.preparingDocs;
      });
  }

  resetFilter() {
    this.getStudents();
  }

  // To get all statistics
  

  
}