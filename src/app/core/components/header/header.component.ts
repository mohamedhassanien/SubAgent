import { UploadService } from './../../../shared/services/upload/upload.service';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  // Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ProgramsService } from 'src/app/shared/services/programs/programs.service';
import { EventEmitter } from 'stream';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /////// Variables
  // User Data
  name: string = '';
  username: string = '';
  isLoggedIn: boolean = false;
  profilePic: string = '';
  type: string = '';
  // offers
  offer: string = '';
  router: string = '';
  userName = localStorage.getItem('userName') as String;
  lengthWishlist = localStorage.getItem('lengthWhshlist');

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
    ['My profile', '/students/dashboard'],
    ['Logout', '/auth/login'],
  ];

  profileLinksNoLogin: any[] = [
    ['Sign Up', '/students/dashboard'],
    ['Login', '/auth/login'],
  ];

  programsLinks: any[] = [
    ['Schools', '/landing/Schools'],
    ['Programs', '/landing/programs'],
  ];

  // Elements in HTML
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  @ViewChild('searchButton', { static: false }) searchButton!: ElementRef;
  @ViewChild('searchIcon', { static: false }) searchIcon!: ElementRef;
  @ViewChild('searchInputIcon', { static: false }) searchInputIcon!: ElementRef;

  constructor(
    private _router: Router,
    private activeRouter: ActivatedRoute,
    // private _Renderer: Renderer2,
    private socialAuthService: SocialAuthService,
    private _StudentsService: StudentsService,
    private _SharedService: SharedService,
    private _programService: ProgramsService,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this._SharedService.profilePictureChanged.subscribe((data: any) => {
      this.profilePic = data;
    });
  }

  setFocus() {
    this.showInput = !this.showInput;
  }
  numwishlist: any;
  hidebadge: boolean = false;

  ngOnInit(): void {
    this.navMenu = false;

    this._SharedService.wishlistLength.subscribe((data: any) => {
      this.numwishlist = data;
    });
    // To get number wishlist programs
    // let name =String( localStorage.getItem('userName'))
    // this._programService.getWishlistedPrograms(name).subscribe((data:any)=>{
    //   const[{programs}] = data
    //   this.numwishlist = programs.length
    // })
    document.addEventListener('touchstart', function () { }, true);

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

  // numbers programs in wishlist
  // getWishlistLength(){
  //   this._SharedService.wishlistLength.subscribe((data:any)=>{
  //     this.numwishlist = data
  //   })
  // }

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

  loginOrSignin(condition: string) {
    if (condition == 'Sign Up') {
      this._router.navigate(['/auth/register/student']);
    }
    if (condition == 'Login') {
      this._router.navigate(['/auth/login']);
    }
  }

  wishlesticon() {
    if (this.isLoggedIn) {
      // this._router.navigate([`/students/${this.userName}/profile/mywishlist`]);
      this._router.navigate([`/profile/wishlist`])
    }
    if (!this.isLoggedIn) {
      Swal.fire({
        title: 'Sorry!',
        text: 'You Must be Logged in first',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#16294f',
        cancelButtonColor: '#f2818b',
        confirmButtonText: 'Login Now',
      }).then((result) => {
        if (result.isConfirmed) {
          this._router.navigate(['/auth/login']);
        }
      });
    }
  }

  // to logout
  logOut(condition: string) {
    if (condition == 'Logout') {
      localStorage.clear();
      this.socialAuthService.signOut();
      this._router.navigate(['/auth/login']).then(() => {
        window.location.reload();
      });
    }
  }
  logoutMob() {
    localStorage.clear();
    this.socialAuthService.signOut();
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
    // if (this.type === 'student') return ['/students', this.name];
    if (this.type === 'student') return ['/profile/documents'];
    else if (this.type === 'employee' || this.type === 'owner')
      return ['/employees', this.name, 'dashboard'];
    else return ['/sub-agents', this.name, 'dashboard'];
  }

  navbarFixed: boolean = false;
  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 50) {
      this.navbarFixed = true;
    } else this.navbarFixed = false;
  }
}
