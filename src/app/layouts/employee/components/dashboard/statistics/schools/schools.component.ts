import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
})
export class SchoolsComponent implements OnInit {
  emps: any[] = [];
  empData: any[] = [];
  filterEmpArr: any[] = [];
  schoolEmpsChart: any = {};
  rejPerSchoolChart: any = {};
  rejSchoolEmp: any = {};
  rejPerSchoolArr: any[] = [];
  filterRejPerSchoolArr: any[] = [];
  rejSchoolNations: any[] = [];
  rejSchoolData: any[] = [];
  months: string[] = ['january', 'september'];
  years: number[] = [2022, 2023, 2024];
  selectedMonth: string = '';
  selectedYear: number = 0;

  constructor(private _StatisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.selectedMonth = String(this.months[0]);
    this.selectedYear = Number(this.years[1]);
    this.getTopSchoolsEmps(this.selectedMonth, this.selectedYear);
    this.rejectionPerSchool(this.selectedMonth, this.selectedYear);
    this.rejectionPerSclEmp(this.selectedMonth, this.selectedYear);
  }

  onMonthChange(e: any) {
    this.selectedMonth = e.target.value;
  }
  onYearChange(e: any) {
    this.selectedYear = e.target.value;
  }

  getTopSchoolsEmps(month: string, year: number) {
    let empArr: any = [];
    this._StatisticsService.getTopSchoolsEmps(month, year).subscribe((data) => {
      const arr = Object.entries(data).slice(0, 30);
      const numbers: any[] = [];
      const schools: any[] = [];
      arr.map((emps: any) => {
        emps[1].map((emp) => {
          numbers.push(emp.number);
        });
        emps[1].map((emp) => {
          schools.push(emp.school);
        });

        empArr.push({
          empName: emps[0],
          numbers: numbers,
          schools: schools,
        });
      });
      this.empData = empArr;
      this.schoolEmpsChart = {
        series: [
          {
            name: 'Score',
            data:
              this.empData[0].numbers.length > 20
                ? this.empData[0].numbers.slice(0, 20)
                : this.empData[0].numbers,
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
        },
        colors: ['#16294f'],

        plotOptions: {},
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories:
            this.empData[0].schools.length > 20
              ? this.empData[0].schools.slice(0, 20)
              : this.empData[0].schools,
        },
      };
    });
  }

  changeEmpData(event: any) {
    const newArr: any[] = [];
    this._StatisticsService
      .getTopSchoolsEmps(this.selectedMonth, this.selectedYear)
      .subscribe((data) => {
        const arr = Object.entries(data);
        let numbers: any[] = [];
        let schools: any[] = [];

        arr.map((emps: any) => {
          emps[1].map((emp) => {
            numbers.push(emp.number);
          });
          emps[1].map((emp) => {
            schools.push(emp.school);
          });

          newArr.push({
            empName: emps[0],
            numbers: numbers,
            schools: schools,
          });
          numbers = [];
          schools = [];
        });
        const filterEmpArr = newArr.filter((obj: any) => {
          return obj.empName === event.target.value;
        });

        this.schoolEmpsChart = {
          series: [
            {
              name: 'Score',
              data:
                filterEmpArr[0].numbers.length > 20
                  ? filterEmpArr[0].numbers.slice(0, 20)
                  : filterEmpArr[0].numbers,
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
          },
          colors: ['#16294f'],

          plotOptions: {},
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories:
              filterEmpArr[0].schools.length > 20
                ? filterEmpArr[0].schools.slice(0, 20)
                : filterEmpArr[0].schools,
          },
        };
      });
  }

  rejectionPerSchool(month: string, year: number) {
    let rejSchArr: any = [];
    this._StatisticsService
      .getRejectionPerSchool(month, year)
      .subscribe((data: any) => {
        const arr = Object.entries(data);
        arr.map((schools: any) => {
          const numbers: any = [];
          schools[1].map((school) => {
            numbers.push(school.number);
          });
          const cities: any = [];
          schools[1].map((school) => {
            cities.push(school.city);
          });

          rejSchArr.push({
            schoolName: schools[0],
            numbers: numbers,
            cities: cities,
          });
          this.rejSchoolData = rejSchArr;
          this.rejPerSchoolChart = {
            series: [
              {
                name: 'Score',
                data: this.rejSchoolData[0].numbers,
              },
            ],
            colors: ['#16294f'],

            chart: {
              type: 'bar',
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val;
              },
              style: {
                fontSize: '12px',
                colors: ['#304758'],
              },
            },
            xaxis: {
              categories: this.rejSchoolData[0].cities,
            },
          };
        });
      });
  }

  changeRejSchoolsData(event: any) {
    const newArr: any[] = [];
    this._StatisticsService
      .getRejectionPerSchool(this.selectedMonth, this.selectedYear)
      .subscribe((data) => {
        const arr = Object.entries(data);

        arr.map((schools: any) => {
          const numbers: any = [];
          schools[1].map((school) => {
            numbers.push(school.number);
          });
          const cities: any = [];
          schools[1].map((school) => {
            cities.push(school.city);
          });

          newArr.push({
            schoolName: schools[0],
            numbers: numbers,
            cities: cities,
          });
        });

        this.filterRejPerSchoolArr = newArr.filter(
          (obj: { schoolName: any }) => {
            return obj.schoolName === event.target.value;
          }
        );

        this.rejPerSchoolChart = {
          series: [
            {
              name: 'Score',
              data: this.filterRejPerSchoolArr[0].numbers,
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
          },
          colors: ['#16294f'],

          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val;
            },
            style: {
              fontSize: '12px',
              colors: ['#304758'],
            },
          },
          xaxis: {
            categories: this.filterRejPerSchoolArr[0].cities,
          },
        };
      });
  }

  rejectionPerSclEmp(month: string, year: number) {
    this._StatisticsService
      .getRejectionPerSchoolEmp(month, year)
      .subscribe((data) => {
        const arr = Object.entries(data);
        const schlName: string[] = [];
        const empName: number[] = [];
        const numbers: number[] = [];
        for (const scl of arr) {
          schlName.push(scl[0]);

          for (const empData of scl[1]) {
            empName.push(empData.emp);
            numbers.push(empData.number);
          }
        }

        this.rejSchoolEmp = {
          series: numbers,
          chart: {
            width: 450,
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
            '#7867ff',
          ],

          labels: empName,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 400,
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

  onTopSchApply() {
    this.getTopSchoolsEmps(this.selectedMonth, this.selectedYear);
  }

  onRejNatiSchApply() {
    this.rejectionPerSchool(this.selectedMonth, this.selectedYear);
  }

  onRejEmpSchApply() {
    this.rejectionPerSclEmp(this.selectedMonth, this.selectedYear);
  }
}
