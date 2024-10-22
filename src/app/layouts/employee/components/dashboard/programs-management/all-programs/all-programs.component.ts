import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SchoolsService } from 'src/app/shared/services/schools/schools.service';

@Component({
  selector: 'app-all-programs',
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.scss'],
})
export class AllProgramsComponent implements OnInit {
  loading: boolean = true;

  // Students Arrays
  allPrograms;
  originalPrograms;

  // Pagination options
  page: number = 1;
  pageSize: number = 10;

  // To search for a lead
  searchPrograms: string = '';

  constructor(private _EmployeeService: EmployeeService) {
    // To get prospect
    this.getPrograms();
  }

  ngOnInit(): void {}

  // get all prospect
  getPrograms() {
    this.loading = true;
    this._EmployeeService.getAllProgramsData().subscribe((data: any) => {
      const { status, data: Programs } = data;
      this.originalPrograms = Programs;
      this.allPrograms = Programs;
      this.loading = false;
    });
  }

  resetFilter() {
    this.getPrograms();
  }
}
