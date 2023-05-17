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
  schoolData: any = [];
  // public natlyLeadsChart!: natlyLeadsChartOptions;
  // public natlyProgChart!: natlyProgChartOptions;
  // public leadsChart!: leadsChartOptions;
  natlySchChartOptions: any = {};
  natlyUserChartOptions: any = {};
  natlyProgsChartOptions: any = {};

  title: any = '';
  series: any[] = [];
  numbers: [] = [];
  cities: [] = [];
  filterSchoolArr: any[] = [];
  selectedMonth: string = '';
  selectedYear: number = 0;
  months: string[] = ['january', 'september'];
  years: number[] = [2022, 2023, 2024];

  constructor(private _StatisticsService: StatisticsService) {
    this.getNatlyUserChart();
    this.getNatlyProgChart();
  }

  ngOnInit(): void {
    this.selectedMonth = String(this.months[0]);
    this.selectedYear = Number(this.years[1]);
    console.log(this.selectedMonth, this.selectedYear);

    this.getNatlySchChart(this.selectedMonth, this.selectedYear);
  }

  onMonthChange(e: any) {
    this.selectedMonth = e.target.value;
  }
  onYearChange(e: any) {
    this.selectedYear = e.target.value;
  }

  getNatlyUserChart() {
    let topNatlysData: any[] = [];
    let topNatlyCities: any;
    let topNatlyNumbers: any;

    this._StatisticsService.getTopNationsUsers().subscribe((data) => {
      topNatlysData = data as [];
      let size = 20;

      topNatlyCities = topNatlysData
        .slice(0, size)
        .map((cities: any) => cities.city);
      topNatlyNumbers = topNatlysData
        .slice(0, size)
        .map((numbers: any) => numbers.number);

      this.natlyUserChartOptions = {
        series: [
          {
            name: '2020',
            type: 'column',
            data: topNatlyNumbers,
          },
          {
            name: '2021',
            type: 'area',
            data: topNatlyNumbers,
          },
          {
            name: '2022',
            type: 'line',
            data: topNatlyNumbers,
          },
        ],
        legend: {
          show: false,
        },

        chart: {
          height: 350,
          type: 'line',
          stacked: false,
        },
        stroke: {
          width: [0, 0.7, 5],
          curve: 'smooth',
        },
        plotOptions: {
          bar: {
            columnWidth: '40%',
          },
        },
        colors: ['#6F77F4', '#6F77F4', '#F08E43'],

        fill: {
          opacity: [0.6, 0.2, 0.5],

          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: topNatlyCities,
        markers: {
          size: 0,
        },
        xaxis: {
          type: topNatlyCities,
        },
        yaxis: {
          title: {
            text: 'Points',
          },
          min: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y: number) {
              if (typeof y !== 'undefined') {
                return y.toFixed(0) + ' points';
              }
              return y;
            },
          },
        },
      };
    });
  }

  getNatlySchChart(month: string, year: number) {
    let schArr: any = [];
    this._StatisticsService
      .getTopNationsSchool(month, year)
      .subscribe((data: any) => {
        const arr = Object.entries(data);
        arr.map((schools: any) => {
          const numbers: any = [];
          schools[1].map((school: { number: any; }) => {
            numbers.push(school.number);
          });
          const cities: any = [];
          schools[1].map((school: { city: any; }) => {
            cities.push(school.city);
          });

          schArr.push({
            schoolName: schools[0],
            numbers: numbers,
            cities: cities,
          });

          this.schoolData = schArr;
        });

        this.natlySchChartOptions = {
          series: [
            {
              name: 'Score',
              data:
                this.schoolData[0].numbers.length > 20
                  ? this.schoolData[0].numbers.slice(0, 20)
                  : this.schoolData[0].numbers,
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
          },
          colors: ['#6F77F4'],

          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories:
              this.schoolData[0].cities.length > 20
                ? this.schoolData[0].cities.slice(0, 20)
                : this.schoolData[0].cities,
          },
        };
      });
  }

  changeData(event: any) {
    const newArr: any[] = [];
    this._StatisticsService
      .getTopNationsSchool(this.selectedMonth, this.selectedYear)
      .subscribe((data) => {
        console.log(data);
        const arr = Object.entries(data);
        arr.map((schools: any) => {
          const numbers: any = [];
          schools[1].map((school: { number: any }) => {
            numbers.push(school.number);
          });
          const cities: any = [];
          schools[1].map((school: { city: any }) => {
            cities.push(school.city);
          });

          newArr.push({
            schoolName: schools[0],
            numbers: numbers,
            cities: cities,
          });
        });

        this.filterSchoolArr = newArr.filter((obj: { schoolName: any }) => {
          return obj.schoolName === event.target.value;
        });

        this.natlySchChartOptions = {
          series: [
            {
              name: 'Score',
              data:
                this.filterSchoolArr[0].numbers.length > 20
                  ? this.filterSchoolArr[0].numbers.slice(0, 20)
                  : this.filterSchoolArr[0].numbers,
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
          },
          colors: ['#6F77F4'],

          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories:
              this.filterSchoolArr[0].cities.length > 20
                ? this.filterSchoolArr[0].cities.slice(0, 20)
                : this.filterSchoolArr[0].cities,
          },
        };
      });
  }

  getNatlyProgChart() {
    this.natlyProgsChartOptions = {
      series: [
        {
          name: 'PRODUCT A',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'PRODUCT D',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'category',
        categories: [
          '01/2011',
          '02/2011',
          '03/2011',
          '04/2011',
          '05/2011',
          '06/2011',
        ],
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };
  }

  onApply() {
    this.getNatlySchChart(this.selectedMonth, this.selectedYear);
  }
}
