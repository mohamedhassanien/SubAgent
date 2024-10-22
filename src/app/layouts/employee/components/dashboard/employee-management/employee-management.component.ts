import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
})
export class EmployeeManagementComponent implements OnInit {
  monthsNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [2022, 2023, 2024];
  selectedRepresentative1: string = '';
  EmployeeData: any[] = [];
  selectedMonthNum: number = 0;
  selectedYear: number = 0;
  emptype: number = 2;
  admonth: string = '';
  adyear: string = '';
  ademp: string = '';
  adtarget: any = '';
  adnameemp: string = '';
  ademailemp: string = '';
  targetPage = false;
  datetod = new Date();
  targetData: any[] = [];
  month: number = this.datetod.getMonth() + 1;
  year: any = 2024;
  TotalTargets: any;
  TotalCurrent: any;
  widthtarget: any;


  job_description = [
    'Acquisition',
    'Counselling'
  ];


  employeeNames: [{ Name: string, Username: string , email:string }] = [{ Name: '', Username: '', email: '' }];

  employeeJob = 'Employee Name';
  employeeName = '';
  employeeNumber = '';
  employeeEmail = '';
  employeePassword = '';

  targetValue = '';

  permenantTraget: any[] = [];

  targetTeam!: number;

  articalLink = '';

  username = localStorage.getItem('userName');


  constructor(
    private _StatisticsService: StatisticsService,
    private _EmployeeService: EmployeeService,
    private _ModalService: NgbModal,
    private formBuilder: FormBuilder
  ) {


  }

  ngOnInit(): void {
    this.selectedMonthNum = this.month;
    this.selectedYear = this.year;
    this.FillEmpData();
    this.getEmployees();

  }


  FillEmpData() {
    // this._EmployeeService.getAllTargets(this.selectedMonthNum, this.selectedYear, this.emptype).subscribe((data: any) => {
    //   this.targetData = data.Data;
    //   this.TotalTargets = data.TotalTargets
    //   this.TotalCurrent = data.TotalCurrent
    //   this.widthtarget = data.widthtarget
    //   // this.selectedMonthNum = Number(this.monthsNum[2]);
    //   this.permenantTraget = this.targetData;
    //   console.log(this.targetData);
    // });
    this._EmployeeService.theEmplyee().subscribe(
      (data: any) => {
      this.targetData = data.data;
      this.TotalTargets = data.TotalTargets
      this.TotalCurrent = data.TotalCurrent
      this.widthtarget = data.widthtarget
      // this.selectedMonthNum = Number(this.monthsNum[2]);
      this.permenantTraget = this.targetData;
      console.log(this.targetData);
    });


  }

  FillTargetData(){
    this._EmployeeService.getAllTargets(this.selectedMonthNum, this.selectedYear, this.emptype).subscribe((data: any) => {
      this.targetData = data.Data;
      this.TotalTargets = data.TotalTargets
      this.TotalCurrent = data.TotalCurrent
      this.widthtarget = data.widthtarget
      // this.selectedMonthNum = Number(this.monthsNum[2]);
      this.permenantTraget = this.targetData;
      console.log(this.targetData);
    });
  }
  onMonthNumChange(e: any) {
    this.selectedMonthNum = e.target.value;
    this.FillTargetData();
  }
  onYearChange(e: any) {
    this.selectedYear = e.target.value;
    this.FillTargetData();
  }
  employeeAction() {
    this.FillEmpData();
    this.targetPage = false;
  }

  targetsAction(e: any) {
    this.targetPage = true;
    // if (e.target.value=="Acquisition team") { 
    //   this.emptype=1;
    // } else {
    //   this.emptype=2;

    // }
    this.FillTargetData();
  }

  targetsActionDrop(e: any) {

    if (e.target.value == "Acquisition team") {
      this.emptype = 1;
    } else if (e.target.value == "Counselling team") {
      this.emptype = 2;

    }
    console.log(this.selectedMonthNum)
    if(this.targetPage){
      this.FillTargetData();
    }
    else {
      this.FillEmpData();
    }
  }


  // add target
  onadmonth(e: any) {
    this.admonth = e.target.value;
    console.log('88');
  }
  onadyear(e: any) {
    this.adyear = e.target.value;
  }
  onademp(e: any) {
    this.ademp = e.target.value;
  }
  onadtarget(e: any) {
    this.adtarget = e.target.value;
  }

  clickadtarget() {
    this._StatisticsService
      .addarget(this.admonth, this.adyear, this.ademp, this.targetValue, this.targetTeam)
      .subscribe((data: any) => {
        const {status, message} = data;
        if (status == 201) {
          this.confirmAction(message);
          this.FillTargetData();
        }
        else {
          this.errorAction(message)
        }
      });

    this._ModalService.dismissAll();
  }

  // add emplwyee
  onadname(e: any) {
    this.adnameemp = e.target.value;
  }
  onademail(e: any) {
    this.ademailemp = e.target.value;
  }

  clickedemplyee() {
    this._EmployeeService
      .addNewEmployee(this.employeeName, this.employeeEmail, this.employeeJob, this.employeeNumber, this.employeePassword)
      .subscribe((data: any) => {
        console.log(data);
      });
    this._ModalService.dismissAll();
  }

  // delete emplyee
  DeleteEmplyee(empName: string) {
    this._EmployeeService.deleteEmplyee(empName).subscribe((data) => { });
    this._ModalService.dismissAll();
  }

  closeMOdel() {
    this._ModalService.dismissAll();
  }

  targetForm!: FormGroup;
  openModal(element: any, className: string, size: string, data: any[]) {
    this.targetForm = this.formBuilder.group({
      empName: ["", [Validators.required]],
      targetMonth: ["", [Validators.required]],
      targetYear: ["", [Validators.required]],
      targetVal: ["", [Validators.required]],
      targetTeam: ["", [Validators.required]]
    });
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  employeeForm!: FormGroup;
  openModall(element: any, className: string, size: string, data: any[]) {
    this.employeeForm = this.formBuilder.group({
      employeeName: ["", [Validators.required]],
      employeeNumber: ["", [Validators.required]],
      empEmail: ["", [Validators.required]],
      empPassword: ["", [Validators.required]],
      empTeam: ["", [Validators.required]]
    });
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  openModale(element: any, className: string, size: string, data: any[]) {
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  changeSelection(
    event: Event
  ) {
    this.employeeJob = (<HTMLElement>event.target).innerText;
    // console.log((<HTMLElement> event.target).innerText);

  }


  getEmployees() {
    this._EmployeeService.getAllEmployeeNames()
      .subscribe((data: any) => {
        const res: [{ name, Username, email }] = data;
        // console.log(res);
        this.employeeNames = data;
      });
  }

  getEmp(e: any) {
    if (e.target.value === '') {
      this.FillTargetData();
    }
    else {
      const filterNames: any[] = [];
      for (let i = 0; i < this.permenantTraget.length; i++) {
        if (this.permenantTraget[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
          filterNames.push(this.permenantTraget[i]);
        }
      }
      this.targetData = filterNames;
    }

  }
  setTargetsAction(e: any) {
    if (e.target.value == "Acquisition team") {
      this.targetTeam = 1;
    } else if (e.target.value == "Counselling team") {
      this.targetTeam = 2;

    }
    else {
      this.targetTeam = 3;
    }
  }

  deleteEmp(employee) {
    this._EmployeeService.deleteEmployee(employee).
      subscribe((data: any) => {
        const { status, message } = data;
        if (status == 201) {
          this.confirmAction(message);
        }
        else {
          this.errorAction(message)
        }
      })
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
      timer: 750,
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


  addArtical(){
    this._ModalService.dismissAll();
    this._EmployeeService.addArtical(this.articalLink).
      subscribe((data: any) => {
        const { status, message } = data[0];
        if (status == 201) {
          this.confirmAction(message);
        }
        else {
          this.errorAction(message)
        }
      });
console.log(this.articalLink);
  }

  EditTarget(){
    // console.log('edit target'+data.target)
    var team;
    if (this.editTargetForm.controls['targetTeam'].value == "Acquisition team") {
      team = 1;
    } else if (this.editTargetForm.controls['targetTeam'].value == "Counselling team") {
      team = 2;

    }
    this._EmployeeService.editTarget(this.editTargetForm.controls['targetVal'].value, this.editData.username, this.editTargetForm.controls['targetMonth'].value, this.editTargetForm.controls['targetYear'].value, team).
      subscribe((data: any) => {
        const { status, message } = data;
        if (status == 201) {
          this.confirmAction(message);
        }
        else {
          this.errorAction(message)
        }
      });
  }


  editTargetForm!: FormGroup;
  editData :any;
  openEditTarget(element: any, className: string, size: string, data: any) {
    this.editData = data;
    var team;
    if (this.emptype == 1) {
      team = "Acquisition team";
    } else if (this.emptype == 2) {
      team = "Counselling team";

    }
    this.targetValue = data.target;
    console.log('targett: '+data.target)
    this.editTargetForm = this.formBuilder.group({
      targetMonth: [this.month, [Validators.required]],
      targetYear: [this.year, [Validators.required]],
      targetVal: [data.target, [Validators.required]],
      targetTeam: [team, [Validators.required]]
    });
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  deleteTarget(target: any){
    this._EmployeeService.deleteTarget(target.username, this.selectedMonthNum, this.selectedYear, this.emptype).
      subscribe((data: any) => {
        const { status, message } = data;
        if (status == 201) {
          this.confirmAction(message);
        }
        else {
          this.errorAction(message)
        }
      });
  }
}
