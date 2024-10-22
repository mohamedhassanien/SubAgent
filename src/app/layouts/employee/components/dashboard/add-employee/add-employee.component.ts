import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  CountryISO,
  SearchCountryField,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEmployeeComponent implements OnInit {
  empForm: FormGroup;
  successMessage: string = '';
  errMessage: string = '';

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
    private _FormBuilder: FormBuilder,
    private _EmployeeService: EmployeeService
  ) {
    this.empForm = this._FormBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this._EmployeeService.getAllEmployees().subscribe((data) => {
      console.log(data);
    });
  }

  // To confirm action
  confirmAction(
    message: string = this.successMessage,
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

  // To submit add form
  submitAdd(formData: FormGroup) {
    const data = { ...formData.value };
    const { name, email } = data;
    this._EmployeeService.addEmployee(name, email).subscribe((data: any) => {
      if (data.status === 201) {
        this.successMessage = data.Message;
        this.confirmAction();
      } else {
        this.errMessage = data.Message;
        this.errorAction();
      }
    });
  }
}
