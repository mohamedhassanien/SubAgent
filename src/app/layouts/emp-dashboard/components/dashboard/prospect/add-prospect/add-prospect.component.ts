import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from './../../../../../../shared/services/students/students.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProspectComponent implements OnInit {
  addForm!: FormGroup;
  seriousScores: string[] = ['1', '2', '3', '4', '5'];
  seriousNumber: string = 'Select Score';
  empName: string = String(localStorage.getItem('name'));

  countryName: string = 'Select Country';
  searchCountry!: string;
  countries!: [];

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
    this.addForm = this._FormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // To call all countries
    this.getAllCountries();
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
    if (identifier === 'score') {
      const inputval = e.target.innerText;
      this.seriousNumber = inputval;
    } else if (identifier === 'country') {
      const inputval = e.target.innerText;
      this.countryName = inputval;
    }
  }

  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
    });
  }

  // To submit add form
  submit(formData: FormGroup) {
    const data = { ...formData.value };
    const empId = String(localStorage.getItem('userName'));
    const nation = this.countryName;
    const score = this.seriousNumber;
    const foi = 'aaaa';

    const {
      name,
      email,
      phone: { number: phoneNumber },
    } = data;
    this._EmployeeService
      .addProspect(name, email, score, empId, phoneNumber, nation, foi)
      .subscribe((data: any) => {
        if (data.status === 201) {
          // this.successMessage = data.Message;
          this.countryName = 'Select Country';
          this.seriousNumber = 'Select Score';
          this.confirmAction();
          this._Router.navigate([
            '/employees',
            this.empName,
            'dashboard',
            'prospect',
          ]);
        } else {
          // this.errMessage = data.Message;
          this.errorAction();
        }
      });
  }
}
