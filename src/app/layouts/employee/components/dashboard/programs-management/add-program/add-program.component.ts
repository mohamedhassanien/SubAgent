import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import Swal from 'sweetalert2';

interface School {
  schoolName: string;
}
interface Location {
  name: string;
}
interface Program {
  progname: string;
  programtype: string;
  programcity: string;
  programlevel: string;
  programfee: string;
  progid: string;
}

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss'],
})
export class AddProgramComponent implements OnInit {
  @Input() isEdit!: boolean;
  @Input() program;
  schools!: School[];
  programs!: Program[];
  selectedSch!: any;
  selectedProg!: any;
  editForm!: FormGroup;
  progID!: number;
  progName!: string;
  progType!: string;
  progCity!: string;
  progLevel!: string;
  progFees!: number;
  duration!: number;
  schoolName!: School;

  fields: string[] = [
    'Arts, Design & Architecture',
    'Business & Management',
    'Computer Science & IT',
    'Engineering & Technology',
    'Marketing & communication',
  ];
  fieldName!: string;

  locationName: string = 'Select Location';
  searchLocation!: string;
  locations!: [];

  languages: string[] = ['French', 'English'];
  languageName!: string;

  intakes: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  intakeName!: string;

  requirements: string[] = ['Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5'];

  constructor(
    private _EmployeeService: EmployeeService,
    private _FormBuilder: FormBuilder,
    private _StudentsService: StudentsService
  ) {
    this.editForm = this._FormBuilder.group({
      programName: ['', [Validators.required]],
      locationName: ['', [Validators.required]],
      progLevel: ['', [Validators.required]],
      progFees: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      languageName: ['', [Validators.required]],
      schoolName: ['', [Validators.required]],
      intakeName: ['', [Validators.required]],
      fieldName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getSchools();
    this.getAllCountries();
    if (this.isEdit) {
      const cities: Location[] = [];

      for (let city of this.program.city) {
        cities.push({ name: city.replace(' ', '') });
      }

      const levels: string[] = [];
      for (let level of this.program.level) {
        if (level.replace(' ', '') === '12') levels.push('Bac');
        if (level.replace(' ', '') === '12+1') levels.push('Bac+1');
        if (level.replace(' ', '') === '12+2') levels.push('Bac+2');
        if (level.replace(' ', '') === '12+3') levels.push('Bac+3');
        if (level.replace(' ', '') === '12+4') levels.push('Bac+4');
        if (level.replace(' ', '') === '12+5') levels.push('Bac+5');
      }

      let languages: string[] = [];
      if (this.program.language.includes('/')) {
        languages = this.program.language.replace(' ', '').split('/');
      } else {
        languages.push(this.program.language);
      }

      let intakes: string[] = [];
      if (this.program.intake.includes('/')) {
        intakes = this.program.intake.replace(' ', '').split('/');
      } else {
        intakes.push(this.program.intake);
      }

      this.programs;
      this.editForm.controls['programName'].setValue(this.program.name);
      this.editForm.controls['progFees'].setValue(this.program.fee);
      this.editForm.controls['duration'].setValue(this.program.length);
      this.editForm.controls['schoolName'].setValue({
        schoolName: this.program.school,
      });
      this.editForm.controls['locationName'].setValue(cities);
      this.editForm.controls['progLevel'].setValue(levels);
      this.editForm.controls['languageName'].setValue(languages);
      this.editForm.controls['fieldName'].setValue(this.program.type);
      this.editForm.controls['intakeName'].setValue(intakes);
    }
    console.log(this.editForm.value);
  }

  // To get all schools
  getSchools() {
    this._EmployeeService.getSchoolsNames().subscribe((data: any) => {
      const [{ status, data: schools }] = data;
      const schoolsArr = schools;
      this.schools = schoolsArr;
    });
  }

  // To get all countries
  getAllCountries() {
    this._StudentsService.getAllCities().subscribe((res: any) => {
      const [{ status, data: cities }] = res;
      this.locations = cities;
    });
  }

  // to get selected sch
  SelectedSch(event: any) {
    this.selectedSch = event.value;
    console.log(this.selectedSch);
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

  onSubmit(formData: any) {
    let {
      duration,
      fieldName,
      intakeName,
      languageName,
      locationName,
      progFees,
      programName,
      progLevel,
      schoolName,
    } = formData.value;

    const languages = JSON.stringify(languageName);
    const locations = JSON.stringify(locationName);
    const levels = JSON.stringify(progLevel);
    const intakes = JSON.stringify(intakeName);
    const school = schoolName.schoolName;
    console.log(levels.replace(/\+/g, '%2B'));
    if (!this.isEdit) {
      this._EmployeeService
        .addProgram(
          programName,
          fieldName,
          locations,
          levels.replace(/\+/g, '%2B'),
          progFees,
          duration,
          intakes,
          languages,
          school
        )
        .subscribe((data: any) => {
          if (data.Status === 200) {
            this.editForm.reset;
            this.confirmAction(data.message);
          } else {
            this.errorAction();
          }
        });
    } else {
      this._EmployeeService
        .editProgram(
          programName,
          fieldName,
          locations,
          levels.replace(/\+/g, '%2B'),
          progFees,
          duration,
          intakeName,
          languages,
          school,
          this.program.id
        )
        .subscribe((data: any) => {
          if (data.Status === 200) {
            this.editForm.reset;
            this.confirmAction(data.message);
          } else {
            this.errorAction();
          }
        });
    }
  }
}
