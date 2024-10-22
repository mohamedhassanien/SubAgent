import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';

@Component({
  selector: 'app-employee-team',
  templateUrl: './employee-team.component.html',
  styleUrls: ['./employee-team.component.scss']
})
export class EmployeeTeamComponent implements OnInit {
  appReminderChart: any = {};
  appProspectChart: any = {};
  months: string[] = ['january', 'september'];
  Status: string[] = ['First contract', 'Checking programs', 'Preparing programs', 'Preparing docs', 'Applied'];
  monthsNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [2022, 2023, 2024];
  selectedMonth: string = '';
  selectedMonth1: string = '';
  selectedStatus: string = '';
  selectedMonthNum!: number;
  selectedYear: number = 0;
  selectedYear1: number = 0;
  selectedRepresentative: string = '';
  selectedRepresentative1: string = '';
  representatives: any[] = [];

  selectmemp: number = 2
  selectyemp: number = 2023
  constructor(
    private _StatisticsService: StatisticsService,
    private _EmployeeService: EmployeeService
  ) {
    this.getMonthlyAppPerEmployee(this.selectmemp, this.selectyemp)
  }

  ngOnInit(): void {
    //get representatives name
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.representatives = data;
    });

    // reminders
    this.onReminderApply()
    this.selectedMonth = String(this.months[0]);
    this.selectedYear = Number(this.years[1]);
    this.selectedStatus = String(this.Status[0])
    this.selectedRepresentative = String(this.representatives[0])

    // prospect
    this.onProspectApply()
  }

  // reminder app
  getAppReminder(month: string, year: number, representative: string) {
    this._StatisticsService.getAppPerEmp(month, year, representative).subscribe((data) => {
      console.log(data);

      const stagesArr = data['message'] as [];
      const stage: [] = [];
      const number: [] = [];
      stagesArr.forEach((statges) => {
        stage.push(statges['name']);
        number.push(statges['value']);
      });

      this.appReminderChart = {
        series: number,
        chart: {
          width: 450,
          type: 'donut',
        },
        colors: [
          '#45BF67',
          '#FFD844',
          '#FD955B',
          '#CA3C3C',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 230,
              },
              legend: {
                position: 'bottom',
                horizontalAlign: 'left',
              },
            },
          },
        ],
      };
    });
  }

  onReminderApply() {
    this.getAppReminder(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
  }


  // prospect app
  getAppProspect(month: string, year: number, representative: string) {
    this._StatisticsService.getSchoolPerEmp(month, year, representative).subscribe((data) => {
      console.log(data);

      const stagesArr = data['message'] as [];
      const stage: [] = [];
      const number: [] = [];
      stagesArr.forEach((statges) => {
        stage.push(statges['name']);
        number.push(statges['value']);
      });

      this.appProspectChart = {
        series: number,
        chart: {
          width: 450,
          type: 'donut',
        },
        colors: [
          '#16294f',
          '#FF5151',
          '#FFD844',
          '#fbe8ea',
          '#FFEA9B',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 500,
            options: {
              chart: {
                width: 500,
              },
              legend: {
                position: 'bottom',
                horizontalAlign: 'right',
              },
            },
          },
        ],
      };
    });
  }

  onProspectApply() {
    this.getAppProspect(this.selectedMonth1, this.selectedYear1, this.selectedRepresentative1);
  }

  // reminder
  onMonthChange(e: any) {
    this.selectedMonth = e.target.value;
  }
  onYearChange(e: any) {
    this.selectedYear = e.target.value;
  }
  onStatusChange(e: any) {
    this.selectedStatus = e.target.value;
  }
  onemployeeChange(e: any) {
    this.selectedRepresentative = e.target.value;
  }


  // prospect
  onMonthChange1(e: any) {
    this.selectedMonth1 = e.target.value;
  }
  onYearChange1(e: any) {
    this.selectedYear1 = e.target.value;
  }

  onemployeeChange1(e: any) {
    this.selectedRepresentative1 = e.target.value;
  }



  memp: any[] = []
  // Monthly app per emplowee

  onemployeemonth(e: any) {
    this.selectmemp = e.target.value;
  }

  onemployeeyear(e: any) {
    this.selectyemp = e.target.value;
  }

  onempApply() {
    this.getMonthlyAppPerEmployee(this.selectmemp, this.selectyemp);
    console.log(this.selectmemp, this.selectyemp);

  }
  getMonthlyAppPerEmployee(month: number, year: number) {
    this._StatisticsService.getMonthlyAppPerEmp(month, year).subscribe((data) => {
      this.memp = data['message']
      console.log(this.memp);

    })
  }
}
