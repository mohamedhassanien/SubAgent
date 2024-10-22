import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from './../../../../../../shared/services/employee/employee.service';
import { Component, OnInit } from '@angular/core';
interface School {
  schoolName: any;
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
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss'],
})
export class EditProgramComponent implements OnInit {
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

  constructor(
    private _EmployeeService: EmployeeService,
    private _FormBuilder: FormBuilder
  ) {
    this.editForm = this._FormBuilder.group({
      progName: [this.progName ? this.progName : '', [Validators.required]],
      progType: [this.progType ? this.progType : '', [Validators.required]],
      progCity: [this.progCity ? this.progCity : '', [Validators.required]],
      progLevel: [this.progLevel ? this.progLevel : '', [Validators.required]],
      progFees: [this.progFees ? this.progFees : '', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getSchools();
  }

  // To get all schools
  getSchools() {
    this._EmployeeService.getSchoolsNames().subscribe((data: any) => {
      const [{ status, data: schools }] = data;
      const schoolsArr = schools;
      this.schools = schoolsArr;
      const [{ schoolName }] = this.schools;
      this.selectedSch = schoolName;
    });
  }

  // To get programs of school
  getSchPrograms(schName: string) {
    this._EmployeeService.getEditSchoolProgs(schName).subscribe((data: any) => {
      this.programs = data;
      console.log(this.programs);
    });
  }

  change(event) {
    this.selectedSch = event.value;
    this.getSchPrograms(this.selectedSch);
  }

  changeProgram(event: any) {
    const {
      progname,
      programtype,
      programcity,
      programfee,
      programlevel,
      progid,
    } = event.value;
    (this.progName = progname),
      (this.progType = programtype),
      (this.progCity = programcity),
      (this.progLevel = programlevel),
      (this.progFees = programfee);
    this.progID = progid;
    console.log(event.value);
  }

  onSubmit(formData: any) {
    let { progName, progType, progCity, progLevel, progFees } = formData.value;
    this._EmployeeService.editProgramInfo(
      this.progID,
      progName,
      progType,
      progCity,
      progLevel,
      progFees
    ).subscribe(data=>{
      console.log(data);
      
    });
  }
}
