import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { TranslatorService } from 'src/app/shared/services/translate/translate.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // User Data
  name: string = '';
  username: string = '';
  isLoggedIn: boolean = false;
  profilePic: string = '';
  type: string = '';
  // offers
  offer: string = '';
  router: string = '';

  // Conditions
  searchMenu: boolean = false;
  navMenu: boolean = false;
  showInput: boolean = true;

  // Lists to loop on html
  // Lists for dropdowns
  categories: any[] = [
    ['Arts, Design & Architecture', 'Arts, Design %26 Architecture'],
    ['Business & Management', 'Business %26 Management'],
    ['Computer Science & IT', 'Computer Science %26 IT'],
    ['Engineering & Technology', 'Engineering %26 Technology'],
    ['Marketing & communication', 'Marketing %26 communication'],
  ];

  marketPlaceLists: any[] = [
    ['Application', 'application'],
    ['Confirm', 'confirm'],
    ['Visa', 'visa'],
    ['Accommodation', 'accomodation'],
    ['In France', 'inFrance'],
    // ['Added Services', ],
  ];

  profileLinks: any[] = [
    // ['My profile', '/students/dashboard'],
    // ['Edit profile', '/students/myinfo'],
    ['Programs', '/landing/programs'],
    ['Logout', '/auth/login'],
  ];

  // Elements in HTML
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  @ViewChild('searchButton', { static: false }) searchButton!: ElementRef;
  @ViewChild('searchIcon', { static: false }) searchIcon!: ElementRef;
  @ViewChild('searchInputIcon', { static: false }) searchInputIcon!: ElementRef;

  constructor(
    private _router: Router,
    // private _Renderer: Renderer2,
    private _StudentsService: StudentsService,
    private _SharedService: SharedService,
    translate: TranslateService,
    private translator: TranslatorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this._SharedService.profilePictureChanged.subscribe((data: any) => {
      this.profilePic = data;
    });

    translate.setDefaultLang('fr');
  }

  changeLocale(locale: string) {
    this.translator.changeLocale(locale);
  }

  setFocus() {
    this.showInput = !this.showInput;
  }

  ngOnInit(): void {
    document.addEventListener('touchstart', function () {}, true);

    if (
      String(localStorage.getItem('isLoggedIn')) == 'true' ||
      String(localStorage.getItem('EmpLoggedIn')) == 'true'
    ) {
      this.isLoggedIn =
        Boolean(localStorage.getItem('isLoggedIn')) ||
        Boolean(localStorage.getItem('EmpLoggedIn'));
      this.name = String(localStorage.getItem('name'));
      this.username = String(localStorage.getItem('EmpName'));
      // this.profilePic = String(localStorage.getItem('picture'));
      this.type = String(localStorage.getItem('type'));
    }

    const email = localStorage.getItem('userEmail') as string;
    this._StudentsService.profile(email).subscribe((data: any) => {
      const [
        {
          status,
          data: [{ profile_picture_url: picture }],
        },
      ] = data;

      if (status === 200) {
        this.profilePic = picture;
      }
    });
  }

  // To Show search Menu
  showSearch() {
    this.searchMenu = !this.searchMenu;
  }
  showMenu() {
    this.navMenu = true;
  }

  goToPrograms(category: string) {
    sessionStorage.setItem('searchInput', 'None');
    sessionStorage.setItem('city', 'None');
    sessionStorage.setItem('category', category);
    sessionStorage.setItem('school', 'None');
    sessionStorage.setItem('language', 'None');
    sessionStorage.setItem('budget', 'None');
    sessionStorage.setItem('skill', 'None');
    this._router.navigate(['/landing/programs']);
  }

  searchText: string = '';
  // To search for a program/s
  searchForPrograms() {
    // const name = event.target.value;
    if (this.searchText != '') {
      this.searchMenu = false;
      sessionStorage.setItem('homeSearch', this.searchText);
      this._router.navigate(['/landing/programs']);
      $('li').click();
      this.searchText = '';
    }
  }

  // to logout
  logOut(condition: string) {
    if (condition == 'Logout') {
      localStorage.clear();
    }
  }
  logoutMob() {
    localStorage.clear();
    this._router.navigate(['/auth/login']);
  }

  // to navigate from small screens navbar
  logInPage() {
    this._router.navigate(['/auth/login']);
  }
  registerPage() {
    this._router.navigate(['/auth/register/student']);
  }

  getType() {
    if (this.type === 'student') return ['/students', this.name];
    else if (this.type === 'employee' || this.type === 'owner')
      return ['/employees', this.name, 'dashboard'];
    else return ['/employees', this.name, 'dashboard'];
  }
  navbarFixed: Boolean = false;
  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 100) {
      this.navbarFixed = true;
    } else this.navbarFixed = false;
  }
}
