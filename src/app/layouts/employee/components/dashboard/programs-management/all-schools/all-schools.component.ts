import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SchoolsService } from 'src/app/shared/services/schools/schools.service';

@Component({
  selector: 'app-all-schools',
  templateUrl: './all-schools.component.html',
  styleUrls: ['./all-schools.component.scss'],
})
export class AllSchoolsComponent implements OnInit {
  loading: boolean = true;

  // Students Arrays
  allSchools;
  originalSchools;

  // Pagination options
  page: number = 1;
  pageSize: number = 10;

  // To search for a lead
  searchSchools: string = '';

  constructor(private _EmployeeService: EmployeeService) {
    // To get schools
    this.getSchools();
  }

  ngOnInit(): void {}

  // get all schools
  getSchools() {
    this.loading = true;
    this._EmployeeService.getAllSchoolsData().subscribe((data: any) => {
      const { status, data: schools } = data[0];
      schools.map((school) => {
        // if (school.pics) {
        //   school.pics = JSON.parse(school.pics.replace(/°/g, '"'));
        // }
        school.ranking = school.ranking.replace(/Top /g, '');
        console.log(school.pics);
      });
      this.originalSchools = schools;
      this.allSchools = schools;
      this.loading = false;
      console.log(this.allSchools);
    });
  }

  resetFilter() {
    this.getSchools();
  }
}
