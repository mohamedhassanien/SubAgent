import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramsService } from 'src/app/shared/services/programs/programs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {


  suggestedPrograms: any[] = [];
  noProgramsSuggested: boolean = true;
  checkedProgram: string = '';
  buttonDisable: boolean = true;
  programComment: string = '';
  MyRepresentative: string | null = '';
  program: {
    "schoolName": string,
    "programName": string,
    "Field": string,
    "Price": number,
    "Link": string,
    "Language": string,
    "comment": string,
    "intakeMonth": string,
    "duration": string,
    "location": string,
    "choice": number,
    "suggested_programID": number
  } = {
      "schoolName": '',
      "programName": '',
      "Field": '',
      "Price": 0,
      "Link": '',
      "Language": '',
      "comment": '',
      "intakeMonth": '',
      "duration": '',
      "location": '',
      "choice": 0,
      "suggested_programID": 0
    }

  constructor(private _ProgramsService: ProgramsService,
    private _ModalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getSuggetedPrograms();
  }



  getSuggetedPrograms() {
    const userName = String(localStorage.getItem('userName'));
    this._ProgramsService
      .getSuggestedPrograms(userName)
      .subscribe((data: any) => {
        this.suggestedPrograms = data.message;
        console.log(this.suggestedPrograms);

        if (this.suggestedPrograms.length != 0) {
          this.noProgramsSuggested = false;
        }
      });

  }

  openModal(element: any, className: string, size: string, data: any[], comment: string) {
    const repname = localStorage.getItem("RepName");

    if (repname == null || repname == '') {
      this.MyRepresentative = "You don't have a representative";
    }
    else {
      if (comment == null) {
        this.programComment = 'This program has no comments';
      }
      else {
        this.programComment = comment;
      }
      this.MyRepresentative = 'Comment of ' + repname;
    }
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  onRadioButtonChange(event, id) {
    console.log(event.target.id)
    this.checkedProgram = event.target.id;
    this.buttonDisable = false;
  }
  sendSuggestedProg() {
    const userName = String(localStorage.getItem('userName'));
    if (this.checkedProgram == 'notInterested') {
      console.log('nothing');
    }
    else {
      const index = parseInt(this.checkedProgram.slice(-1));
      console.log(this.suggestedPrograms[index]);
      this.program = this.suggestedPrograms[index];
      this._ProgramsService
        .addSuggestedPrograms(this.program, userName)
        .subscribe((data: any) => {
          const { status, message } = data;
          if (status == 200) {
            this.confirmAction(message)
          }
        });
    }
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

}
