// import { Component, OnInit } from '@angular/core';
// import { OwnerService } from 'src/app/shared/services/owner/owner.service';
// import { FormControl } from '@angular/forms';
// import {
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';
// import {
//   DateAdapter,
//   MAT_DATE_FORMATS,
//   MAT_DATE_LOCALE,
// } from '@angular/material/core';
// import { MatDatepicker } from '@angular/material/datepicker';
// import * as _moment from 'moment';
// import { default as _rollupMoment, Moment } from 'moment';
// import { Router } from '@angular/router';

// const moment = _rollupMoment || _moment;
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
// @Component({
//   selector: 'app-stats',
//   templateUrl: './stats.component.html',
//   styleUrls: ['./stats.component.scss'],
//   providers: [
//     {
//       provide: DateAdapter,
//       useClass: MomentDateAdapter,
//       deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
//     },

//     { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
//   ],
// })
// export class StatsComponent implements OnInit {
//   // To get filltered date
//   date = new FormControl(moment());
//   month: number = 0;
//   fullYear: number = 0;

//   emplyoeesStats: any = [];

//   constructor(private ownerService: OwnerService, private router: Router) {}

//   ngOnInit(): void {
//     this.displayStats();
//   }

//   displayStats() {
//     this.ownerService.getAllEmployeesStats().subscribe((data) => {
//       return (this.emplyoeesStats = data);
//     });
//   }

//   setMonthAndYear(
//     normalizedMonthAndYear: Moment,
//     datepicker: MatDatepicker<Moment>
//   ) {
//     const ctrlValue = this.date.value;
//     ctrlValue.month(normalizedMonthAndYear.month());
//     ctrlValue.year(normalizedMonthAndYear.year());
//     this.date.setValue(ctrlValue);
//     this.month = this.date.value._d.getMonth() + 1;
//     this.fullYear = this.date.value._d.getFullYear();
//     this.ownerService
//       .getSingleEmployeeStats(this.month, this.fullYear)
//       .subscribe((data) => {
//         return (this.emplyoeesStats = data);
//       });
//     datepicker.close();
//   }

//   passEmail(email: string) {
//     document.cookie = 'EmployeeEmail=' + email + ';';
//   }
// }
