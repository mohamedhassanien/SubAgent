import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';

@Component({
  selector: 'app-dashbordprofile',
  templateUrl: './dashbordprofile.component.html',
  styleUrls: ['./dashbordprofile.component.scss']
})
export class DashbordprofileComponent implements OnInit {
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
  userName: string = ''

  monthlyApp: number = 0
  individualPrime: number = 0
  anualPrime: number = 0
  constructor(
    private _StatisticsService: StatisticsService,
    private _EmployeeService: EmployeeService,
    private _ModalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.userName = String(localStorage.getItem('userName'))

    this.getAppProspect('january', 2023, this.userName);
    this.getTarget(this.userName)
    this.getNumbersProfile()

    //get representatives name
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.representatives = data;
    });

  }

  getTarget(e: string) {
    this._StatisticsService.gettarget(e).subscribe((data) => {
      console.log(data['message']);
      this.monthlyApp = data['message'][0].width
      this.individualPrime = data['message'][1].width
      this.anualPrime = data['message'][2].width

    })
  }

  // prospect app
  getAppProspect(month: string, year: number, userNamr: string) {
    this._StatisticsService.getAppPerEmp(month, year, userNamr).subscribe((data) => {
      console.log(data['message']);

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
          height: 800,
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
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          labels: {
            position: 'top',

          }
        },
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
                labels: {
                  position: 'bottom',

                }
              },
            },
          },
        ],
      };
    });
  }
  onMonthChange1(e: any) {
    this.selectedMonth1 = e.target.value;
  }
  onYearChange1(e: any) {
    this.selectedYear1 = e.target.value;
  }
  onProspectApply() {
    this.getAppProspect(this.selectedMonth1, this.selectedYear1, this.userName);
  }

  applicationsNumer: number = 0
  ProspectNumber: number = 0
  // get profile numbers
  getNumbersProfile() {
    this._EmployeeService.getProfileNunmbers(this.userName).subscribe((data) => {
      this.applicationsNumer = data['message'][0].value
      this.ProspectNumber = data['message'][0].value
    })
  }


}