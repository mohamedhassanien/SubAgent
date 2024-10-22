import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from '../../../../../../shared/services/students/students.service';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';
import { Options } from '@angular-slider/ngx-slider';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/api';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProspectComponent implements OnInit {

  toppings = new FormControl('');
  toppingList: string[] = [
    'Direct Message META',
    'Facebook Groups',
    'Study in France FB Group',
    'Prospection : INSTA',
    'Prospection : LINKEDIN',
    'WOM',
    'Fair',
    'Ambassador',
    'Cyrus',
    'Oussama',
    'Marwa',
    'Manal',
    'Fatima',
    'Meta Ads',
    'Houda',
    'Ani',
    'Abdelwahab',
    'Other'
  ];

  addForm!: FormGroup;
  seriousScores: string[] = ['1', '2', '3', '4', '5'];
  seriousNumber: string = 'Select Score';
  empName: string = String(localStorage.getItem('name'));

  countryName: string = 'Select Country';
  residenceCountry: string = 'Select Country';
  searchCountry!: string;
  countries!: [];

  checked = true;


  is_checked: any;

  // Phone number plugin
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  separateDialCode = true;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  budgetValue: any = '';
  budgetOptions: Options = {
    floor: 5000,
    step: 5000,
    ceil: 100000,
    // minRange: 5000,
    // maxRange: 15000,
    // pushRange: true,
  };

  sources: SelectItem[] = [
    { label: 'Direct Message META', value: 'Direct Message META' },
    { label: 'Facebook Groups', value: 'Facebook Groups' },
    { label: 'Study in France FB Group', value: 'Study in France FB Group' },
    { label: 'WhatsApp Groups', value: 'WhatsApp Groups' },
    { label: 'Prospection : INSTA', value: 'Prospection : INSTA' },
    { label: 'Prospection : LINKEDIN', value: 'Prospection : LINKEDIN' },
    { label: 'WOM', value: 'WOM' },
    { label: 'Fair', value: 'Fair' },
    { label: 'Ambassador', value: 'Ambassador' },
    { label: 'Cyrus', value: 'Cyrus' },
    { label: 'Oussama', value: 'Oussama' },
    { label: 'Marwa', value: 'Marwa' },
    { label: 'Manal', value: 'Manal' },
    { label: 'Fatima', value: 'Fatima' },
    { label: 'Meta Ads', value: 'Meta Ads' },
    { label: 'Houda', value: 'Houda' },
    { label: 'Ani', value: 'Ani' },
    { label: 'Abdelwahab', value: 'Abdelwahab' },
    { label: 'Other', value: 'Other' }
  ];
  constructor(
    private _StudentsService: StudentsService,
    private _EmployeeService: EmployeeService,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _ModalService: NgbModal,
  ) {



    //Validators.pattern("^[A-Za-z0-9]*$")
    this.addForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      budget: '',
      selectedSource: '',
      Language_Test_Level: '',
      field_of_interest: '',
      current_previous_school: '',
      entry_level: '',
      intake: '',
      year: '',
      score: '',


      language_study: '',
      eng_test_name: '',
      eng_test_score: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      fr_test_name: '',
      fr_test_score: '',


      Which_table: '',
      comment: ''

    });
  }
  divs: number[] = [];
 
  checkAlphabets(event) {
    var key = event.keyCode;
    // return ((key >= 65 && key <= 90) || key == 8);
  };

  ngOnInit(): void {
    // To call all countries
    this.getAllCountries();
    this.is_checked = true;
  }
  validateNo(e): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }
  validateName(e) {

  }
  changeChecked() {
    this.checked = false;
  }
  change(e: any) {
    this.budgetValue = e.target.value;
  }

  // To confirm action
  confirmAction(message: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      timer: 1500,
    });
  }

  // To confirm error
  errorAction(message: string) {
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
    else if (identifier === 'residence') {
      const inputval = e.target.innerText;
      this.residenceCountry = inputval;
    }
  }

  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCountries().subscribe((res: any) => {
      const { data: countries } = res;
      countries.sort((a: any, b: any) => (a.country > b.country ? 1 : -1));
      this.countries = countries;
      console.log(this.countries);
    });
  }

  // To submit add form
  submit(formData: FormGroup) {
    const data = { ...formData.value };
    const empId = String(localStorage.getItem('userName'));
    const nation = this.countryName;
    const countryOfResidence = this.residenceCountry;
    // const score = this.seriousNumber;

    const {
      phone: { e164Number: phoneNumber },
    } = data;
    // console.log('phone---------------')
    // console.log(data.phone)
    const phoneNumber1 = phoneNumber.replace('+','')



    const studentfName = this.addForm.get('firstName')?.value
    const studentlName = this.addForm.get('lastName')?.value
    const studentEmail = this.addForm.get('email')?.value


    const budget = this.budgetValue
    const source = this.toppings.value

    console.log(source);



    const field_of_interest = this.addForm.get('field_of_interest')?.value
    const intake = this.addForm.get('intake')?.value
    const year = this.addForm.get('year')?.value
    const score = this.addForm.get('score')?.value
    const entry_level = this.addForm.get('entry_level')?.value
    let Which_table = this.addForm.get('Which_table')?.value

    if (Which_table == '') {
      Which_table = 0;
    }


    const language_study = this.addForm.get('language_study')?.value
    const eng_test_name = this.addForm.get('eng_test_name')?.value
    const eng_test_score = this.addForm.get('eng_test_score')?.value
    const fr_test_name = this.addForm.get('fr_test_name')?.value
    const fr_test_score = this.addForm.get('fr_test_score')?.value
    const comment = this.addForm.get('comment')?.value

    const password = '@';
    const iswebsite = 0;
    const studnetSchoolInterest = '';
    const studnetProgInterest = '';
    const intakeMonth = '';



    this._EmployeeService.addNewLead(
      studentfName,
      studentlName,
      studentEmail,
      phoneNumber1,
      studnetSchoolInterest,
      studnetProgInterest,
      nation,
      countryOfResidence,
      score,
      empId,
      year,
      intake,
      field_of_interest,
      Which_table,
      budget,
      password,
      iswebsite,
      source,
      language_study,
      eng_test_name,
      eng_test_score,
      fr_test_name,
      fr_test_score,
      comment,
      entry_level
    ).subscribe(
      (res: any) => {
        console.log(res[0].status);
        if (res[0].status === 201) {
          this.confirmAction(res[0].message);
        } else if (res[0].status === 203) {
          this.errorAction(res[0].message);
        }
        this._ModalService.dismissAll();
      }, (error) => {

      }
    );
    
    
  }


  createDiv(): void {
    this.divs.push(this.divs.length);
  }
}
