import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramsService } from 'src/app/shared/services/programs/programs.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  noProgramsApplied: boolean = false;
  noProgramsSuggested: boolean = false;
  appliedPrograms: any[] = [];
  suggestedPrograms: any[] = [];
  isFav: boolean[] = [];
  // Position of snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _ProgramsService: ProgramsService,
    private _ModalService: NgbModal,
    private _ProgramService: ProgramsService,
    private _sharedService: SharedService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAppliedPrograms();
    // this.getSuggetedPrograms();
    // To recall all the wishlisted programs for the student
    // this.getAllWishlistedPrograms();
  }

  getAppliedPrograms() {
    // const userName = '2129265mai/alaa';
    const userName = String(localStorage.getItem('userName'));
    console.log('username ' + userName);
    this._ProgramsService
      .getAppliedPrograms(userName)
      .subscribe((data: any) => {
        console.log('app prog' + data);
        for (const phase in data.Message) {
          data.Message[phase].forEach((program) => {
            program.campus = program.campus.replace(' ', '').split('/');
            program.intake = program.intake.replace(' ', '').split('/');
            program.Language = program.Language.replace(' ', '').split('/');
            this.appliedPrograms.push(program);
          });
        }
        if (this.appliedPrograms.length == 0) {
          this.noProgramsApplied = true;
        }
        // console.log('app prog'+this.appliedPrograms);
      });
  }

  // To get all whislisted programs for a student
  getAllWishlistedPrograms() {
    let studentName = String(localStorage.getItem('userName'));
    let numderWishlist = 0;
    this._ProgramService
      .getWishlistedPrograms(studentName)
      .subscribe((data: any) => {
        const [{ programs }] = data;
        numderWishlist = programs.length;
        this._sharedService.wishlistLength.emit(numderWishlist);

        if (data) {
          let dataArray = data as [];
          dataArray.forEach((program) => {
            let everyFav = program['programs'] as [];
            everyFav.forEach((element) => {
              this.isFav[element['id']] = true;
            });
          });
        }
      });
  }

  addToFav(id: number) {
    this.isFav[id] = !this.isFav[id];
    const studentName = String(localStorage.getItem('userName'));
    // in case adding a program to wishlist
    if (this.isFav[id] == true) {
      this._ProgramService
        .wishlistProgram(id, studentName)
        .subscribe((data: any) => {
          const [{ status }] = data;
          if (status === 201) {
            this.getAllWishlistedPrograms();
          }
        });
      this._snackBar.open('Program has been Added to Wishlist!', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      // in case removing a program from wishlist
    } else {
      this._ProgramService
        .removeWishlistedProgram(id, studentName)
        .subscribe((data: any) => {
          const [{ status }] = data;
          if (status === 201) {
            this.getAllWishlistedPrograms();
          }
        });
      this._snackBar.open('Program has been Removed from Wishlist!', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  getSuggetedPrograms() {
    const userName = String(localStorage.getItem('userName'));
    this._ProgramsService
      .getSuggestedPrograms(userName)
      .subscribe((data: any) => {
        data.data.map((program) => {
          if (program.intake.includes('/')) {
            program.intake = program.intake.replace(/\//g, ', ');
          }
        });
        this.suggestedPrograms = data.data;
        console.log(this.suggestedPrograms);
      });
  }

  openModal(element: any, className: string, size: string, data: any[]) {
    this._ModalService.open(element, { windowClass: className, size: size });
  }

  // To get colors for status
  getStatusBG(status: string) {
    if (status.toLowerCase() === 'sent to school') return '#E8E8E8';
    else if (status.toLowerCase() === 'deposit paid') return '#B9E5FE';
    else if (status.toLowerCase() === 'interview preparation') return '#FFF2C2';
    else if (status.toLowerCase() === 'rejected') return '#FF9292';
    else if (status.toLowerCase() === 'visa ok') return '#8DD76A';
    else if (status.toLowerCase() === 'accepted') return '#fbe8ea';
    else if (status.toLowerCase() === 'cancelled') return '#FC9A64';
    else if (status.toLowerCase() === 'preparing docs') return '#fbe8ea';
    else return '#CA3C3C';
  }

  // To get colors for status
  // getStatusColor(status: string) {
  //   if (status.toLowerCase() === 'rejected') return '#FDFDFD';
  //   else return '#121212';
  // }
}
