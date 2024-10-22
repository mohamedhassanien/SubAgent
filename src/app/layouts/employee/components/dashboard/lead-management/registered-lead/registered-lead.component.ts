import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { Prospect } from '../../../../../../shared/models/prospect';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registered-lead',
  templateUrl: './registered-lead.component.html',
  styleUrls: ['./registered-lead.component.scss'],
})
export class RegisteredLeadComponent implements OnInit {
  loading: boolean = true;

  // To control number of rows every page
  sizes: number[] = [10, 25, 50];
  sizeName: number = 10;

  // Students Arrays
  allProspects!: Prospect[];
  originalProspects!: Prospect[];

  // Pagination options
  page: number = 1;
  pageSize: number = 10;

  // To search for a lead
  searchProspects: string = '';

  constructor(private _EmployeeService: EmployeeService) {
    // To get prospect
    this.getprospects();
  }

  ngOnInit(): void {}

  // get all prospect
  getprospects() {
    this.loading = true;
    this._EmployeeService.getAllRegisteredLeads().subscribe((data: any) => {
      const { status, employeeStudnents: prospects } = data[0];
      prospects.map((prospect) => {
        prospect.studentPhone = '+' + prospect.studentPhone;
      });
      this.originalProspects = prospects;
      this.allProspects = prospects;
      this.loading = false;
    });
  }

  resetFilter() {
    this.getprospects();
  }
}
