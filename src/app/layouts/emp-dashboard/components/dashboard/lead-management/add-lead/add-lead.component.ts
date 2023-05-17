import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddLeadComponent implements OnInit {
  schools!: string[];
  schoolName: string = 'Select School';
  searchSchool!: string;

  countryName: string = 'Select Country';
  searchCountry!: string;
  countries!: [];

  seriousScores: string[] = ['1', '2', '3', '4', '5'];
  seriousNumber: string = 'Select Score';

  intakeMonths: string[] = ['January', 'September'];
  intakeMonthName: string = 'Select Month';

  intakeYears: string[] = ['2022', '2023'];
  intakeYearName: string = 'Select Year';

  sources: string[] = ['Instagram', 'Facebook', 'WOM', 'Snapchat', 'Other'];

  addForm!: FormGroup;

  empName: String = String(localStorage.getItem('name'));

  // Phone number plugin
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  separateDialCode = false;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  constructor(
    private _StudentsService: StudentsService,
    private _EmployeeService: EmployeeService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {
    // To call all countries
    this.getAllCountries();
    // To call all schools
    this.getSchools();

    this.addForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      program: ['', [Validators.required]],
      phone: ['', Validators.required],
      source: ['Instagram', Validators.required],
      customSource: [''],
    });
  }

  ngOnInit(): void {}

  // To get all shools names
  getSchools() {
    this._EmployeeService.getSchoolsNames().subscribe((data: any) => {
      const [{ status, data: schools }] = data;
      this.schools = schools;
    });
  }

  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
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

  // To change selections
  changeSelection(identifier: string, e?: any, value?: string) {
    if (identifier === 'country') {
      const inputval = e.target.innerText;
      this.countryName = inputval;
    } else if (identifier === 'score') {
      const inputval = e.target.innerText;
      this.seriousNumber = inputval;
    } else if (identifier === 'school') {
      const inputval = e.target.innerText;
      this.schoolName = inputval;
    } else if (identifier === 'month') {
      const inputval = e.target.innerText;
      this.intakeMonthName = inputval;
    } else if (identifier === 'year') {
      const inputval = e.target.innerText;
      this.intakeYearName = inputval;
    }
  }

  // To Submit the form
  sumbit(formData: FormGroup) {
    let {
      firstName,
      secondName,
      email,
      phone: { e164Number: phoneNumber },
      program,
      source,
      customSource,
    } = formData.value;

    const fullName = `${firstName} ${secondName}`;
    const sourceName = source === 'Other' ? customSource : source;
    const school = this.schoolName;
    const country = this.countryName;
    const score = this.seriousNumber;
    const month = this.intakeMonthName;
    const year = this.intakeYearName;

    const empId = String(localStorage.getItem('userName'));

    this._EmployeeService
      .addLead(
        fullName,
        email,
        empId,
        phoneNumber,
        school,
        program,
        country,
        score,
        sourceName,
        month,
        year
      )
      .subscribe((data: any) => {
        const [{ status, message }] = data;
        if (status === 201) {
          this.confirmAction();
          this.addForm.reset();
          this.countryName = 'Select Country';
          this.schoolName = 'Select School';
          this.seriousNumber = 'Select Score';
          this.intakeMonthName = 'Select Month';
          this.intakeYearName = 'Select Year';

          this._Router.navigate([
            '/employees',
            this.empName,
            'dashboard',
            'lead-management',
            'leads',
          ]);
        } else {
          this.errorAction(message);
        }
      });
  }
}
