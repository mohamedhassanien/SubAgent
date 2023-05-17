import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';

// To configure the snackBar
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ProgramsService } from './services/programs.service';
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

  goBack() {
    window.history.back();
  }

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

  page: any = 1;
  pageSize: number = 9;
  // to get screen width
  screenWidth: number = 0;

  // Intializing a Form
  filterForm!: FormGroup;

  // Arrays
  // Array to select Categories of programs
  categories: any[] = [];
  // Array of Favorites
  isFav: boolean[] = [];
  // Array of schools
  schools: string[] = [];
  oddSchools: string[] = [];
  // Array of cities
  oddCities: string[] = [];

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
  constructor(
    private programService: ProgramsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    // To recall get categories at first
    this.getCategories();
    // To Intialize the filter form before rendering the component
    // if (sessionStorage.length == 0) {
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
    // } else {
    if (
      sessionStorage.getItem('searchInput') &&
      !sessionStorage.getItem('homeSearch')
    ) {
      let searchInputSession = sessionStorage.getItem('searchInput');

      // const typeSession = String(sessionStorage.getItem('type'));
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
        // 'type': new FormControl(typeSession),
        city: new FormControl(citySession),
        category: new FormControl(categorySession),
        school: new FormControl(schoolSession),
        language: new FormControl(languageSession),
        budget: new FormControl(budgetSession),
        skill: new FormControl(skillSession),
      });
      // }
    }

    // To search from home page
    if (sessionStorage.getItem('homeSearch')) {
      this.filterForm = new FormGroup({
        search: new FormControl(sessionStorage.getItem('homeSearch')),
        // 'type': new FormControl(typeSession),
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
    this.getAllPrograms();

    // To close filter box in case it was opened before
    this.filterBox = false;
  }

  // to get all categories
  getCategories() {
    this.programService.getCategories().subscribe((data) => {
      let dataArray = data as any[];
      let newCategories: any[] = [];
      dataArray.forEach((category) => {
        newCategories.push([category[0], category[0].replace('&', '%26')]);
      });
      this.categories = newCategories;
      console.log(this.categories);
    });
  }

  // a function to get all programs
  getAllPrograms() {
    this.programs = [];
    this.isLoading = true;

    if (
      !sessionStorage.getItem('searchInput') &&
      !sessionStorage.getItem('homeSearch')
    ) {
      this.programService.getAllPrograms().subscribe(
        (data) => {
          // setting the data to an array type
          let dataArray: any = data as [];
          this.bachelor = [];
          this.master = [];
          this.mba = [];
          this.phd = [];

          // To get length of master, backelor, MBA, PHD and assign schools and cities
          dataArray.map(
            (obj: {
              level: string;
              schoolName: string;
              city: any;
              logo: string;
            }) => {
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
            }
          );
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
          // assiging data to programs
          this.programs = this.shuffle(dataArray);
          this.programsLength = this.programs.length;
          this.isLoading = false;
        },
        (error) => {
          this.programs = [];
          this.serverError = true;
          this.isLoading = false;
        }
      );
    } else if (sessionStorage.getItem('searchInput')) {
      const searchInputSession = String(sessionStorage.getItem('searchInput'));
      const typeSession = 'None';
      const citySession = String(sessionStorage.getItem('city'));
      const categorySession = String(sessionStorage.getItem('category'));
      const schoolSession = String(sessionStorage.getItem('school'));
      const languageSession = String(sessionStorage.getItem('language'));
      const budgetSession = String(sessionStorage.getItem('budget'));
      const skillSession = String(sessionStorage.getItem('skill'));

      this.filterForm.patchValue({
        search: searchInputSession == 'None' ? null : searchInputSession,
        city: citySession,
        category: categorySession,
        shool: schoolSession,
        language: languageSession,
        budget: budgetSession,
        skill: skillSession,
      });
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
            // To get length of master, backelor, MBA, PHD and assign schools and cities
            dataArray.map((obj: { level: string }) => {
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
            this.programService.getCities().subscribe((data) => {
              this.oddCities = data as [];
            });
            this.programService.getSchools().subscribe((data) => {
              this.oddSchools = data as [];
            });

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

    if (sessionStorage.getItem('homeSearch')) {
      let name = sessionStorage.getItem('homeSearch');
      console.log(name);
      if (name == null) name = 'None';

      this.programService
        .getAllFilteredPrograms(
          name,
          'None',
          'None',
          'None',
          'None',
          'None',
          'None',
          'None'
        )
        .subscribe((data) => {
          let dataArray: any = data as [];
          this.bachelor = [];
          this.master = [];
          this.mba = [];
          this.phd = [];
          // To get length of master, backelor, MBA, PHD and assign schools and cities
          dataArray.map((obj: { level: string }) => {
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
          this.programService.getCities().subscribe((data) => {
            this.oddCities = data as [];
          });
          this.programService.getSchools().subscribe((data) => {
            this.oddSchools = data as [];
          });

          // assiging data to programs
          this.programs = this.shuffle(dataArray);
          this.programsLength = this.programs.length;
          if (this.programs.length == 0) {
            this.noProgramsFound = true;
          } else {
            this.noProgramsFound = false;
          }
          this.isLoading = false;
        });
      sessionStorage.removeItem('homeSearch');
    }
  }

  // To get all whislisted programs for a student
  getAllWishlistedPrograms() {
    let studentName = String(localStorage.getItem('userName'));
    this.programService.getWishlistedPrograms(studentName).subscribe((data) => {
      if (data) {
        let dataArray = data as [];
        if (dataArray) {
          dataArray.forEach((program) => {
            let everyFav = program['programs'] as [];
            if (everyFav) {
              everyFav.forEach((element) => {
                this.isFav[element['id']] = true;
              });
            }
          });
        }
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
    this.getAllPrograms();
  }
  //  searchVal:string = ''
  // Submit the filterForm Form
  onSubmit(filterForm: any) {
    this.programs = [];
    this.isLoading = true;
    this.serverError = false;
    this.noProgramsFound = false;
    this.page = 1;

    let searchValue;
    if (filterForm.value.search == null) {
      searchValue = 'None';
    } else {
      searchValue = filterForm.value.search;
    }

    // const type = filterForm.value.type;
    const type = 'None';
    const city = filterForm.value.city;
    const category = filterForm.value.category;
    const school = filterForm.value.school;
    const language = filterForm.value.language;
    const budget = filterForm.value.budget;
    const skill = filterForm.value.skill;

    // sessionStorage.setItem('searchInput', searchValue);
    sessionStorage.setItem('type', filterForm.value.type);
    sessionStorage.setItem('city', filterForm.value.city);
    sessionStorage.setItem('category', filterForm.value.category);
    sessionStorage.setItem('school', filterForm.value.school);
    sessionStorage.setItem('language', filterForm.value.language);
    sessionStorage.setItem('budget', filterForm.value.budget);
    sessionStorage.setItem('skill', filterForm.value.skill);

    this.programService
      .getAllFilteredPrograms(
        searchValue,
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
  }

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
      this.programService.wishlistProgram(id, studentName).subscribe((data) => {
        console.log(data);
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
          console.log(data);
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
      let rand = Math.floor(Math.random() * (i + 1));
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
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1199) this.pageSize = 9;
    else if (this.screenWidth <= 1199 && this.screenWidth >= 768)
      this.pageSize = 4;
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
    if (this.login == 'true') {
      this.router.navigate(['/landing/programs', x, y]);
    }
    if (this.login == null) {
      Swal.fire({
        title: 'Sorry!',
        text: 'You Must be Logged in first',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6F77F4',
        cancelButtonColor: '#f2818b',
        confirmButtonText: 'Login Now',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/auth/login']);
        }
      });
    }
  }
}
