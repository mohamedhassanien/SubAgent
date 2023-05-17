import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Month {
  value: number;
  viewValue: number;
}

interface Year {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  appStagesEmpsChart: any = {};
  stageData: any[] = [];
  empStagesData: any[] = [];
  filterStageEmpsArr: any[] = [];
  selectedMonth: number = 0;
  selectedYear: number = 0;

  constructor(private _StatisticsService: StatisticsService) {}

  months: Month[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
    { value: 7, viewValue: 7 },
    { value: 8, viewValue: 8 },
    { value: 9, viewValue: 9 },
    { value: 10, viewValue: 10 },
    { value: 11, viewValue: 11 },
    { value: 12, viewValue: 12 },
  ];

  years: Year[] = [
    { value: 2022, viewValue: 2022 },
    { value: 2023, viewValue: 2023 },
    { value: 2024, viewValue: 2024 },
  ];

  changeMonth(event: Event) {
    this.selectedMonth = Number((event.target as HTMLSelectElement).value);
  }

  getAppStageEmps(month: number, year: number) {
    return this._StatisticsService
      .getAppStageEmps(month, year)
      .subscribe((data: any) => {
        let res = data.map(
          (val: { [s: string]: unknown } | ArrayLike<unknown>) => {
            let emps = Object.values(val);
            return {
              // Return the new object structure
              x: emps[0],
              y: emps[1],
              goals: [
                {
                  name: 'Target',
                  value: emps[2],
                  strokeWidth: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0',
                },
              ],
            };
          }
        );
        this.appStagesEmpsChart = {
          series: [
            {
              name: 'Score',
              data: res,
            },
          ],
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          colors: ['#9185e0'],
          dataLabels: {
            formatter: function (
              val: any,
              opt: {
                w: {
                  config: {
                    series: {
                      [x: string]: { data: { [x: string]: { goals: any } } };
                    };
                  };
                };
                seriesIndex: string | number;
                dataPointIndex: string | number;
              }
            ) {
              const goals =
                opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                  .goals;
              if (goals && goals.length) {
                return `${val} / ${goals[0].value}`;
              }
              return val;
            },
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Score', 'Target'],
            markers: {
              fillColors: ['#9185e0', '#775DD0'],
            },
          },
        };
      });
  }

  changeYear(event: Event) {
    this.selectedYear = Number((event.target as HTMLSelectElement).value);
  }

  ngOnInit(): void {
    this.selectedMonth = this.months[0].value;
    this.selectedYear = this.years[1].value;
    this.getAppStageEmps(this.selectedMonth, this.selectedYear);
  }

  onApply() {
    this.getAppStageEmps(this.selectedMonth, this.selectedYear);
  }
}
