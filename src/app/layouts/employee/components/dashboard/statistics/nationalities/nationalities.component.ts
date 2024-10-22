import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StatisticsService } from './../../../../../../shared/services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';

interface Month {
  value: number;
  viewValue: number;
}

interface Year {
  value: number;
  viewValue: number;
}
@Component({
  selector: 'app-nationalities',
  templateUrl: './nationalities.component.html',
  styleUrls: ['./nationalities.component.scss'],
})
export class NationalitiesComponent implements OnInit {
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

  constructor(
    private _StatisticsService: StatisticsService,
    private _EmployeeService: EmployeeService
  ) { }

  ngOnInit(): void {

    //get representatives name
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.representatives = data;
    });

    // reminders
    // this.onReminderApply()
    // this.selectedMonth = String(this.months[0]);
    // this.selectedYear = Number(this.years[1]);
    // this.selectedStatus = String(this.Status[0])
    // this.selectedRepresentative = String(this.representatives[0])

    // prospect
    // this.onProspectApply()
  }

  // reminder app
  getAppReminder(month: string, year: number, status: string, representative: string) {
    this._StatisticsService.getReminderStatus(month, year, status, representative).subscribe((data) => {
      console.log(data);

      const stagesArr = data as [];
      const stage: [] = [];
      const number: [] = [];
      stagesArr.forEach((statges) => {
        stage.push(statges['Name']);
        number.push(statges['Number']);
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
    this.getAppReminder(this.selectedMonth, this.selectedYear, this.selectedStatus, this.selectedRepresentative);
  }


  // prospect app
  getAppProspect(month: string, year: number, representative: string) {
    this._StatisticsService.getProspectStatus(month, year, representative).subscribe((data) => {
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



















  // getAppDeposit(month: number, year: number, employee: string) {
  //   this._StatisticsService
  //     .getAppDeposit(month, year, employee)
  //     .subscribe((data) => {
  //       const stage = Object.keys(data);
  //       const number = Object.values(data);

  //       this.appDepositChart = {
  //         series: number,
  //         chart: {
  //           width: 450,
  //           type: 'pie',
  //         },
  //         colors: [
  //           // '#2c51e1',
  //           // '#16ab01',
  //           // '#ffa500',
  //           '#ffd700',
  //           // '#cc33aa',
  //           // '#ff005a',
  //           '#762344',
  //           '#7ab1a5',
  //           '#2eb4ec',
  //           '#24778c',
  //           '#aa7640',
  //           '#248cee',
  //         ],

  //         labels: stage,
  //         responsive: [
  //           {
  //             breakpoint: 480,
  //             options: {
  //               chart: {
  //                 width: 430,
  //               },
  //               legend: {
  //                 position: 'bottom',
  //                 horizontalAlign: 'left',
  //               },
  //             },
  //           },
  //         ],
  //       };
  //     });
  // }

  // getAppConvert(month: number, year: number, employee: string) {
  //   this._StatisticsService
  //     .getAppConverted(month, year, employee)
  //     .subscribe((data) => {
  //       const stage = Object.keys(data);
  //       const number = Object.values(data);

  //       this.appConvertChart = {
  //         series: number,
  //         chart: {
  //           width: 450,
  //           type: 'pie',
  //         },
  //         colors: [
  //           // '#2c51e1',
  //           // '#16ab01',
  //           // '#ffa500',
  //           // '#ffd700',
  //           '#cc33aa',
  //           '#ff005a',
  //           '#7ab1a5',
  //           '#2eb4ec',
  //           '#24778c',
  //           '#aa7640',
  //           '#248cee',
  //           '#762344',
  //         ],

  //         labels: stage,
  //         responsive: [
  //           {
  //             breakpoint: 480,
  //             options: {
  //               chart: {
  //                 width: 430,
  //               },
  //               legend: {
  //                 position: 'bottom',
  //                 horizontalAlign: 'left',
  //               },
  //             },
  //           },
  //         ],
  //       };
  //     });
  // }

  // getAppSchools(month: string, year: number) {
  //   this._StatisticsService.getAppSchools(month, year).subscribe((data) => {
  //     const schoolsArr = data as [];
  //     const sch: [] = [];
  //     const number: [] = [];
  //     schoolsArr.forEach((schools) => {
  //       sch.push(schools['school']);
  //       number.push(schools['number']);
  //     });
  //     console.log(sch);
  //     console.log(number);

  //     this.appSchoolChart = {
  //       series: [
  //         {
  //           name: 'Score',
  //           data: number.length > 15 ? number.slice(0, 15) : number,
  //         },
  //       ],
  //       chart: {
  //         height: 450,
  //         type: 'bar',
  //       },
  //       plotOptions: {
  //         bar: {
  //           dataLabels: false,
  //           borderRadius: 12,
  //         },
  //       },

  //       xaxis: {
  //         categories: sch.length > 15 ? sch.slice(0, 15) : sch,
  //         position: 'bottom',
  //         // labels: {
  //         //   offsetY: 18,
  //         // },
  //         axisBorder: {
  //           show: false,
  //         },
  //         axisTicks: {
  //           show: false,
  //         },
  //         crosshairs: {
  //           fill: {
  //             type: 'gradient',
  //             gradient: {
  //               colorFrom: '#D8E3F0',
  //               colorTo: '#BED1E6',
  //               stops: [0, 100],
  //               opacityFrom: 0.4,
  //               opacityTo: 0.5,
  //             },
  //           },
  //         },
  //       },
  //       colors: ['#16294f'],
  //       yaxis: {
  //         axisBorder: {
  //           show: true,
  //         },
  //         axisTicks: {
  //           show: false,
  //         },
  //         labels: {
  //           show: true,
  //           formatter: function (val) {
  //             return val;
  //           },
  //         },
  //       },
  //       // title: {
  //       //   text: 'Monthly Inflation in Argentina, 2002',
  //       //   floating: 0,
  //       //   offsetY: 320,
  //       //   align: 'center',
  //       //   style: {
  //       //     color: '#444',
  //       //   },
  //       // },
  //     };
  //   });
  // }

  // getAppSources(month: string, year: number) {
  //   this._StatisticsService.getAppSources(month, year).subscribe((data) => {
  //     console.log(data);

  //     const sourcesData: [] = data as [];
  //     const sourceName: string[] = [];
  //     const sourceNumbers: number[] = [];
  //     for (const sources of sourcesData) {
  //       sourceName.push(sources['source']);
  //       sourceNumbers.push(sources['number']);
  //     }
  //     sourceName.shift();
  //     sourceNumbers.pop();

  //     this.appSourcesChart = {
  //       series: sourceNumbers,
  //       chart: {
  //         type: 'donut',
  //       },
  //       colors: [
  //         '#45BF67',
  //         '#FFD844',
  //         '#FD955B',
  //         '#CA3C3C',
  //       ],

  //       labels: sourceName,
  //       responsive: [
  //         {
  //           breakpoint: 480,
  //           options: {
  //             chart: {
  //               width: 200,
  //               height:200
  //             },
  //             legend: {
  //               position: 'bottom',
  //             },
  //           },
  //         },
  //       ],
  //     };
  //   });
  // }

  // onSchlsApply() {
  //   this.getAppSchools(this.selectedMonth, this.selectedYear);
  // }

  // onSourcesApply() {
  //   this.getAppSources(this.selectedMonth, this.selectedYear);
  // }



  // onDepositApply() {
  //   this.getAppDeposit(
  //     this.selectedMonthNum,
  //     this.selectedYear,
  //     this.selectedRepresentative
  //   );
  // }

  // onConvertApply() {
  //   this.getAppConvert(
  //     this.selectedMonthNum,
  //     this.selectedYear,
  //     this.selectedRepresentative
  //   );
  // }
}
