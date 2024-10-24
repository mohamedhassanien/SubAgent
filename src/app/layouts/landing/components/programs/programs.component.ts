import { ProgramsService } from './../../../../shared/services/programs/programs.service';

import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { ActivatedRoute, Router } from '@angular/router';

// To configure the snackBar
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Options } from '@angular-slider/ngx-slider';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProgramsComponent implements OnInit {
  [x: string]: any;
  // animation options
  introAnimation: AnimationOptions = {
    path: '../../../../../assets/images/programs/json/PROGRAM STUDENT ANIMATION.json',
  };
  emptyFilterAnimation: AnimationOptions = {
    path: '../../../../../assets/images/programs/json/empty-filter.json',
  };
  educationAnimation: AnimationOptions = {
    path: '../../../../../assets/images/programs/json/global-education.json',
  };
  //////////////////////// Variables ////////////////////////////////

  goBack() {
    window.history.back();
  }
  myControl = new FormControl('');
  AutoOptions: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  // Position of snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Program Container
  programs: any[] = [];
  programsLength: number = 0;
  master: any[] = [];
  bachelor: any[] = [];
  mba: any[] = [];
  phd: any[] = [];
  cities: any[] = [];
  startdate: any[] = [];
  reset: boolean = false;
  toggle = false;

  page: any = 1;
  pageSize: number = 9;
  // to get screen width
  screenWidth: number = 0;

  // Intializing a Form
  filterForm!: FormGroup;
  school: any;

  // Arrays
  // Array to select Categories of programs
  newCategories: any[] = [
    ['Arts, Design & Architecture', 'Arts, Design %26 Architecture'],
    ['Business & Management', 'Business %26 Management'],
    ['Computer Science & IT', 'Computer Science %26 IT'],
    ['Engineering & Technology', 'Engineering %26 Technology'],
    ['Marketing & communication', 'Marketing %26 communication'],
  ];
  // Array for levels
  Levels: any[] = [
    ['1ère année', 'Bac'],
    ['2ème année', 'Bac+1'],
    ['3ème année', 'Bac+2'],
    ['4ème année', 'Bac+3'],
    ['5ème année', 'Bac+4'],
    ['6ème année', 'Bac+5'],
  ];
  // Array for budget
  Budgets: any[] = [
    ['High To Low', '0'],
    ['Low To High', '1'],
  ];
  // Array for language
  languages: any[] = [

    ['Anglais', 'Anglais'],
    ['Français', 'Français'],
  ];
  // Array of Favorites
  isFav: boolean[] = [];
  // Array of schools
  schools: string[] = [];
  oddSchools: string[] = [];
  // Array of cities
  oddCities: string[] = [];
  citiesArray: string[] = [];

  // Conditions
  // Loading Condition
  isLoading: boolean = false;
  // API Error
  serverError: boolean = false;
  // Empty Filter
  noProgramsFound: boolean = false;
  // To Open filter Box on small screens
  filterBox: boolean = false;
  logos: string[] = [];
  oddLogos: string[] = [];
  hg: any = 'None';
  constructor(
    private programService: ProgramsService,
    private _snackBar: MatSnackBar,
    private _sharedService: SharedService,
    private router: Router,
    private primeNGConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute
  ) {
    this.getScreenSize();
    this.hg = this.activatedRoute.snapshot.queryParamMap.get('programName');
  }
  toggleDrop() {

    this.toggle = !this.toggle
  }
  toggleDropStyle() {
    return this.toggle ? 'block' : 'None';
  }
  // tags filters
  fschool: any = String(sessionStorage.getItem('school')) === 'None' ? '' : String(sessionStorage.getItem('school'));
  fcity: string = '';
  fcategory: string = '';
  flanguage: string = '';
  fbudget: any = '';
  fskill: string = '';
  sourcebudget: any = '';
  @ViewChild('sc') sc!: ElementRef;
  @ViewChild('ca') ca!: ElementRef;
  @ViewChild('le') le!: ElementRef;
  @ViewChild('bd') bd!: ElementRef;
  @ViewChild('la') la!: ElementRef;
  @ViewChild('lc') lc!: ElementRef;
  @ViewChild('hid') hid!: ElementRef;
  @ViewChild('budgetselect') budgetselect!: ElementRef;

  applyClicked = false;
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  // value = 0;
  schoolsName: any;
  value: any = '';
  options: Options = {
    floor: 5000,
    step: 1000,
    ceil: 100000,
    // minRange: 5000,
    // maxRange: 15000,
    // pushRange: true,
  };
  // disabled = false;
  // max = 100000;
  // min = 5000;
  // showTicks = false;
  // step = 1000;
  // thumbLabel = false;
  // value:any = 0
  // value2:any

  optionsa: AnimationOptions = {
    path: 'assets/images/programs/json/global-education.json',
  };
  //////////////////////////// OnIt ////////////////////////////////
  ngOnInit(): void {

    this.getAllPrograms();
    this.getAllProgramsSearch();
    this.getAllCities();



    this.programService.getSchoolName().subscribe((d) => {
      this.schoolsName = d[0].data;
      console.log(this.schoolsName)

    });

    if (sessionStorage.getItem("homeSearch") != '') {

      let search = sessionStorage.getItem("homeSearch");

      this.programService
        .getAllFilteredPrograms(
          search,
          'None',
          'None',
          'None',
          'None',
          'None',
          'None',
          'None'
        )
        .subscribe((d) => {
          let dataArraay: any = d as [];
          this.programs = dataArraay;
          this.isLoading = false;
          sessionStorage.setItem("homeSearch", "")
        });

    }

    else {
      sessionStorage.setItem("homeSearch", "")
      this.getAllPrograms();
    }
    this.place();
    this.primeNGConfig.ripple = true;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    // this.fschool = String(sessionStorage.getItem('school')) === 'None' ? '' : String(sessionStorage.getItem('school'))

    this.filterForm = new FormGroup({
      search: new FormControl(null),
      city: new FormControl('None'),
      category: new FormControl('None'),
      school: new FormControl('None'),
      language: new FormControl('None'),
      budget: new FormControl('None'),
      skill: new FormControl('None'),
    });
    if (
      sessionStorage.getItem('searchInput') &&
      !sessionStorage.getItem('homeSearch')
    ) {
      let searchInputSession = sessionStorage.getItem('searchInput');
      const citySession = String(sessionStorage.getItem('city'));
      const categorySession = String(sessionStorage.getItem('category'));
      const schoolSession = String(sessionStorage.getItem('school'));
      const languageSession = String(sessionStorage.getItem('language'));
      const budgetSession = String(sessionStorage.getItem('budget'));
      const skillSession = String(sessionStorage.getItem('skill'));

      if (searchInputSession == 'None') {
        searchInputSession = null;
      }

      this.filterForm = new FormGroup({
        search: new FormControl(searchInputSession),
        city: new FormControl(citySession),
        category: new FormControl(categorySession),
        school: new FormControl(schoolSession),
        language: new FormControl(languageSession),
        budget: new FormControl(budgetSession),
        skill: new FormControl(skillSession),
      });
    }

    // To search from home page
    if (sessionStorage.getItem('homeSearch')) {
      this.filterForm = new FormGroup({
        search: new FormControl(sessionStorage.getItem('homeSearch')),
        city: new FormControl('None'),
        category: new FormControl('None'),
        school: new FormControl('None'),
        language: new FormControl('None'),
        budget: new FormControl('None'),
        skill: new FormControl('None'),
      });
    }

    // To recall all the wishlisted programs for the student
    this.getAllWishlistedPrograms();

    if (sessionStorage.getItem('homeSearch')) {
      sessionStorage.removeItem('searchInput');
      sessionStorage.removeItem('city');
      sessionStorage.removeItem('category');
      sessionStorage.removeItem('school');
      sessionStorage.removeItem('language');
      sessionStorage.removeItem('budget');
      sessionStorage.removeItem('skill');
    }

    // To recall all programs and assign it to an array after page is loaded


    // To close filter box in case it was opened before
    this.filterBox = false;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.AutoOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  change(e: any) {
    this.value = e.target.value;
  }
  preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  // a function to get all programs
  getAllProgramsSearch() {
    this.programService.getAllProgramsSearchName().subscribe(data => {
      console.log(data);
      this.AutoOptions = data;
    })
  }
  getAllPrograms() {
    this.programs = [];
    this.isLoading = true;
    this.programService.getAllPrograms().subscribe(
      (data: any) => {
        console.log('programe');
        this.isLoading = false;
        // setting the data to an array type
        let dataArray: any = data as [];
        dataArray.forEach((e) => {
          if (e.fee == 0 || e.fee == '-') {
            e.fee = 'Alternance only';
          }
        });
        this.bachelor = [];
        this.master = [];
        this.mba = [];
        this.phd = [];

        // To get length of master, backelor, MBA, PHD and assign schools and cities
        dataArray.map((obj) => {
          if (obj.level == 'Bachelor') {
            this.bachelor.push(obj.level);
          }
          if (obj.level == 'Master') {
            this.master.push(obj.level);
          }
          if (obj.level == 'MBA') {
            this.mba.push(obj.level);
          }
          if (obj.level == 'PHD') {
            this.phd.push(obj.level);
          }
          this.schools.push(obj.schoolName);
          this.cities.push(obj.city);
          this.logos.push(obj.logo);
          this.startdate.push(obj.start_date);

        });
        // getting the odd schools from schools array and sorting them in an ascending order
        for (let i = 0; i < this.schools.length; i++) {
          if (
            !this.oddSchools.includes(this.schools[i]) &&
            this.schools[i] != '' &&
            this.schools[i] != ' ' &&
            this.schools[i] != '-'
          ) {
            this.oddSchools.push(this.schools[i].replace(':', '_'));
          }
        }
        this.oddSchools.sort((a, b) => (a > b ? 1 : -1));

        // getting the odd logos from logo array and sorting them in an ascending order
        for (let i = 0; i < this.logos.length; i++) {
          if (
            !this.oddLogos.includes(this.logos[i]) &&
            this.logos[i] != '' &&
            this.logos[i] != ' ' &&
            this.logos[i] != '-'
          ) {
            this.oddLogos.push(this.logos[i]);
          }
        }
        this.oddLogos.sort((a, b) => (a > b ? 1 : -1));

        // getting the odd cities from cities array and sorting them in an ascending order
        for (let i = 0; i < this.cities.length; i++) {
          if (
            !this.oddCities.includes(this.cities[i]) &&
            this.cities[i] != '' &&
            this.cities[i] != ' ' &&
            this.cities[i] != '-'
          ) {
            this.oddCities.push(this.cities[i]);
          }
        }

        this.oddCities.sort((a, b) => (a > b ? 1 : -1));
        console.log(this.hg);
        if (this.hg === null) {
          // assiging data to programs
          this.programs = this.shuffle(dataArray);
          this.programsLength = this.programs.length;
          this.isLoading = false;
        }

        if (this.hg !== null) {
          this.programService
            .getAllFilteredPrograms(
              'None',
              'None',
              'None',
              'None',
              'None',
              'None',
              this.hg,
              'None'
            )
            .subscribe((d) => {
              let dataArraay: any = d as [];
              this.programs = dataArraay;
              this.isLoading = false;
              this.reset = true;
              if (dataArraay.length === 0) {
                this.noProgramsFound = true;
              }
            });
        }
      }
      // (error) => {
      //   this.programs = [];
      //   this.serverError = true;
      //   this.isLoading = false;
      // }
    );
    if (
      !sessionStorage.getItem('searchInput') &&
      !sessionStorage.getItem('homeSearch')
    ) {

    } else if (sessionStorage.getItem('searchInput')) {
      // getting data form session storage
      // const typeSession = String(sessionStorage.getItem('type'));

      const searchInputSession = String(sessionStorage.getItem('searchInput'));
      const typeSession = 'None';
      const citySession = String(sessionStorage.getItem('city'));
      const categorySession = String(sessionStorage.getItem('category'));
      const schoolSession = String(sessionStorage.getItem('school'));
      const languageSession = String(sessionStorage.getItem('language'));
      const budgetSession = String(sessionStorage.getItem('budget'));
      const skillSession = String(sessionStorage.getItem('skill'));

      // assiging values to form
      // 'type': typeSession is deleted here ======================================
      this.filterForm.patchValue({
        search: searchInputSession == 'None' ? null : searchInputSession,
        city: citySession,
        category: categorySession,
        shool: schoolSession,
        language: languageSession,
        budget: budgetSession,
        skill: skillSession,
      });
      // typeSession is deleted here after languageSession ==========================================
      this.programService
        .getAllFilteredPrograms(
          searchInputSession,
          citySession,
          languageSession,
          typeSession,
          skillSession,
          budgetSession,
          schoolSession,
          categorySession
        )
        .subscribe(
          (data) => {
            let dataArray: any = data as [];
            this.bachelor = [];
            this.master = [];
            this.mba = [];
            this.phd = [];
            console.log(data, 'sdasdadsw');
            // To get length of master, backelor, MBA, PHD and assign schools and cities
            dataArray.map((obj) => {
              if (obj.level == 'Bachelor') {
                this.bachelor.push(obj.level);
              }
              if (obj.level == 'Master') {
                this.master.push(obj.level);
              }
              if (obj.level == 'MBA') {
                this.mba.push(obj.level);
              }
              if (obj.level == 'PHD') {
                this.phd.push(obj.level);
              }
            });
            // `this.programService.getAllCities().subscribe((data) => {
            //   console.log(data)
            //   this.oddCities = data as [];
            //   console.log(this.oddCities)
            // });`
            if (dataArray.length == 0) {
              this.noProgramsFound = true;
            }
            // assiging data to programs
            if (budgetSession == '0' || budgetSession == '1') {
              this.programs = dataArray;
            } else {
              this.programs = this.shuffle(dataArray);
            }
            this.programsLength = this.programs.length;
            this.isLoading = false;
          },
          () => {
            this.programs = [];
            this.serverError = true;
            this.isLoading = false;
          }
        );
    }

    // if (sessionStorage.getItem('homeSearch')) {
    //   let name = sessionStorage.getItem('homeSearch');
    //   if (name == null) name = 'None';

    //   this.programService
    //     .getAllFilteredPrograms(
    //       name,
    //       'None',
    //       'None',
    //       'None',
    //       'None',
    //       'None',
    //       'None',
    //       'None'
    //     )
    //     .subscribe((data) => {
    //       let dataArray: any = data as [];
    //       this.bachelor = [];
    //       this.master = [];
    //       this.mba = [];
    //       this.phd = [];
    //       // To get length of master, backelor, MBA, PHD and assign schools and cities
    //       dataArray.map((obj) => {
    //         if (obj.level == 'Bachelor') {
    //           this.bachelor.push(obj.level);
    //         }
    //         if (obj.level == 'Master') {
    //           this.master.push(obj.level);
    //         }
    //         if (obj.level == 'MBA') {
    //           this.mba.push(obj.level);
    //         }
    //         if (obj.level == 'PHD') {
    //           this.phd.push(obj.level);
    //         }
    //       });
    //       this.programService.getCities().subscribe((data) => {
    //         this.oddCities = data as [];
    //       });
    //       this.programService.getSchools().subscribe((data) => {
    //         this.oddSchools = data as [];
    //       });

    //       // assiging data to programs
    //       this.programs = this.shuffle(dataArray);
    //       this.programsLength = this.programs.length;
    //       if (this.programs.length == 0) {
    //         this.noProgramsFound = true;
    //       } else {
    //         this.noProgramsFound = false;
    //       }
    //       this.isLoading = false;
    //     });
    //   sessionStorage.removeItem('homeSearch');
    // }
  }

  // To get all whislisted programs for a student
  getAllWishlistedPrograms() {
    let studentName = String(localStorage.getItem('userName'));
    let numderWishlist = 0;
    this.programService
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

  // To Empty Search Input and reset the name parameter
  emptySearch(filterForm: any) {
    filterForm.value.search = null;
    sessionStorage.setItem('searchInput', 'None');
    this.noProgramsFound = false;
    this.serverError = false;
    this.getAllPrograms();
  }

  // To reset filter and get back all the intial values
  resetFilter() {
    sessionStorage.clear();
    this.hg = null;
    this.filterForm = new FormGroup({
      search: new FormControl(null),
      // 'type': new FormControl('None'),
      city: new FormControl('None'),
      category: new FormControl('None'),
      school: new FormControl('None'),
      language: new FormControl('None'),
      budget: new FormControl('None'),
      skill: new FormControl('None'),
    });
    this._snackBar.open('Filter has been reset!', '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.noProgramsFound = false;
    this.serverError = false;
    this.filterBox = false;
    this.reset = false;
    this.sc.nativeElement.style.display = 'none';
    this.ca.nativeElement.style.display = 'none';
    this.le.nativeElement.style.display = 'none';
    this.bd.nativeElement.style.display = 'none';
    this.la.nativeElement.style.display = 'none';
    this.lc.nativeElement.style.display = 'none';
    this.getAllPrograms();
  }
  clicked() {
    const budget = this.value;
    this.onSubmit(this.filterForm);
  }

  placebudget: any;
  place() {
    if (this.fbudget == '' || this.fbudget == 'None') {
      this.placebudget = 'Budget';
    } else {
      this.placebudget = this.value;
    }
  }
  // Submit the filterForm Form
  onSubmit(filterForm: any) {
    this.place();
    this.programs = [];
    this.isLoading = true;
    this.serverError = false;
    this.noProgramsFound = false;
    this.reset = true;
    this.page = 1;
    let name = '';

    console.log(filterForm.value.budget);
    if (this.value == 5000) {
      filterForm.value.budget = 'None';
    }
    if (this.value !== 5000) {
      filterForm.value.budget = this.value;
    }

    let searchValue = this.search;

    const type = 'None';
    const city = filterForm.value.city;
    const category = filterForm.value.category;
    let school = filterForm.value.school
    console.log(school)
    const language = filterForm.value.language;
    const budget = filterForm.value.budget;
    const skill = filterForm.value.skill;
    // console.log(filterForm.value.budget, filterForm.value.language,this.value);

    // sessionStorage.setItem('searchInput', searchValue);
    sessionStorage.setItem('type', filterForm.value.type);
    sessionStorage.setItem('city', filterForm.value.city);
    sessionStorage.setItem('category', filterForm.value.category);
    sessionStorage.setItem('school', school);
    sessionStorage.setItem('language', filterForm.value.language);
    sessionStorage.setItem('skill', filterForm.value.skill);
    sessionStorage.setItem('budget', filterForm.value.budget);

    // tags filters
    this.fschool = String(sessionStorage.getItem('school'));
    this.fcity = String(sessionStorage.getItem('city'));
    this.fcategory = String(sessionStorage.getItem('category')).replace(
      /%26/g,
      '&'
    );
    this.flanguage =
      String(sessionStorage.getItem('language')).charAt(0).toUpperCase() +
      String(sessionStorage.getItem('language')).slice(1);
    this.fskill = String(sessionStorage.getItem('skill'));
    this.fbudget = String(sessionStorage.getItem('budget'));

    this.programService
      .getAllFilteredPrograms(
        name,
        city,
        language,
        type,
        skill,
        budget,
        school,
        category
      )
      .subscribe(
        (data) => {
          let dataArray: any = data as [];
          this.bachelor = [];
          this.master = [];
          this.mba = [];
          this.phd = [];
          if (budget == '0' || budget == '1') {
            this.programs = dataArray;
          } else {
            this.programs = this.shuffle(dataArray);
          }
          this.programsLength = this.programs.length;
          this.isLoading = false;
          if (dataArray.length == 0) {
            this.noProgramsFound = true;
          }
        },
        (error) => {
          this.programs = [];
          this.serverError = true;
          this.isLoading = false;
        }
      );

    if (filterForm.value.school === 'None') {
      this.sc.nativeElement.style.display = 'none';
    } else {
      this.sc.nativeElement.style.display = 'block';
    }
    if (filterForm.value.category === 'None') {
      this.ca.nativeElement.style.display = 'none';
    } else {
      this.ca.nativeElement.style.display = 'block';
    }
    if (filterForm.value.skill === 'None') {
      this.le.nativeElement.style.display = 'none';
    } else {
      this.le.nativeElement.style.display = 'block';
    }
    if (filterForm.value.budget === 'None') {
      this.bd.nativeElement.style.display = 'none';
    } else {
      this.bd.nativeElement.style.display = 'block';
    }
    if (filterForm.value.language === 'None') {
      this.la.nativeElement.style.display = 'none';
    } else {
      this.la.nativeElement.style.display = 'block';
    }
    if (filterForm.value.city === 'None') {
      this.lc.nativeElement.style.display = 'none';
    } else {
      this.lc.nativeElement.style.display = 'block';
    }
  }

  // close mat-select

  // Add wishlisted programs
  addToWishlist(id: number) {
    if (!Boolean(localStorage.getItem('isLoggedIn'))) {
      this._snackBar.open('You Must be Logged in first!', '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }

    this.isFav[id] = !this.isFav[id];
    const studentName = String(localStorage.getItem('userName'));
    // in case adding a program to wishlist
    if (this.isFav[id] == true) {
      this.programService
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
      this.programService
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

  // Shuffling the programs in a random order
  shuffle(programs: any[]) {
    let oldElement;
    for (let i = programs.length - 1; i > 0; i--) {
      let rand = Math.floor(0.27 * (i + 1));
      oldElement = programs[i];
      programs[i] = programs[rand];
      programs[rand] = oldElement;
    }
    return programs;
  }

  // Scroll down to programs
  goDown() {
    document.getElementById('programs-container')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  // To get screen Width
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1199) this.pageSize = 12;
    else if (this.screenWidth <= 1199 && this.screenWidth >= 768)
      this.pageSize = 8;
    else if (this.screenWidth < 768) this.pageSize = 6;
  }

  // To get card background color for small screens
  getColor() {
    if (this.screenWidth < 768) {
      return 'linear-gradient(244deg, #FFF7F7 0%, #EDEEFF 100%)';
    } else {
      return '#F7F7F7';
    }
  }

  // To open filter screen on small screens
  openFilterScreen() {
    this.filterBox = true;
  }
  // To close filter screen on small screens
  closeFilterScreen() {
    this.filterBox = false;
  }

  login: any;
  checkLogin(x: any, y: any) {
    this.login = localStorage.getItem('isLoggedIn');
    this.router.navigate(['/landing/programs', x, y]);
    // if (this.login == 'true') {

    // }
    // if (this.login == null) {
    //   Swal.fire({
    //     title: 'Sorry!',
    //     text: 'You Must be Logged in first',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#16294f',
    //     cancelButtonColor: '#f2818b',
    //     confirmButtonText: 'Login Now',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.router.navigate(['/auth/login']);
    //     }
    //   });
    // }
  }

  // tags filters
  //********************************************************************************** */
  removefilter(filterForm: any) {
    this.fschool = '';
    this.filterForm = new FormGroup({
      search: new FormControl(null),
      city: new FormControl(filterForm.value.city),
      category: new FormControl(filterForm.value.category),
      school: new FormControl('None'),
      language: new FormControl(filterForm.value.language),
      budget: new FormControl(filterForm.value.budget),
      skill: new FormControl(filterForm.value.skill),
    });
    this.onSubmit(this.filterForm);
  }
  //********************************************************************************** */
  removefilter1(filterForm: any) {
    this.fschool = '';
    this.filterForm = new FormGroup({
      search: new FormControl(null),
      city: new FormControl(filterForm.value.city),
      category: new FormControl('None'),
      school: new FormControl(filterForm.value.school),
      language: new FormControl(filterForm.value.language),
      budget: new FormControl(filterForm.value.budget),
      skill: new FormControl(filterForm.value.skill),
    });
    this.onSubmit(this.filterForm);
  }
  //********************************************************************************** */
  removefilter2(filterForm: any) {
    this.fskill = '';
    this.filterForm = new FormGroup({
      search: new FormControl(null),
      city: new FormControl(filterForm.value.city),
      category: new FormControl(filterForm.value.category),
      school: new FormControl(filterForm.value.school),
      language: new FormControl(filterForm.value.language),
      budget: new FormControl(filterForm.value.budget),
      skill: new FormControl('None'),
    });
    this.onSubmit(this.filterForm);
  }
  //********************************************************************************** */
  removefilter3(filterForm: any) {
    this.fbudget = '';
    this.value = 5000;

    this.filterForm = new FormGroup({
      search: new FormControl(null),
      city: new FormControl(filterForm.value.city),
      category: new FormControl(filterForm.value.category),
      school: new FormControl(filterForm.value.school),
      language: new FormControl(filterForm.value.language),
      budget: new FormControl('None'),
      skill: new FormControl(filterForm.value.skill),
    });
    console.log(filterForm.value.budget);
    this.onSubmit(this.filterForm);
  }
  //********************************************************************************** */
  removefilter4(filterForm: any) {
    this.flanguage = '';
    this.filterForm = new FormGroup({
      search: new FormControl(null),
      city: new FormControl(filterForm.value.city),
      category: new FormControl(filterForm.value.category),
      school: new FormControl(filterForm.value.school),
      language: new FormControl('None'),

      budget: new FormControl(filterForm.value.budget),
      skill: new FormControl(filterForm.value.skill),
    });
    this.onSubmit(this.filterForm);
  }
  //********************************************************************************** */
  removefilter5(filterForm: any) {
    this.fcity = '';
    this.filterForm = new FormGroup({
      search: new FormControl(null),
      city: new FormControl('None'),
      category: new FormControl(filterForm.value.category),
      school: new FormControl(filterForm.value.school),
      language: new FormControl(filterForm.value.city),
      budget: new FormControl(filterForm.value.budget),
      skill: new FormControl(filterForm.value.skill),
    });
    this.onSubmit(this.filterForm);
  }

  navbarFixed: boolean = false;
  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 240) {
      this.navbarFixed = true;
    } else this.navbarFixed = false;
  }

  loadPage() {
    window.scroll(0, 0);
  }

  getAllCities() {
    this.programService.getAllCities().subscribe((data: any) => {
      console.log(data.data)
      this.citiesArray = data.data;
    });
  }

}
