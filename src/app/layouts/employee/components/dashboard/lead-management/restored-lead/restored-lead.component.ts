import { Prospect } from '../../../../../../shared/models/prospect';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-restored-lead',
  templateUrl: './restored-lead.component.html',
  styleUrls: ['./restored-lead.component.scss'],
})
export class RestoredLeadComponent implements OnInit {
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

  ngOnInit(): void { }

  // get all prospect
  getprospects() {
    this.loading = true;
    this._EmployeeService.getAllProspect().subscribe((data: any) => {
      const { status, Data: prospects } = data;
      prospects.map((prospect: Prospect) => {
        prospect.phone = '+' + prospect.phone;
        // prospect.name = prospect.name.replace('/'," ");
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
