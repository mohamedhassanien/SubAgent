import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import Swal from 'sweetalert2';

interface School {
  schoolName: string;
}

@Component({
  selector: 'app-suggested-program-popup',
  templateUrl: './suggested-program-popup.component.html',
  styleUrls: ['./suggested-program-popup.component.scss']
})


export class SuggestedProgramPopupComponent implements OnInit {

  constructor(
    private _ModalService: NgbModal,
    private _EmployeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.SuggestedProgUser = String(localStorage.getItem('ChosenUserName'));
    this.getAllPrograms(this.SuggestedProgUser);
    this.getSchools();
  }

  empUserName: string = String(localStorage.getItem('userName'));
  ProgramLocation = '';
  ProgramLanguage = 'Select School First';
  programID = 0;
  editCardIndex = 0;
  editProg = false;
  schoolSearch!: string;

  suggestedPrograms: {
    id: number,
    schoolName: string,
    programName: string,
    Price: string,
    Field: string,
    Language: string,
    Link: string,
    comment: string,
    intakeMonth: string,
    duration: string,
    location: string,
    suggested_programID: number,
    programID: number;
  }[] = [];

  chosenProgram: {
    id: number,
    schoolName: string,
    programName: string,
    Price: string,
    Field: string,
    Language: string,
    Link: string,
    comment: string,
    intakeMonth: string,
    duration: string,
    location: string,
    suggested_programID: number,
    programID: number,
    choice: number
  }[] = [];

  notchosen: {
    id: number,
    schoolName: string,
    programName: string,
    Price: string,
    Field: string,
    Language: string,
    Link: string,
    comment: string,
    intakeMonth: string,
    duration: string,
    location: string,
    suggested_programID: number,
    programID: number,
    choice: number
  }[] = [];

  currentSP = {
    studentusername: '',
    programlanguage: '',
    programlink: '',
    comment: '',
    programintake: '',
    location: '',
    suggested_programID: 0,
    programid: 0,
    empid: this.empUserName,
    choice: 0,
  };

  selectedProgram: any;
  programLanguages: any[] = [];
  programLocations: any[] = [];
  inTakeMonths: any[] = [];
  selectedProgramId = -9999999;
  programSearch!: string;
  intakeSearch!: string;
  languageSearch!: string;
  locationSearch!: string;
  addSugg_schoolName='';
  intakeMonth='September';
  schoolName: string = 'Select School';
  searchSchool!: string;
  countryName: string = 'Select Country';
  searchCountry!: string;
  selectedCountry!: string;
  schoolPrograms;
  schoolProgramName: string = 'No Programs Available';
  schoolProgramsSearch!: string;
  SchoolName: string = 'Pas encore décidée';
  schools!: School[];
  SuggesdtedProgramData: any;
  chosenProg = false;
notchosenProg = false;

  suggestedSchoolForm!: FormGroup;
  editSuggestedSchoolForm!: FormGroup;
  @ViewChild('suggestedCard') suggestedCard;

  openModal(element: any, className: string, size: string, data: any, editProg?:boolean) {
    // Add suggested program
    if (className === 'suggested-modal') {
      if (editProg) {
        this._ModalService.dismissAll();
        this.editCardIndex = data[0];
        const prog = this.suggestedPrograms[data[0]];
        this.selectedProgramId = prog.programID;
        this.editProg = true;
        this.addSugg_schoolName = prog.schoolName;
        this.ProgramLocation = prog.location;
        this.ProgramLanguage = prog.Language;
        this.intakeMonth = prog.intakeMonth;
        this.suggestedSchoolProg = prog.programName;
        // this.selectedProgramId = prog.suggested_programID;
        this.editSuggestedSchoolForm = new FormGroup({
          "programField": new FormControl(prog.Field),
          "programPrice": new FormControl(prog.Price),
          "programLink": new FormControl(prog.Link),
          "comment": new FormControl(prog.comment),
          "Duration": new FormControl(prog.duration)
        });
      }
      else {
        this._ModalService.dismissAll();
        this.addSugg_schoolName = 'Select School';
        this.ProgramLocation = 'Select School First';
        this.ProgramLanguage = 'Select School First';
        this.intakeMonth = 'Select School First';
        this.suggestedSchoolProg = 'Select School First';
        this.suggestedSchoolForm = new FormGroup({
          "programField": new FormControl(""),
          "programPrice": new FormControl(""),
          "programLink": new FormControl(""),
          "comment": new FormControl(""),
          "Duration": new FormControl(""),
          "program_name": new FormControl(""),
          "school_id": new FormControl(""),
          "program_field": new FormControl(""),
          "program_duration":new FormControl(""),
          "program_price":new FormControl("")
        });
      }
    }

    this._ModalService.open(element, { windowClass: className, size: size });
  }

  SuggestedProgUser = '';
  openCard(username) {
    console.log('openModalCard: ' + username);
    this.SuggestedProgUser = username;
    this.getAllPrograms(username);
    this.openModal(
      this.suggestedCard,
      'suggested-modal-card',
      'cardsize',
      []
    );
  }

  getAllPrograms(username) {
    this._EmployeeService.getSuggestedProgram(username, this.empUserName).
      subscribe((data: any) => {
        this.suggestedPrograms = data.message;
        this.chosenProgram = data.chosen;
        this.notchosen = data.unchosen;
        if(this.chosenProgram.length > 0){
          this.chosenProg = true;
        }
        if(this.notchosen.length > 0){
          this.notchosenProg = true;
        }
      });
  }

  suggestedSchoolProg = 'Select School First';
  getSchoolsPrograms(schoolname: string) {
    this._EmployeeService.getSchoolPrograms(this.SchoolName).
      subscribe((data: any) => {
        const { status, data: programs } = data;
        if (programs.length === 0) {
          this.schoolPrograms = [];
          this.suggestedSchoolProg = 'No Programs Available';
        } else {
          this.schoolPrograms = programs;
          this.suggestedSchoolProg = 'Select Program';
        }
      })
  }

  cancelForm(){
    Swal.fire({
      title: "Are you sure?",
      text: "There is some unsaved data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       this._ModalService.dismissAll();
       this.openCard(this.SuggestedProgUser);
      }
    });
  }

  formChecker(programid, location, programintake, programlanguage, programlink){
console.log(programid, location, programintake, programlanguage, programlink);
    var check: boolean[]= [];
    if(programid > 0){
      check.push(true);
    }
    else{
      check.push(false);
    }
    if(location != 'Select School First' && location != 'Select Program First' && location != 'Select Location' && location != ''){
      check.push(true);
    }
    else{
      check.push(false);
    }
    if(programintake != 'Select School First' && programintake != 'Select Program First' && programintake != 'Select Intake' && programintake != ''){
      check.push(true);
    }
    else{
      check.push(false);
    }
    if(programlanguage != 'Select School First' && programlanguage != 'Select Program First' && programlanguage != 'Select Language' && programlanguage != ''){
      check.push(true);
    }
    else{
      check.push(false);
    }
    if(programlink != ''){
      check.push(true);
    }
    else{
      check.push(false);
    }
    const allEqual = arr => arr.every( v => v === arr[0] )
    console.log(check);
    if(check[0] == true && allEqual(check)){
      return true;
    }
    else{
      return false;
    }
  }

  addSuggestedSchool() {
    const obj = {
      "studentusername": this.SuggestedProgUser,
      "programid": this.selectedProgramId,
      "empid": this.empUserName,
      "comment": this.suggestedSchoolForm.value['comment'],
      "programlink": this.suggestedSchoolForm.value['programLink'],
      "programintake": this.intakeMonth,
      "programlanguage": this.ProgramLanguage,
      "location": this.ProgramLocation,
      "program_name": this.suggestedSchoolForm.value['program_name'],
      "school_id": this.suggestedSchoolForm.value['school_id'],
      "program_field": this.suggestedSchoolForm.value['program_field'],
      "program_duration":this.suggestedSchoolForm.value['program_duration'],
      "program_price":this.suggestedSchoolForm.value['program_price']
    }
    console.log("original"+obj.programid)
    if(this.formChecker(obj.programid, obj.location, obj.programintake, obj.programlanguage, obj.programlink)){
    this._EmployeeService.addSuggestedPrograms(obj).subscribe((data: any) => {

        const { status, message } = data;
        if (status == 200) {
          this.confirmAction(message);
        }
        else {
          this.errorAction(message);
        }
        this._ModalService.dismissAll();
        this.openCard(this.SuggestedProgUser);
      });
    }
    else{
      this.errorAction('Fill requiered fields');
    }

  }

  editSuggestedProgram() {

    this.currentSP = {
      studentusername: this.SuggestedProgUser,
      programlanguage: this.ProgramLanguage,
      programlink: this.editSuggestedSchoolForm.value['programLink'],
      comment: this.editSuggestedSchoolForm.value['comment'],
      programintake: this.intakeMonth,
      location: this.ProgramLocation,
      suggested_programID: this.suggestedPrograms[this.editCardIndex].suggested_programID,
      programid: this.selectedProgramId,
      empid: this.empUserName,
      choice: 0,
    };
    if(this.formChecker(this.currentSP.programid, this.currentSP.location, this.currentSP.programintake, this.currentSP.programlanguage, this.currentSP.programlink)){
      this._EmployeeService.editSuggestedProgram(this.currentSP).subscribe(
        (data: any) => {
          const { status, message } = data;
          if (status == 200) {
            this.confirmAction(message);
            this.editProg = false;
          }
          else {
            this.errorAction(message);
          }
          this._ModalService.dismissAll();
          this.openCard(this.SuggestedProgUser);
        });
    }
    else{
      this.errorAction('Fill requiered fields');
    }


    console.log(this.currentSP);
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
        timer: 700,
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

    changeSelectionSugg(identifier: string, e?: any, programIndex?: number, value?: string) {
      if (identifier === 'school') {
        this.SchoolName = e.target.innerText;
        this.addSugg_schoolName = e.target.innerText;
        this.getSchoolsPrograms(this.SchoolName);
        this.ProgramLocation = 'Select Program First';
        this.ProgramLanguage = 'Select Program First';
        this.intakeMonth = 'Select Program First';
        if(this.editProg){
          this.editSuggestedSchoolForm.controls['programField'].setValue('');
          this.editSuggestedSchoolForm.controls['programPrice'].setValue('');
          this.editSuggestedSchoolForm.controls['Duration'].setValue('');
        }
        else{
          this.suggestedSchoolForm.controls['programField'].setValue('');
          this.suggestedSchoolForm.controls['programPrice'].setValue('');
          this.suggestedSchoolForm.controls['Duration'].setValue('');
        }
  
  
      }
      if (identifier === 'program') {
        this.suggestedSchoolProg = e.target.innerText;
        console.log(programIndex);
        if (programIndex) {
          this.selectedProgram = this.schoolPrograms[programIndex];
          this.selectedProgramId = this.selectedProgram.id;
  
        }
        this.ProgramLocation = 'Select Location';
        this.ProgramLanguage = 'Select Language';
        this.intakeMonth = 'Select Intake'
        this.programLocations = this.selectedProgram.city;
        this.programLanguages = this.selectedProgram.language;
        this.inTakeMonths = this.selectedProgram.intake;
        console.log('ddddd' + this.inTakeMonths[0]);
        if(this.editProg){
          this.editSuggestedSchoolForm.controls['programField'].setValue(this.selectedProgram.type);
          this.editSuggestedSchoolForm.controls['programPrice'].setValue(this.selectedProgram.fee);
          this.editSuggestedSchoolForm.controls['Duration'].setValue(this.selectedProgram.length);
        }
        else{
          this.suggestedSchoolForm.controls['programField'].setValue(this.selectedProgram.type);
          this.suggestedSchoolForm.controls['programPrice'].setValue(this.selectedProgram.fee);
          this.suggestedSchoolForm.controls['Duration'].setValue(this.selectedProgram.length);
        }
  
      }
  
      if (identifier === 'location') {
        this.ProgramLocation = e.target.innerText;
      }
  
      if (identifier === 'language') {
        this.ProgramLanguage = e.target.innerText;
      }
  
      if (identifier === 'intakeMonth') {
        this.intakeMonth = e.target.innerText;
      }
    }
  // To close any modal
  closeModal() {
    this._ModalService.dismissAll();
  }

  deleteSuggestedProgram(index) {
    const editProgram = {
      "empid": this.empUserName,
      "studentusername": this.SuggestedProgUser,
      "suggested_programID": this.suggestedPrograms[index].suggested_programID
    };
    

    this._EmployeeService.deleteSuggestedProgram(editProgram).subscribe(
      (data: any) => {
        const {status, message} = data;
        if (status == 200) {
          this.confirmAction(message);
          this.getAllPrograms(this.SuggestedProgUser);
        }
        else {
          this.errorAction(message);
        }
      }
    )
  }

    // To get all schools
    getSchools() {
      this._EmployeeService.getSchoolsNames().subscribe((data: any) => {
        const [{ status, data: schools }] = data;
        const schoolsArr = schools.map((obj: School) => obj);
        this.schools = schoolsArr;
      });
    }
}
