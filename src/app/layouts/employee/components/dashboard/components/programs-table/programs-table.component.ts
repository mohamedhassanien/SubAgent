import { Prospect } from '../../../../../../shared/models/prospect';
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
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';

import { Student } from 'src/app/shared/models/student';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Upload } from 'src/app/shared/services/upload/upload';
import { UploadService } from 'src/app/shared/services/upload/upload.service';
import { max } from 'rxjs/operators';

interface Intake {
  name: string;
}

interface Year {
  name: string;
}

@Component({
  selector: 'app-programs-table',
  templateUrl: './programs-table.component.html',
  styleUrls: ['./programs-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProgramsTableComponent implements OnInit {
  @ViewChild('table', { static: false }) table!: Table;
  @Input() searchPrograms!: string;
  @Input() sizeName!: number;
  @Input() allPrograms;
  @Input() originalPrograms;
  @Output() refresh = new EventEmitter();
  @Input('loading') loading!: boolean;

  isEdit: boolean = false;

  empName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));

  sortName!: string;
  page: number = 1;

  // Phone number plugin
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  separateDialCode = false;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  //Menu Dropdowns
  intakes: Intake[] = [{ name: 'September' }, { name: 'January' }];
  selectedIntake: Intake | undefined;
  years: Year[] = [{ name: '2022' }, { name: '2023' }, { name: '2024' }];
  selectedYear: Year | undefined;
  prospectStatus: string[] = ['First Contact', 'Restored from prospect'];

  // Dropdowns
  scores: number[] = [1, 2, 3, 4, 5];
  fieldsOfInterest: string[] = [
    'Arts, Design & Architecture',
    'Business & Management',
    'Computer Science & IT',
    'Engineering & Technology',
    'Marketing & communication',
    '',
  ];

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

  Programs;
  searchBool = false;

  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router,
    private _ModalService: NgbModal
  ) {
    this.getAllEmployees();
  }

  ngOnInit(): void {
    
    this._EmployeeService.getProgramsByName('')
      .subscribe((data: any) => {
        this.allPrograms = data.data;
        console.log(this.Programs);
      });
  }

  // To refresh students
  refreshStudents() {
    this.refresh.emit();
  }

  getAllEmployees() {
    this._EmployeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
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

  // To switch to previous page programmatically
  prevPage() {
    this.first = this.first - this.rows;
  }

  nextPage() {
    this.first = this.first + this.rows;
  }

  isFirstPage(): boolean {
    return this.Programs ? this.first === 0 : true;
  }

  isLastPage(): boolean {
    return this.Programs
      ? this.first >= this.Programs.length - this.rows
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
    if (className === 'edit-modal') {
      this.isEdit = true;
    }
    if (className === 'add-modal') {
      this.isEdit = false;
    }
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

  // To get colors for ranking
  getRankingColor(ranking: string) {
    if (ranking === '5') return 'top-5';
    else if (ranking === '10') return 'top-10';
    else if (ranking === '20') return 'top-20';
    else if (ranking === '30') return 'top-30';
    else if (ranking === '40') return 'top-40';
    else return 'white';
  }

  extractLanguages(lang: string) {
    return lang;

  
  }

  extractIntake(month: string) {
    const intake = month.replace(' ', '');
    if (intake.includes('/')) {
      let intakeArray: string[] = intake.split('/');
      return intakeArray;
    } else {
      return [intake];
    }
  }

  getProgramLevel(level: string) {
    if (level === '12') return 'Bac';
    if (level === ' 12+1' || level === '12+1' || level === '12+1 ')
      return 'Bac+1';
    if (level === '12+2 ' || level === '12+2') return 'Bac+2';
    if (level === '12+3') return 'Bac+3';
    if (level === '12+4') return 'Bac+4';
    if (level === '12+5') return 'Bac+5';
    else return level;
  }

  // To get BG colors for status
  getStatusBG(status: string) {}
  // To get colors for status
  getStatusColor(status: string) {}

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(
        this.selectedColumns ? this.selectedColumns : this.Programs
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'students');
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

  // Scroll left
  goLeft() {
    document.getElementById('left-most')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  // Scroll right
  goRight() {
    document.getElementById('right-most')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  getProgram(e: any){
    this.searchBool = true;
    if(e.target.value === ''){
      // this.FillTargetData();
      this.Programs = this.allPrograms;
    }
    else{
      this._EmployeeService.getProgramsByName(e.target.value)
      .subscribe((data: any) => {
        const {status, data: Programs} = data;
        this.Programs = Programs;
        console.log(data);
      });

      console.log(this.Programs);
      // const filterNames: any[] = [];
      // for(let i=0; i<this.permenantTraget.length; i++){
      //   if(this.permenantTraget[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
      //     filterNames.push(this.permenantTraget[i]);
      //   }
      // }
      // this.targetData = filterNames;
    }

  }

}
