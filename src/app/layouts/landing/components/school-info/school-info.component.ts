import { ProgramsService } from './../../../../shared/services/programs/programs.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-school-info',
  templateUrl: './school-info.component.html',
  styleUrls: ['./school-info.component.scss'],
})
export class SchoolInfoComponent implements OnInit {
  // program!: string;
  // email !: string;
  // applied : boolean = true;
  // panoramaImages!: Array<string>;
  // id !: number;
  // name !: string;
  // fee !: number;
  // level !: string;
  // intake !: string;
  // duration !: string;
  // Aclow !: string;
  // Achigh !: string;
  // glow !: string;
  // ghigh !: string;
  // grolow !: string;
  // grohigh !: string;
  // outlow !: string;
  // outhigh !: string;
  // trans !: string;
  // language !: string;
  // school !: string;
  // city !: string;
  // cityAbout !: string;
  // schoolAbout !: string;
  // type !: string;
  // whatDoOneNum !: number;
  // whatDoOneWord !: string;
  // whatDoTwoNum !: number;
  // whatDoTwoWord !: string;
  // whatDoThreeNum !: number;
  // whatDoThreeWord !: string;
  // whatStudyOneNum !: number;
  // whatStudyOneWord !: string;
  // whatStudyTwoNum !: number;
  // whatStudyTwoWord !: string;
  // whatStudyThreeNum !: number;
  // whatStudyThreeWord !: string;
  // whereLiveOneNum !: number;
  // whereLiveOneWord !: string;
  // whereLiveTwoNum !: number;
  // whereLiveTwoWord !: string;
  // whereLiveThreeNum !: number;
  // whereLiveThreeWord !: string;
  // whereWorkOneNum !: number;
  // whereWorkOneWord !: string;
  // whereWorkTwoNum !: number;
  // whereWorkTwoWord !: string;
  // whereWorkThreeNum !: number;
  // whereWorkThreeWord !: string;
  // schoolVideo !: string;
  // cityVideo !: string;
  // safeURL !: any;
  // targetProduct?: Array<Object>;

  // spinner: boolean = true;
  // loaded: boolean = false;

  // constructor(private progsServ : ProgramsService,private actRoute: ActivatedRoute,
  //   private router : Router,
  //   private programsServ : ProgramsService,) {
  //     this.program = 'overview';
  // }

  // ngOnInit(): void {
  //   this.email = String(localStorage.getItem('StuEmail'))

  //   // get Program id from router link
  //   this.actRoute.params.subscribe((param) => {
  //     this.id = param.id
  //     // with Program id get all program information from DB
  //     this.programsServ.progranInfo(param.id).subscribe((data : any) => {
  //       if (data){
  //         this.targetProduct = [
  //           this.name,
  //           this.language,
  //           this.type,
  //           this.city,
  //           this.level,
  //           this.duration,
  //           this.fee,
  //           this.intake,
  //           this.school, , , ,
  //           this.Aclow,
  //           this.Achigh,
  //           this.glow,
  //           this.ghigh,
  //           this.grolow,
  //           this.grohigh,
  //           this.outlow,
  //           this.outhigh,
  //           this.trans,
  //           this.cityAbout,
  //           this.schoolAbout,
  //           this.whatDoOneNum ,
  //           this.whatDoOneWord ,
  //           this.whatDoTwoNum ,
  //           this.whatDoTwoWord ,
  //           this.whatDoThreeNum ,
  //           this.whatDoThreeWord ,
  //           this.whatStudyOneNum ,
  //           this.whatStudyOneWord ,
  //           this.whatStudyTwoNum ,
  //           this.whatStudyTwoWord ,
  //           this.whatStudyThreeNum ,
  //           this.whatStudyThreeWord ,
  //           this.whereLiveOneNum ,
  //           this.whereLiveOneWord ,
  //           this.whereLiveTwoNum ,
  //           this.whereLiveTwoWord ,
  //           this.whereLiveThreeNum ,
  //           this.whereLiveThreeWord ,
  //           this.whereWorkOneNum ,
  //           this.whereWorkOneWord ,
  //           this.whereWorkTwoNum ,
  //           this.whereWorkTwoWord ,
  //           this.whereWorkThreeNum ,
  //           this.whereWorkThreeWord,
  //           this.cityVideo,
  //           this.schoolVideo,
  //         ] = data;

  //         this.spinner = false;
  //         this.loaded = true;
  //       }
  //       else {
  //         return data
  //       }
  //     })
  //   })

  //   // check if the student already applied to this program before or not
  //   this.progsServ.checkApplied(this.email, this.id)
  //   .subscribe((applied : any) => {
  //     if(applied){
  //       return this.applied = applied
  //     }
  //     else return this.applied = applied
  //   })
  // }
  // // apply to a program
  // apply(){
  //   let isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'))
  //   // if the student is logged in then apply
  //   if (isLoggedIn ){
  //     let progName = this.name ;
  //     let schoolName = this.school ;
  //     let city = this.city ;
  //     // API apply by student email program's name school's name and city
  //     return this.programsServ.applyProgram(progName, schoolName, city, this.email)
  //     .subscribe((data) => {
  //       if(data) return this.router.navigate(['/auth/Done'])
  //       else return alert('there is somthing wrong please try later')
  //     })
  //   }
  //   // if the student isn't logged in navigate to login page
  //   else {
  //     return this.router.navigate(['/auth/login'])
  //   }
  // }
  ngOnInit(): void {}
}
