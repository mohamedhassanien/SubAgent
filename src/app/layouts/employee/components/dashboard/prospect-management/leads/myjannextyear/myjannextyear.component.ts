import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empStats } from 'src/app/shared/models/empStats';
import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-myjannextyear',
  templateUrl: './myjannextyear.component.html',
  styleUrls: ['./myjannextyear.component.scss'],
})
export class MyjannextyearComponent implements OnInit {
  empName: string = String(localStorage.getItem('name'));

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
  }

  ngOnInit(): void {}

  // To get all students
  getStudents() {
    this._EmployeeService
      .getEmployeeStudentsjannext()
      .subscribe((data: any) => {
        const [{ employeeStudnents }] = data;
        employeeStudnents.map((student) => {
          student.studentPhone = '+' + student.studentPhone;
          if (student.studentSource !== null) {
            if (student.studentSource?.replace(' ', '').includes('/')) {
              student.studentSource = student.studentSource.trim().split('/');
            } else {
              student.studentSource = [student.studentSource?.trim()];
            }
          }
        });
        this.originalStudents = employeeStudnents;
        this.allStudents = employeeStudnents;
      });
  }

  resetFilter() {
    this.getStudents();
  }

  // To get all statistics
}
