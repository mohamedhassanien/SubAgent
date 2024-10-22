import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProgramsService } from './../../../../shared/services/programs/programs.service';
import { SchoolsService } from './../../../../shared/services/schools/schools.service';
import { Program } from './../../../../shared/models/program';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/shared/models/catrgory';
import { ICity } from 'src/app/shared/models/city';
import { Subscription } from 'rxjs';
import { DataSearchService } from 'src/app/shared/services/Data/data-search.service';

import { Router, NavigationEnd } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss'],
})
export class SchoolsComponent implements OnInit {
  ngOnInit(): void {}
  // @ViewChild('register') registerModal: any;

  // p: number = 1;

  // searchForm!: FormGroup;
  // filterForm!: FormGroup;
  // searchText = '';
  // categories!: ICategory[];
  // programs: Array<any> = [];
  // schools: any[] = [];
  // filteredProgram!: Program[];
  // collectionSize: number = 0;
  // cities!: ICity[];
  // page = 1;
  // type!: any;
  // pageSize = 9;

  // programNameSearch!: string;
  // categoryNameFilter!: string;
  // subscription!: Subscription;

  // spinner: boolean = true;
  // loaded: boolean = false;

  // constructor(
  //   private data: DataSearchService,
  //   formBuilder: FormBuilder,
  //   private programService: ProgramsService,
  //   private schoolsService: SchoolsService,
  //   private httpService: HttpClient,
  //   private modalService: NgbModal,
  //   config: NgbModalConfig,
  //   private router: Router
  // ) {
  //   // filter form
  //   this.filterForm = formBuilder.group({
  //     Language: ['None'],
  //     type: ['None'],
  //     sort: ['None'],
  //     country: ['None'],
  //     city: ['None'],
  //     level: ['None'],
  //     searchInput: [''],
  //   });
  //   // pop up for register form if the user not logged in
  //   config.backdrop = 'static';
  //   config.keyboard = false;
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  //   // destroy the register pop up
  //   this.modalService.dismissAll();
  // }

  // // filter Programs
  // onFilter(formData: any) {
  //   this.httpService
  //     .post(
  //       `https://admin-mfyg726r7q-uc.a.run.app/filter/1?name=${formData.searchInput}&city=${formData.city}&Language=${formData.Language}&type=${formData.type}&level=${formData.level}&sort=${formData.sort}`,
  //       httpOptions
  //     )
  //     .subscribe((data: any) => {
  //       if (formData.sort == 0) {
  //         this.spinner = true;
  //         this.loaded = false;
  //         if (true) {
  //           this.programs.sort(function (a, b) {
  //             return b[6] - a[6];
  //           });
  //         }
  //         this.spinner = false;
  //         this.loaded = true;
  //       } else if (formData.sort == 1) {
  //         this.spinner = true;
  //         this.loaded = false;
  //         if (true) {
  //           this.programs.sort(function (a, b) {
  //             return a[6] - b[6];
  //           });
  //         }
  //         this.spinner = false;
  //         this.loaded = true;
  //       } else {
  //         this.collectionSize = data.length;
  //         this.programs = this.shuffle(data);
  //         this.spinner = false;
  //         this.loaded = true;
  //       }
  //     });
  // }

  // // search Programs by name
  // onSearch(name: any) {
  //   this.httpService
  //     .post(
  //       `https://admin-mfyg726r7q-uc.a.run.app/filter/1?name=${name.value}&city=None&Language=None&type=None&level=None&sort=None`,
  //       httpOptions
  //     )
  //     .subscribe((data: any) => {
  //       if (data) {
  //         this.spinner = false;
  //         this.loaded = true;
  //         this.collectionSize = data.length;
  //         this.programs = this.shuffle(data);
  //       }
  //     });
  // }

  // ngOnInit(): void {
  //   this.subscription = this.data.currentMessageName.subscribe(
  //     (message) => (this.programNameSearch = message)
  //   );
  //   this.subscription = this.data.currentMessageCategory.subscribe(
  //     (message) => (this.categoryNameFilter = message)
  //   );

  //   // display all cities
  //   this.cities = [
  //     {
  //       name: 'Aix-en-Provence',
  //       value: 'Aix-en-Provence',
  //     },
  //     {
  //       name: 'All campus',
  //       value: 'All+%26+campus',
  //     },
  //     {
  //       name: 'Angers',
  //       value: 'Angers',
  //     },
  //     {
  //       name: 'Bad Honnef',
  //       value: 'Bad+%26+Honnef',
  //     },
  //     {
  //       name: 'Barcelona',
  //       value: 'Barcelona',
  //     },
  //     {
  //       name: 'Beijing',
  //       value: 'Beijing',
  //     },
  //     {
  //       name: 'Belo Horizonte',
  //       value: 'Belo+%26+Horizonte',
  //     },
  //     {
  //       name: 'Berlin',
  //       value: 'Berlin',
  //     },
  //     {
  //       name: 'Bordeaux',
  //       value: 'Bordeaux',
  //     },
  //     {
  //       name: 'Brest',
  //       value: 'Brest',
  //     },
  //     {
  //       name: 'Budapest',
  //       value: 'Budapest',
  //     },
  //     {
  //       name: 'Caen',
  //       value: 'Caen',
  //     },
  //     {
  //       name: 'Cape Town',
  //       value: 'Cape+%26+Town',
  //     },
  //     {
  //       name: 'Cholet',
  //       value: 'Cholet',
  //     },
  //     {
  //       name: 'Clermont',
  //       value: 'Clermont',
  //     },
  //     {
  //       name: 'Châteauroux',
  //       value: 'Châteauroux',
  //     },
  //     {
  //       name: 'Dijon',
  //       value: 'Dijon',
  //     },
  //     {
  //       name: 'Hamburg',
  //       value: 'Hamburg',
  //     },
  //     {
  //       name: 'Iserlohn',
  //       value: 'Iserlohn',
  //     },
  //     {
  //       name: 'La Rochelle',
  //       value: 'La+%26+Rochelle',
  //     },
  //     {
  //       name: 'Laussane',
  //       value: 'Laussane',
  //     },
  //     {
  //       name: 'Le Havre',
  //       value: 'Le+%26+Havre',
  //     },
  //     {
  //       name: 'Lille',
  //       value: 'Lille',
  //     },
  //     {
  //       name: 'Lisbon',
  //       value: 'Lisbon',
  //     },
  //     {
  //       name: 'Lyon',
  //       value: 'Lyon',
  //     },
  //     {
  //       name: 'Marseille',
  //       value: 'Marseille',
  //     },
  //     {
  //       name: 'Metz',
  //       value: 'Metz',
  //     },
  //     {
  //       name: 'Montpellier',
  //       value: 'Montpellier',
  //     },
  //     {
  //       name: 'Nancy',
  //       value: 'Nancy',
  //     },
  //     {
  //       name: 'Nantes',
  //       value: 'Nantes',
  //     },
  //     {
  //       name: 'Nice',
  //       value: 'Nice',
  //     },
  //     {
  //       name: 'Niort',
  //       value: 'Niort',
  //     },
  //     {
  //       name: 'Orleans',
  //       value: 'Orleans',
  //     },
  //     {
  //       name: 'Oxford',
  //       value: 'Oxford',
  //     },
  //     {
  //       name: 'Paris',
  //       value: 'Paris',
  //     },
  //     {
  //       name: 'Paris/Shanghai',
  //       value: 'Paris/Shanghai',
  //     },
  //     {
  //       name: 'Quebec',
  //       value: 'Quebec',
  //     },
  //     {
  //       name: 'Raleigh',
  //       value: 'Raleigh',
  //     },
  //     {
  //       name: 'Regensburg',
  //       value: 'Regensburg',
  //     },
  //     {
  //       name: 'Reims',
  //       value: 'Reims',
  //     },
  //     {
  //       name: 'Rennes',
  //       value: 'Rennes',
  //     },
  //     {
  //       name: 'Rochefort',
  //       value: 'Rochefort',
  //     },
  //     {
  //       name: 'Reims',
  //       value: 'Reims',
  //     },
  //     {
  //       name: 'Rouen',
  //       value: 'Rouen',
  //     },
  //     {
  //       name: 'Singapore',
  //       value: 'Singapore',
  //     },
  //     {
  //       name: 'Sophia Antipolis',
  //       value: 'Sophia+%26+Antipolis',
  //     },
  //     {
  //       name: 'Strasbourg',
  //       value: 'Strasbourg',
  //     },
  //     {
  //       name: 'Suzhou',
  //       value: 'Suzhou',
  //     },
  //     {
  //       name: 'Toulouse',
  //       value: 'Toulouse',
  //     },
  //     {
  //       name: 'Tours',
  //       value: 'Tours',
  //     },
  //     {
  //       name: 'Troyes',
  //       value: 'Troyes',
  //     },
  //   ];

  //   // display all categories
  //   this.categories = [
  //     {
  //       name: 'Arts, Design & Architecture',
  //       value: 'Arts,+Design+%26+Architecture',
  //     },
  //     {
  //       name: 'Business & Management',
  //       value: 'Business+%26+Management',
  //     },
  //     {
  //       name: 'Computer Science & IT',
  //       value: 'Computer+Science+%26+IT',
  //     },
  //     {
  //       name: 'Engineering & Technology',
  //       value: 'Engineering+%26+Technology',
  //     },
  //   ];

  //   // if there is any passed value like (program's name, program's category) before navigate to program componant
  //   // if there isn't any passed value get all programs
  //   this.schoolsService.getAllSchools().subscribe(
  //     (data: any) => {
  //       if (data) {
  //         // get programs length to use in pagination
  //         // this.collectionSize = data.length
  //         // randomize the programs before return
  //         console.log(data);
  //         this.schools = data;
  //         this.displaySchools();
  //       }
  //     },
  //     (err) => {
  //       alert('somthing went wrong Please Reload the page');
  //       console.log(err);
  //     },
  //     () => {
  //       setTimeout(() => {
  //         // check if the user isn't login pop up the modal
  //         if (
  //           !Boolean(localStorage.getItem('isLoggedIn')) &&
  //           !Boolean(localStorage.getItem('EmpLoggedIn'))
  //         ) {
  //           // check if the modal isn't open, open it
  //           if (!this.modalService.hasOpenModals()) {
  //             this.modalService.open(this.registerModal);
  //           }
  //         }
  //       }, 3000);
  //     }
  //   );

  //   this.router.events.subscribe((evt) => {
  //     if (!(evt instanceof NavigationEnd)) {
  //       return;
  //     }
  //     window.scrollTo(0, 0);
  //   });
  // }

  // // check length of programs first
  // displaySchools() {
  //   if (this.schools.length > 0) {
  //     this.spinner = false;
  //     this.loaded = true;
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // // randomize programs
  // shuffle(progs: any) {
  //   let oldElement;
  //   for (let i = progs.length - 1; i > 0; i--) {
  //     let rand = Math.floor(Math.random() * (i + 1));

  //     oldElement = progs[i];

  //     progs[i] = progs[rand];

  //     progs[rand] = oldElement;
  //   }
  //   this.spinner = false;
  //   this.loaded = true;
  //   return progs;
  // }

  // ngAfterViewInit(): void {
  //   document.body.scrollTop = 0;
  // }
}
