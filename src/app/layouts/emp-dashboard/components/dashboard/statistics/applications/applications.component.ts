import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  appStagesChart: any = {};
  appSchoolChart: any = {};
  appSourcesChart: any = {};
  months: string[] = ['january', 'september'];
  years: number[] = [2022, 2023, 2024];
  selectedMonth: string = '';
  selectedYear: number = 0;

  constructor(private _StatisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.selectedMonth = String(this.months[0]);
    this.selectedYear = Number(this.years[1]);
    this.getAppSchools(this.selectedMonth, this.selectedYear);
    this.getAppStages(this.selectedMonth, this.selectedYear);
    this.getAppSources(this.selectedMonth, this.selectedYear);
  }
  onMonthChange(e: any) {
    this.selectedMonth = e.target.value;
  }
  onYearChange(e: any) {
    this.selectedYear = e.target.value;
  }

  getAppStages(month: string, year: number) {
    this._StatisticsService.getAppStages(month, year).subscribe((data) => {
      const stagesArr = data as [];
      const stage: [] = [];
      const number: [] = [];
      stagesArr.forEach((statges) => {
        stage.push(statges['stage']);
        number.push(statges['number']);
      });

      this.appStagesChart = {
        series: number,
        chart: {
          width: 500,
          type: 'pie',
        },
        colors: [
          '#2c51e1',
          '#16ab01',
          '#ffa500',
          '#ffd700',
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

  getAppSchools(month: string, year: number) {
    this._StatisticsService.getAppSchools(month, year).subscribe((data) => {
      const schoolsArr = data as [];
      const sch: [] = [];
      const number: [] = [];
      schoolsArr.forEach((schools) => {
        sch.push(schools['school']);
        number.push(schools['number']);
      });

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
        colors: ['#6F77F4'],
        yaxis: {
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            formatter: function (val: any) {
              return val;
            },
          },
        },
      };
    });
  }

  getAppSources(month: string, year: number) {
    this._StatisticsService.getAppSources(month, year).subscribe((data) => {
      const sourcesData: [] = data as [];
      const sourceName: string[] = [];
      const sourceNumbers: number[] = [];
      for (const sources of sourcesData) {
        sourceName.push(sources['source']);
        sourceNumbers.push(sources['number']);
      }
      sourceName.shift();
      sourceNumbers.pop();

      this.appSourcesChart = {
        series: sourceNumbers,
        chart: {
          type: 'donut',
        },
        colors: [
          '#2c51e1',
          '#16ab01',
          '#ffa500',
          '#ffd700',
          '#cc33aa',
          '#ff005a',
          '#7ab1a5',
          '#2eb4ec',
          '#24778c',
          '#aa7640',
          '#248cee',
          '#762344',
        ],

        labels: sourceName,
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

  onSourcesApply() {
    this.getAppSources(this.selectedMonth, this.selectedYear);
  }

  onStagesApply() {
    this.getAppStages(this.selectedMonth, this.selectedYear);
  }
}
