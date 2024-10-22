import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProgramsService } from './../../../../shared/services/programs/programs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-prog',
  templateUrl: './edit-prog.component.html',
  styleUrls: ['./edit-prog.component.scss'],
})
export class EditProgComponent implements OnInit {
  ngOnInit(): void {}
  // @ViewChild('ProgName') ProgName!: ElementRef;
  // @ViewChild('ProgLang') ProgLang!: ElementRef;
  // @ViewChild('ProgType') ProgType!: ElementRef;
  // @ViewChild('ProgCity') ProgCity!: ElementRef;
  // @ViewChild('ProgLevel') ProgLevel!: ElementRef;
  // @ViewChild('ProgLength') ProgLength!: ElementRef;
  // @ViewChild('ProgFee') ProgFee!: ElementRef;
  // @ViewChild('ProgIntake') ProgIntake!: ElementRef;
  // @ViewChild('ProgSchoolName') ProgSchoolName!: ElementRef;
  // @ViewChild('ProgId') ProgId!: ElementRef;

  // programContainer: any;
  // updatePro!: FormGroup;
  // name!: string;
  // fee!: number;
  // level!: string;
  // intake!: string;
  // school;
  // city;
  // lang;
  // type;
  // length;
  // id;
  // constructor(
  //   private _ActivatedRoute: ActivatedRoute,
  //   private _ProgramsService: ProgramsService,
  //   private _Router: Router,
  //   private _FormBuilder: FormBuilder
  // ) {
  //   this.updatePro = this._FormBuilder.group({
  //     Name: [''],
  //     Language: [''],
  //     type: [''],
  //     city: [''],
  //     level: [''],
  //     length: [''],
  //     fee: [''],
  //     intake: [''],
  //     school: [''],
  //     id: [''],
  //   });
  // }

  // isLoading: boolean = true;

  // ngOnInit(): void {
  //   // get id of program from url..
  //   let progid = this._ActivatedRoute.snapshot.params.id;

  //   // getting data of program by this id
  //   this._ProgramsService.progranInfoNew(progid).subscribe((data: any) => {
  //     console.log(data);
  //     this.programContainer = data;
  //     this.isLoading = false;
  //   });

  //   // to get updateddata to send to api..
  //   //   setTimeout(() => {
  //   //   }, 3000);
  //   // }
  //   // this.ProgName.nativeElement.value = this.programContainer[0];
  //   // let lang = this.ProgLang.nativeElement.value;
  //   // let type = this.ProgType.nativeElement.value;
  //   // let cityName = this.ProgCity.nativeElement.value;
  //   // let progLevel = this.ProgLevel.nativeElement.value;
  //   // let length = this.ProgLength.nativeElement.value;
  //   // let fee = this.ProgFee.nativeElement.value;
  //   // let intake = this.ProgIntake.nativeElement.value;
  //   // let school = this.ProgSchoolName.nativeElement.value;
  //   // let id = this.ProgId.nativeElement.value;
  // }
  // // when submitted form of update program
  // onSubmit(proData): void {
  //   console.log(proData);
  //   if (this.updatePro.valid) {
  //     let programName = this.ProgName.nativeElement.value;
  //     let lang = this.ProgLang.nativeElement.value;
  //     let type = this.ProgType.nativeElement.value;
  //     let cityName = this.ProgCity.nativeElement.value;
  //     let progLevel = this.ProgLevel.nativeElement.value;
  //     let length = this.ProgLength.nativeElement.value;
  //     let fee = this.ProgFee.nativeElement.value;
  //     let intake = this.ProgIntake.nativeElement.value;
  //     let school = this.ProgSchoolName.nativeElement.value;
  //     let id = this.ProgId.nativeElement.value;
  //     // console.log(this.updatePro.value)
  //     console.log(
  //       programName,
  //       lang,
  //       type,
  //       cityName,
  //       progLevel,
  //       length,
  //       fee,
  //       intake,
  //       school,
  //       id
  //     );

  //     this._ProgramsService
  //       .EditProg(
  //         programName,
  //         lang,
  //         type,
  //         cityName,
  //         progLevel,
  //         length,
  //         fee,
  //         intake,
  //         school,
  //         id
  //       )
  //       .subscribe((data) => {
  //         console.log(data);
  //         this._Router.navigate(['/landing/programs/', id]);
  //       });
  //   }
  // }
  // // updateProg():void
  // // {
  // //   let isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'))
  // //   // if the student is logged in then apply
  // //   if (isLoggedIn ){
  // //     let programName = this.name ;
  // //     let lang = this.lang ;
  // //     let type = this.type ;
  // //     let cityName = this.city ;
  // //     let progLevel = this.level;
  // //     let length = this.length ;
  // //     let fee = this.fee ;
  // //     let intake = this.intake ;
  // //     let school = this.school ;
  // //     let id = this.id ;

  // //     // API apply by student email program's name school's name and city
  // //      this._ProgramsService.EditProg(programName ,lang, type,cityName,progLevel , length,fee,intake,school ,id ).subscribe((data) => {

  // //      });
  // //   }
  // //   // if the student isn't logged in navigate to login page

  // // }
}
