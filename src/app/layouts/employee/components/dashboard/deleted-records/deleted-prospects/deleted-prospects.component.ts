import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-deleted-prospects',
  templateUrl: './deleted-prospects.component.html',
  styleUrls: ['./deleted-prospects.component.scss']
})
export class DeletedProspectsComponent implements OnInit {
  sizes: number[] = [10, 25, 50];
  sizeName: number = 10;
  
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

deletedStudents = false;

loading: boolean = true;

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router) { 
      this.getStudents();
      this.deletedStudents = true;
    }

  ngOnInit(): void {
  }

  // To get all students
  getStudents() {
    this.loading = true;
    this._EmployeeService.getProspects(0, null, null, this.empUsername, this.empEmail,0,1).subscribe((data: any) => {
      const { status, Data } = data;
      this.originalStudents = Data;
      this.allStudents = Data;
      if(status == 200){
        console.log(this.allStudents);
        this.loading = false;
      }
    });
  }
  
}
