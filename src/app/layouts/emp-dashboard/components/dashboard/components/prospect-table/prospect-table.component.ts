import { Prospect } from './../../../../../../shared/models/prospect';
import FileSaver from 'file-saver';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';

@Component({
  selector: 'app-prospect-table',
  templateUrl: './prospect-table.component.html',
  styleUrls: ['./prospect-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProspectTableComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: Table;
  @Input() sizeName!: number;
  @Input() allProspects!: Prospect[];
  @Input() originalProspects!: Prospect[];

  @Output() refresh = new EventEmitter();
  @Input('loading') loading!: boolean;

  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));

  sortName!: string;
  page: number = 1;

  // Dropdowns
  scores: number[] = [1, 2, 3, 4, 5];
  mainLinkArr: string[] = this._Router.url.split('/');
  mainLink: string = this.mainLinkArr[this.mainLinkArr.length - 1];

  // Table pagination
  first = 0;
  rows = 10;

  // To catch table from template

  selectedColumns!: Prospect[];

  uploadedFile!: File | undefined;
  screenWidth!: number;

  employees: any[] = [];

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router,
    private _ModalService: NgbModal
  ) {
    this.getAllEmployees();
  }

  ngOnInit(): void {}

  // To refresh students
  refreshStudents() {
    this.refresh.emit();
  }

  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
      console.log(this.employees);
    });
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

  // To edit leads
  editFields(data: any) {
    console.log(data);
  }

  // To switch to previous page programmatically
  prevPage() {
    this.first = this.first - this.rows;
  }

  nextPage() {
    this.first = this.first + this.rows;
  }

  isFirstPage(): boolean {
    return this.allProspects ? this.first === 0 : true;
  }

  isLastPage(): boolean {
    return this.allProspects
      ? this.first >= this.allProspects.length - this.rows
      : true;
  }

  // To reset table
  resetTable() {
    this.first = 0;
    this.refreshStudents();
    this.table.reset();
  }

  // To open any modal
  openModal(element: any, className: string, size: string, data: any[]) {
    this._ModalService.open(element, { windowClass: className, size: size });
  }
  // To close any modal
  closeModal() {
    this._ModalService.dismissAll();
  }

  // To assign a lead to an prospect
  assingProspect(studentUserName: string) {
    this._EmployeeService
      .assignProspects(studentUserName)
      .subscribe((data: any) => {
        console.log(data);
        const { status, Message } = data;

        if (status === 201) {
          this.confirmAction(Message);
          this.refreshStudents();
        } else {
          this.errorAction();
        }
      });
  }

  // To get screen Width
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
  }

  // To get card background color for small screens
  getColor() {
    if (this.screenWidth < 768) {
      return 'linear-gradient(244deg, #FFF7F7 0%, #EDEEFF 100%)';
    } else {
      return '#F7F7F7';
    }
  }

  // To get colors for seriousness scores
  getBGColor(score: number) {
    if (score == 1) return 'danger';
    else if (score == 2) return 'warning';
    else if (score == 3) return 'warning';
    else if (score == 4) return 'success';
    else if (score == 5) return 'success';
    else return 'white';
  }

  // To get colors for status
  getStatusBG(status: string) {
    if (status === 'First Contact') return '#b3e5fc';
    else if (status === 'Checking Programs') return '#ffd8b2';
    else if (status === 'Preparing Docs') return '#eccfff';
    else return '#c8e6c9';
  }

  // To get colors for status
  getStatusColor(status: string) {
    if (status === 'First Contact') return '#23547b';
    else if (status === 'Checking Programs') return '#805b36';
    else if (status === 'Preparing Docs') return '#694382';
    else return '#256029';
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.selectedColumns ? this.selectedColumns : this.allProspects
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'students');
    });
  }

  sendTolead(userName: string) {
    this._EmployeeService
      .sendProspectToLeads(userName)
      .subscribe((data: any) => {
        const { status, Message } = data;
        if (status == 201) {
          this.confirmAction(Message);
          this._Router.navigate([
            '/employees',
            this.empName,
            'dashboard',
            'lead-management',
            'leads',
          ]);
        } else {
          this.errorAction(Message);
        }
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
