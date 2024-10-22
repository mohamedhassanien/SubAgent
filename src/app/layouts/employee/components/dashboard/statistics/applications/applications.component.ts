import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  appStagesChart: any = {};
  appSchoolChart: any = {};
  appSourcesChart: any = {};
  appDepositChart: any = {};
  appConvertChart: any = {};
  months: string[] = ['January', 'September'];
  monthsNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  currentyear = new Date().getFullYear();
  years: number[] = [this.currentyear - 2, this.currentyear - 1, this.currentyear];
  selectedMonth: string = 'September';
  selectedMonthNum!: number;
  selectedYear: string = this.currentyear.toString();
  selectedRepresentative: string = 'All';
  representatives: any[] = [];
  progressWidth: number = 70
  progressCount: number = 70;
  selectedSchoolName: string = '';
  schools: any[] = [];


  topProgramsInApplications: any = {};
  topProgramsInProspect: any = {};
  topSchoolInApplications: any = {};
  topSchoolInProspect: any = {};
  topPreviousSchoolInApplication: any = {};
  topPreviousInProspect: any = {};
  topStatusInApplications: any = {};
  topStatusInProspects: any = {};

  conversionRate: any = {};
  preSchoolInProspect: any = {};
  preSchoolInApplication: any = {};
  appRadar: any = {};
  sourceApp: any = {};
  userName = localStorage.getItem('userName');

  cardsMonth = 'All';
  cardsYear = 'All';

  // Prospects Pipeline
  PPMonth = 'All';
  PPYear = 'All'
  PPRep = 'All'

  // Applications pipeline
  APMonth = 'All';
  APYear = 'All'
  APRep = 'All'

  // Top schools in Prospects
  TPMonth = 'All';
  TPYear = 'All'
  TPRep = 'All'

  // Application Statistics
  ASMonth = 'All';
  ASYear = 'All'
  ASRep = 'All'

  // Top School in applications
  TAMonth = 'All';
  TAYear = 'All'
  TARep = 'All'

  // Top Source of Applications
  TSAMonth = 'All';
  TSAYear = 'All'
  TSARep = 'All'

  // Top Previous School in Application
  TPAMonth = 'All';
  TPAYear = 'All'
  TPARep = 'All'

  constructor(
    private _StatisticsService: StatisticsService,
    private _EmployeeService: EmployeeService
  ) {




  }

  ngOnInit(): void {

    this.selectedMonthNum = Number(this.monthsNum[2]);
    this.getAppSchools(this.selectedMonth, this.selectedYear);
    this.getAppStages(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    this.getProspectStatus(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    // this.getAppDeposit(this.selectedMonthNum, this.selectedYear, 'Nicolas');
    // this.getAppConvert(this.selectedMonthNum, this.selectedYear, 'Nicolas');
    this.getAllData();
    //get representatives name
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.representatives = data['data'];
    });
    this._EmployeeService.getSchoolsNames().subscribe((res: any) => {
      const { data, status } = res[0];
      this.schools = data;
      console.log(data);
    });

    // this.topProgramsInApplicationsAction(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    // this.topProgramsInProspectAction(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    // this.topSchoolInApplicationsAction(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    this.topSchoolInProspectAction(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    // // this.topPreviousSchoolInApplicationAction(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    // // this.topPreviousInProspectAction(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    // this.topStatusInApplicationsAction(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    // this.topStatusInProspectsAction(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    // this.conversionRate(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    this.getAppRadar(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    this.getSourceApp(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    this.getTopPreSchoolApp(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    this.getTopSchoolApp(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
    this.getTopPreSchoolProspect(this.selectedMonth, this.selectedYear, this.selectedRepresentative);

  }

  // Prospects Pipeline
  onMonthChange(e: any) {
    this.PPMonth = e.target.value;
  }
  onYearChange(e: any) {
    this.PPYear = e.target.value;
  }
  onemployeeChange(e: any) {
    this.PPRep = e.target.value;
  }

  // Applications pipeline
  onAPMonthChange(e: any) {
    this.APMonth = e.target.value;
  }
  onAPYearChange(e: any) {
    this.APYear = e.target.value;
  }
  onAPemployeeChange(e: any) {
    this.APRep = e.target.value;
  }

  // Top schools in Prospects
  onTPMonthChange(e: any) {
    this.TPMonth = e.target.value;
  }
  onTPYearChange(e: any) {
    this.TPYear = e.target.value;
  }
  onTPemployeeChange(e: any) {
    this.TPRep = e.target.value;
  }

  // Application Statistics
  onASMonthChange(e: any) {
    this.ASMonth = e.target.value;
  }
  onASYearChange(e: any) {
    this.ASYear = e.target.value;
  }
  onASemployeeChange(e: any) {
    this.ASRep = e.target.value;
  }

  // Top School in applications
  onTAMonthChange(e: any) {
    this.TAMonth = e.target.value;
  }
  onTAYearChange(e: any) {
    this.TAYear = e.target.value;
  }
  onTAemployeeChange(e: any) {
    this.TARep = e.target.value;
  }

  // Top Source of Applications
  onTSAMonthChange(e: any) {
    this.TSAMonth = e.target.value;
  }
  onTSAYearChange(e: any) {
    this.TSAYear = e.target.value;
  }
  onTSAemployeeChange(e: any) {
    this.TSARep = e.target.value;
  }

  // Top Previous School in Application
  onTPAMonthChange(e: any) {
    this.TPAMonth = e.target.value;
  }
  onTPAYearChange(e: any) {
    this.TPAYear = e.target.value;
  }
  onTPAemployeeChange(e: any) {
    this.TPARep = e.target.value;
  }


  onMonthNumChange(e: any) {
    this.selectedMonthNum = e.target.value;
  }
  onSchoolNameChange(e: any) {
    this.selectedSchoolName = e.target.value;
  }
  onApplicationRadar() {
    this.getAppRadar(this.ASMonth, this.ASYear, this.ASRep);
  }

  onSourceApplication() {
    this.getSourceApp(this.TSAMonth, this.TSAYear, this.TSARep);
  }

  TotalApps = 0;
  getAppStages(month: string, year: string, empid: string) {
    this._StatisticsService.getAppStages(month, year, empid).subscribe((data) => {
      console.log(data);

      const stagesArr = data as [];
      const stage: [] = [];
      const number: [] = [];
      stagesArr.forEach((statges) => {
        stage.push(statges['stage']);
        number.push(statges['number']);
      });
      this.TotalApps = 0;
      for (let val of number) {
        this.TotalApps = this.TotalApps + val;
      }
      console.log('total apps: ' + this.TotalApps);
      this.appStagesChart = {
        series: number,
        chart: {
          width: 450,
          type: 'donut',
        },
        colors: [
          '#16294f',
          '#FF5151',
          '#FFD844',
          '#FD9595',
          '#fbe8ea',
          '#CE7E00',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 430,
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

  getTopSchoolApp(month: string, year: string, empid: string) {
    this._StatisticsService.getTopAppSchools(month, year, empid).subscribe((data) => {
      const stage = Object.keys(data);
      const number = Object.values(data);

      this.topSchoolInApplications = {
        series: number,
        chart: {
          width: 450,
          type: 'pie',
        },
        colors: [
          // '#2c51e1',
          // '#16ab01',
          // '#ffa500',
          '#ffd700',
          // '#cc33aa',
          // '#ff005a',
          '#762344',
          '#7ab1a5',
          '#2eb4ec',
          '#24778c',
          '#aa7640',
          '#248cee',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 430,
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

  getTopPreSchoolProspect(month: string, year: string, empid: string) {
    this._StatisticsService.getTopPreSchoolProspect(month, year, empid).subscribe((data) => {
      const stage = Object.keys(data);
      const number = Object.values(data);

      this.topPreviousInProspect = {
        series: number,
        chart: {
          width: 450,
          type: 'pie',
        },
        colors: [
          // '#2c51e1',
          // '#16ab01',
          // '#ffa500',
          '#ffd700',
          // '#cc33aa',
          // '#ff005a',
          '#762344',
          '#7ab1a5',
          '#2eb4ec',
          '#24778c',
          '#aa7640',
          '#248cee',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 430,
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

  getTopPreSchoolApp(month: string, year: string, empid: string) {
    this._StatisticsService.getTopPreSchoolApp(month, year, empid).subscribe((data) => {
      const stage = Object.keys(data);
      const number = Object.values(data);

      this.topPreviousSchoolInApplication = {
        series: number,
        chart: {
          width: 450,
          type: 'pie',
        },
        colors: [
          // '#2c51e1',
          // '#16ab01',
          // '#ffa500',
          '#ffd700',
          // '#cc33aa',
          // '#ff005a',
          '#762344',
          '#7ab1a5',
          '#2eb4ec',
          '#24778c',
          '#aa7640',
          '#248cee',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 430,
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

  getConversionRate(month: string, year: string, empid: string) {
    this._StatisticsService.getConversionRate(month, year, empid).subscribe((data) => {
      const stage = Object.keys(data);
      const number = Object.values(data);

      this.conversionRate = {
        series: number,
        chart: {
          width: 450,
          type: 'pie',
        },
        colors: [
          // '#2c51e1',
          // '#16ab01',
          // '#ffa500',
          '#ffd700',
          // '#cc33aa',
          // '#ff005a',
          '#762344',
          '#7ab1a5',
          '#2eb4ec',
          '#24778c',
          '#aa7640',
          '#248cee',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 430,
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


  getPreviousSchoolProspect(month: string, year: string, schoolname: string) {
    this._StatisticsService.getPreSchoolProspect(month, year, schoolname).subscribe((data) => {
      const stage = Object.keys(data);
      const number = Object.values(data);

      this.preSchoolInProspect = {
        series: number,
        chart: {
          width: 450,
          type: 'pie',
        },
        colors: [
          // '#2c51e1',
          // '#16ab01',
          // '#ffa500',
          '#ffd700',
          // '#cc33aa',
          // '#ff005a',
          '#762344',
          '#7ab1a5',
          '#2eb4ec',
          '#24778c',
          '#aa7640',
          '#248cee',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 430,
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


  getPreviousSchoolApplication(month: string, year: string, schoolname: string) {
    this._StatisticsService.getPreSchoolApplication(month, year, schoolname).subscribe((data) => {
      const stage = Object.keys(data);
      const number = Object.values(data);

      this.preSchoolInApplication = {
        series: number,
        chart: {
          width: 450,
          type: 'pie',
        },
        colors: [
          // '#2c51e1',
          // '#16ab01',
          // '#ffa500',
          '#ffd700',
          // '#cc33aa',
          // '#ff005a',
          '#762344',
          '#7ab1a5',
          '#2eb4ec',
          '#24778c',
          '#aa7640',
          '#248cee',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 430,
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


  getAppDeposit(month: number, year: string, employee: string) {
    this._StatisticsService
      .getAppDeposit(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.appDepositChart = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            // '#2c51e1',
            // '#16ab01',
            // '#ffa500',
            '#ffd700',
            // '#cc33aa',
            // '#ff005a',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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

  getAppConvert(month: number, year: string, employee: string) {
    this._StatisticsService
      .getAppConverted(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.appConvertChart = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            // '#2c51e1',
            // '#16ab01',
            // '#ffa500',
            // '#ffd700',
            '#cc33aa',
            '#ff005a',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
            '#762344',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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

  getAppSchools(month: string, year: string) {
    this._StatisticsService.getAppSchools(month, year).subscribe((data) => {
      const schoolsArr = data as [];
      const sch: [] = [];
      const number: [] = [];
      schoolsArr.forEach((schools) => {
        sch.push(schools['school']);
        number.push(schools['number']);
      });
      console.log(sch);
      console.log(number);

      this.appSchoolChart = {
        series: [
          {
            name: 'Score',
            data: number.length > 15 ? number.slice(0, 15) : number,
          },
        ],
        chart: {
          height: 450,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            dataLabels: false,
            borderRadius: 12,
          },
        },

        xaxis: {
          categories: sch.length > 15 ? sch.slice(0, 15) : sch,
          position: 'bottom',
          // labels: {
          //   offsetY: 18,
          // },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
        },
        colors: ['#16294f'],
        yaxis: {
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val;
            },
          },
        },
        // title: {
        //   text: 'Monthly Inflation in Argentina, 2002',
        //   floating: 0,
        //   offsetY: 320,
        //   align: 'center',
        //   style: {
        //     color: '#444',
        //   },
        // },
      };
    });
  }
  totalStudents = 0;
  getProspectStatus(month: string, year: string, empid: string) {
    this._StatisticsService.getProspectstatus(month, year, empid).subscribe((data) => {
      const status: [] = data as [];
      const statusName: string[] = [];
      const statusNumbers: number[] = [];
      for (const sources of status) {
        statusName.push(sources['stage']);
        statusNumbers.push(sources['value']);
      }
      this.totalStudents = 0;
      for (let val of statusNumbers) {
        this.totalStudents = this.totalStudents + val;
      }
      statusName.shift();
      statusNumbers.pop();

      this.appSourcesChart = {
        series: statusNumbers,
        chart: {
          width: 450,
          type: 'donut',
        },
        colors: [
          '#16294f',
          '#FF5151',
          '#FFD844',
          '#fbe8ea',
          '#FD9595',
          '#fbe8ea',
          '#fbe8ea',
        ],

        labels: statusName,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };
    });
  }

  onSchlsApply() {
    this.getAppSchools(this.selectedMonth, this.selectedYear);
  }

  onProspectStatusApply() {
    this.getProspectStatus(this.PPMonth, this.PPYear, this.PPRep);
  }
  onProspectSchoolApply() {
    this.topSchoolInProspectAction(this.TPMonth, this.TPYear, this.TPRep);
  }

  onStagesApply() {
    this.getAppStages(this.APMonth, this.APYear, this.APRep);
  }

  onTopSchoolsApp() {
    this.getTopSchoolApp(this.TAMonth, this.TAYear, this.TARep);
  }

  onTopPreSchoolProspect() {
    this.getTopPreSchoolProspect(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
  }

  onTopPreSchoolApp() {
    this.getTopPreSchoolApp(this.TPAMonth, this.TPAYear, this.TPARep);
  }

  onConversionRate() {
    this.getConversionRate(this.selectedMonth, this.selectedYear, this.selectedRepresentative);
  }

  onPreviouseSchoolProspect() {
    this.getPreviousSchoolProspect(this.selectedMonth, this.selectedYear, this.selectedSchoolName);
  }

  onPreviouseSchoolApplication() {
    this.getPreviousSchoolApplication(this.selectedMonth, this.selectedYear, this.selectedSchoolName);
  }

  onDepositApply() {
    this.getAppDeposit(
      this.selectedMonthNum,
      this.selectedYear,
      this.selectedRepresentative
    );
  }

  onConvertApply() {
    this.getAppConvert(
      this.selectedMonthNum,
      this.selectedYear,
      this.selectedRepresentative
    );
  }

  acceptedValue: number = 0
  rejectedValue: number = 0
  totalvalue: number = 0

  acceptedWidth: number = 0
  rejectedWidth: number = 0
  totalWidth: number = 0

  // nembers in cards
  getAllData() {
    this._EmployeeService.getCardData(this.cardsMonth, this.cardsYear).subscribe((data) => {
      this.totalvalue = data['message'][2].value
      this.acceptedValue = data['message'][1].value
      this.rejectedValue = data['message'][0].value

      this.totalWidth = data['message'][2].width
      this.acceptedWidth = data['message'][1].width
      this.rejectedWidth = data['message'][0].width

    })
  }


  topProgramsInApplicationsAction(month: any, year: string, employee: string) {
    this._StatisticsService
      .topProgramsInApplicationsApi(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.topProgramsInApplications = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            '#ffd700',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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
  topProgramsInProspectAction(month: any, year: string, employee: string) {
    this._StatisticsService
      .topProgramsInProspectApi(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.topProgramsInProspect = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            '#ffd700',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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
  topSchoolInApplicationsAction(month: any, year: string, employee: string) {
    this._StatisticsService
      .topSchoolInApplicationsApi(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.topSchoolInApplications = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            '#ffd700',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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
  topSchoolInProspectAction(month: any, year: string, employee: string) {
    this._StatisticsService
      .topSchoolInApplicationsApi(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.topSchoolInProspect = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            '#ffd700',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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
  topPreviousSchoolInApplicationAction(month: any, year: string, employee: string) {
    this._StatisticsService
      .topPreviousSchoolInApplicationApi(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.topPreviousSchoolInApplication = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            '#ffd700',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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
  topPreviousInProspectAction(month: any, year: string, employee: string) {
    this._StatisticsService
      .topPreviousInProspectApi(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.topPreviousInProspect = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            '#ffd700',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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
  topStatusInApplicationsAction(month: any, year: string, employee: string) {
    this._StatisticsService
      .topStatusInApplicationsApi(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.topStatusInApplications = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            '#ffd700',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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
  topStatusInProspectsAction(month: any, year: string, employee: string) {
    this._StatisticsService
      .topStatusInProspectsApi(month, year, employee)
      .subscribe((data) => {
        const stage = Object.keys(data);
        const number = Object.values(data);

        this.topStatusInProspects = {
          series: number,
          chart: {
            width: 450,
            type: 'pie',
          },
          colors: [
            '#ffd700',
            '#762344',
            '#7ab1a5',
            '#2eb4ec',
            '#24778c',
            '#aa7640',
            '#248cee',
          ],

          labels: stage,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 430,
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

  getAppRadar(month: string, year: string, empid: string) {


    this._StatisticsService.getAppRadar(month, year, empid).subscribe((data) => {
      const stage = Object.keys(data);
      const number = Object.values(data);
      this.appRadar = {
        series: [
          {
            name: "Application",
            data: number
          }
        ],
        chart: {
          height: 350,
          type: "radar"
        },
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          radar: {
            size: 140,
            polygons: {
              strokeColor: "#e9e9e9",
              fill: {
                colors: ["#ebebeb", "#fff"]
              }
            }
          }
        },
        colors: ["#FF4560"],
        markers: {
          size: 4,
          colors: ["#fff"],
          strokeColors: ["#FF4560"],
          strokeWidth: 2
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            }
          }
        },
        xaxis: {
          categories: stage
        },
        yaxis: {
          tickAmount: 7,
          labels: {
            formatter: function (val, i) {
              if (i % 2 === 0) {
                return val;
              } else {
                return "";
              }
            }
          }
        }
      };
    });
  }

  getSourceApp(month: string, year: string, empid: string) {
    this._StatisticsService.getSourceApplication(month, year, empid).subscribe((data) => {
      const stage = Object.keys(data);
      const number = Object.values(data);

      this.sourceApp = {
        series: number,
        chart: {
          width: 500,
          type: 'pie',
        },
        colors: [
          // '#2c51e1',
          // '#16ab01',
          // '#ffa500',
          '#ffd700',
          // '#cc33aa',
          // '#ff005a',
          '#762344',
          '#7ab1a5',
          '#2eb4ec',
          '#24778c',
          '#aa7640',
          '#248cee',
        ],

        labels: stage,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 430,
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


  oncardsMonth(e: any) {
    this.cardsMonth = e.target.value;
    this.getAllData();
  }
  oncardsYear(e: any) {
    this.cardsYear = e.target.value;
    this.getAllData();
  }
}

