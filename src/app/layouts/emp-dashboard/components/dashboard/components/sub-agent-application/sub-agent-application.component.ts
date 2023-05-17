import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/shared/models/application';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import Swal from 'sweetalert2';

interface School {
  schoolName: string;
}

interface Program {
  programName: string;
}

@Component({
  selector: '[app-sub-agent-application]',
  templateUrl: './sub-agent-application.component.html',
  styleUrls: ['./sub-agent-application.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubAgentApplicationComponent implements OnInit {
  @Input('application') application!: Application;
  @Input('index') index!: number;

  @Output() refresh = new EventEmitter();

  mainLinkArr: string[] = this._Router.url.split('/');
  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 1];

  schools!: School[];
  programs!: Program[];
  countries!: any[];
  scores: number[] = [1, 2, 3, 4, 5];
  studentStatus: string[] = [
    'Sent To School',
    'Interview Preparation',
    'Accepted',
    'Rejected',
    'Deposit Paid',
    'Visa Ok',
  ];

  employeeName: string = String(localStorage.getItem('name'));

  constructor(
    private _EmployeeService: EmployeeService,
    private _StudentsService: StudentsService,
    private _Router: Router
  ) {
    // To get all schools
    this.getSchools();
    // To get all programs
    this.getPrograms();
    // To get all countries
    this.getCountries();
  }

  ngOnInit(): void {}

  // To refresh students
  refreshApplications() {
    this.refresh.emit();
  }

  // To confirm action
  confirmAction(
    message: string = 'Your work has been saved',
    button: boolean = false
  ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: button,
      timer: 1500,
    });
  }

  // To confirm error
  errorAction(message: string = 'Something went wrong!') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  // To get all schools
  getSchools() {
    this._EmployeeService.getSchoolsNames().subscribe((data: any) => {
      const [{ status, data: schools }] = data;
      this.schools = schools;
    });
  }

  // To get all programs
  getPrograms() {
    this._EmployeeService.getProgramsNames().subscribe((data: any) => {
      const [{ status, data: programs }] = data;
      this.programs = programs;
    });
  }

  // To get all countries
  getCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
    });
  }

  // To go to student profile
  goToProfile(element: any, identifier: string) {
    if (identifier === 'email' && element.readOnly)
      window.location.href = `mailto:${element.value}`;
    else if (identifier === 'phone' && element.readOnly)
      window.location.href = `https://api.whatsapp.com/send?phone=${element.value}`;
  }

  // To get app Date
  getAppDate(date: number) {
    const appDate = new Date(date * 1000);
    return `${appDate.getFullYear()}-${appDate.getMonth() + 1 < 10 ? '0' : ''}${
      appDate.getMonth() + 1
    }-${appDate.getDate() < 10 ? '0' : ''}${appDate.getDate()}`;
  }

  // To get colors of reminders
  getReminders(period: number) {
    if (period < 15) {
      return 'gray';
    } else if (period >= 15 && period < 30) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  // To color bg of seriousness score
  getBGColor(score: number) {
    if (score == 1) return '#ea4335';
    else if (score == 2) return '#fbbc04';
    else if (score == 3) return '#46bdc6';
    else if (score == 4) return '#34a853';
    else if (score == 5) return '#047121';
    else return '#fff';
  }
}
