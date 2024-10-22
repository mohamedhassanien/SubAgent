import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StatisticsService } from './../../../../../shared/services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { title } from 'process';

@Component({
  selector: 'app-add-target',
  templateUrl: './add-target.component.html',
  styleUrls: ['./add-target.component.scss'],
})
export class AddTargetComponent implements OnInit {
  employees: any[] = [];

  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  years: number[] = [2022, 2023, 2024];

  selectedEmp: any = '';
  selectedMonth!: any;
  selectedYear!: any;
  selectedTarget!: any;

  constructor(
    private _StatisticsService: StatisticsService,
    private _EmployeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  onEmpChange(e: any) {
    this.selectedEmp = e.target.value;
    console.log(this.selectedEmp);
  }
  onMonthChange(e: any) {
    this.selectedMonth = e.target.value;
  }
  onYearChange(e: any) {
    this.selectedYear = e.target.value;
  }

  onTargetChange(e: any) {
    this.selectedTarget = e.target.value;
  }

  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }

  onAdd() {
    if (
      this.selectedEmp &&
      this.selectedMonth &&
      this.selectedYear !== '' &&
      this.selectedTarget !== 0
    ) {
      this._StatisticsService
        .addTargetForEmp(
          this.selectedMonth,
          this.selectedYear,
          this.selectedEmp,
          this.selectedTarget
        )
        .subscribe((data: any) => {
          const { status, Message } = data;
          if (status == 201) {
            Swal.fire({
              icon: 'success',
              title: Message,
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: Message,
              timer: 3000,
            });
          }
        });
    } else {
      Swal.fire({
        icon: 'question',
        title: 'Fill your input fields first',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }

  onEdit() {
    if (
      this.selectedEmp &&
      this.selectedMonth &&
      this.selectedYear !== '' &&
      this.selectedTarget !== 0
    ) {
      this._StatisticsService
        .editTargetForEmp(
          this.selectedMonth,
          this.selectedYear,
          this.selectedEmp,
          this.selectedTarget
        )
        .subscribe((data: any) => {
          const { status, Message } = data;
          if (status == 201) {
            Swal.fire({
              icon: 'success',
              title: Message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: Message,
              timer: 3000,
            });
          }
        });
    } else {
      Swal.fire({
        icon: 'question',
        title: 'Fill your input fields first',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }
}
