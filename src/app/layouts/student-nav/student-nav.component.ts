import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-student-nav',
  templateUrl: './student-nav.component.html',
  styleUrls: ['./student-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentNavComponent implements OnInit {
  private _subscription!: Subscription;
  schoolName!: string;
  progName!: string;
  displayCustom!: boolean;
  activeSrc: any = '../../../assets/images/navigator/app.svg';
  activeIndex: number = 0;
  active = '1';
  links = [
    { title: 'One', fragment: 'one' },
    { title: 'Two', fragment: 'two' },
  ];

  images = [
    {
      previewImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      previewImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
      alt: 'Description for Image 2',
      title: 'Title 2',
    },
    {
      previewImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
      thumbnailImageSrc:
        'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
      alt: 'Description for Image 3',
      title: 'Title 3',
    },
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  // Options for Animations
  hero: AnimationOptions = {
    path: '../../../../../../assets/images/navigator/hero-anime.json',
  };
  viewportScroller: any;

  constructor(
    private _StudentsService: StudentsService,
    private _router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  userName: string = String(localStorage.getItem('userName'));
  userEmail: string = String(localStorage.getItem('userEmail'));

  ngOnInit(): void {
    console.log('test', this._ActivatedRoute.snapshot.params);
    this.progName = this._ActivatedRoute.snapshot.params.progName;
    this.schoolName = this._ActivatedRoute.snapshot.params.schoolName;
    this.getProfileData();
    setInterval(() => {
      this._subscription.unsubscribe();
      if (!this._subscription.closed) {
        console.error('Some error unsubscribing ?!');
      } else {
        console.error('unsubscribed!!!!');
      }
      this.getProfileData();
    }, 6700);
  }

  application: boolean = true;
  interview: boolean = false;
  acceptance: boolean = false;
  housing: boolean = false;
  visa: boolean = false;
  infrance: boolean = false;

  appPercent: number = 0;
  interviewPercent: number = 0;
  acceptancePercent: number = 0;
  houingPercent: number = 0;
  visaPercent: number = 0;
  infrancePercent: number = 0;

  getProfileData() {
    this._subscription = this._StudentsService
      .profile(this.userEmail)
      .subscribe((res: any) => {
        console.log(res);

        const [
          {
            data: [
              {
                ml,
                cv,
                lc,
                rl,
                trans,
                appsteps: {
                  docprepration,
                  interview,
                  acceptance,
                  housing,
                  visa,
                  infrance,
                },
              },
            ],
          },
        ] = res;

        // application
        if (
          cv !== null &&
          JSON.stringify(cv) !== '{}' &&
          trans !== null &&
          JSON.stringify(trans) !== '{}' &&
          ml !== null &&
          JSON.stringify(ml) !== '{}' &&
          rl !== null &&
          JSON.stringify(rl) !== '{}' &&
          docprepration[3] == 'true'
        ) {
          this.application = true;
        } else {
          this.application = false;
        }

        if (
          cv !== null &&
          JSON.stringify(cv) !== '{}' &&
          trans !== null &&
          JSON.stringify(trans) !== '{}'
        ) {
          this.appPercent = 25;
        }
        if (
          cv !== null &&
          JSON.stringify(cv) !== '{}' &&
          trans !== null &&
          JSON.stringify(trans) !== '{}' &&
          ml !== null &&
          JSON.stringify(ml) !== '{}'
        ) {
          this.appPercent = 50;
        }
        if (
          cv !== null &&
          JSON.stringify(cv) !== '{}' &&
          trans !== null &&
          JSON.stringify(trans) !== '{}' &&
          ml !== null &&
          JSON.stringify(ml) !== '{}' &&
          rl !== null &&
          JSON.stringify(rl) !== '{}'
        ) {
          this.appPercent = 75;
        }
        if (
          cv !== null &&
          JSON.stringify(cv) !== '{}' &&
          trans !== null &&
          JSON.stringify(trans) !== '{}' &&
          ml !== null &&
          JSON.stringify(ml) !== '{}' &&
          rl !== null &&
          JSON.stringify(rl) !== '{}' &&
          docprepration[3] == 'true'
        ) {
          this.appPercent = 100;
        }

        // interview
        if (interview[0] == 'true') {
          this.interview = true;
          this.interviewPercent = 100;
        } else {
          this.interview = false;
          this.interviewPercent = 0;
        }

        // acceptance
        if (
          lc !== null &&
          JSON.stringify(lc) !== '{}' &&
          acceptance[1] == 'true' &&
          acceptance[2] == 'true'
        ) {
          this.acceptance = true;
        } else {
          this.acceptance = false;
        }

        if (lc !== null && JSON.stringify(lc) !== '{}') {
          this.acceptancePercent = 40;
        }
        if (acceptance[1] == 'true') {
          this.acceptancePercent = 70;
        }
        if (acceptance[2] == 'true') {
          this.acceptancePercent = 100;
        }

        // housing
        if (housing[6] == 'true') {
          this.housing = true;
        } else {
          this.housing = false;
        }

        if (housing[0] == 'true') {
          this.houingPercent = 15;
        }
        if (housing[0] == 'true' && housing[1] == 'true') {
          this.houingPercent = 30;
        }
        if (
          housing[0] == 'true' &&
          housing[1] == 'true' &&
          housing[2] == 'true'
        ) {
          this.houingPercent = 45;
        }
        if (
          housing[0] == 'true' &&
          housing[1] == 'true' &&
          housing[2] == 'true' &&
          housing[3] == 'true'
        ) {
          this.houingPercent = 60;
        }
        if (
          housing[0] == 'true' &&
          housing[1] == 'true' &&
          housing[2] == 'true' &&
          housing[3] == 'true' &&
          housing[4] == 'true'
        ) {
          this.houingPercent = 75;
        }
        if (
          housing[0] == 'true' &&
          housing[1] == 'true' &&
          housing[2] == 'true' &&
          housing[3] == 'true' &&
          housing[4] == 'true' &&
          housing[5] == 'true'
        ) {
          this.houingPercent = 90;
        }
        if (
          housing[0] == 'true' &&
          housing[1] == 'true' &&
          housing[2] == 'true' &&
          housing[3] == 'true' &&
          housing[4] == 'true' &&
          housing[5] == 'true' &&
          housing[6] == 'true'
        ) {
          this.houingPercent = 100;
        }

        // visa
        if (visa[4] == 'true') {
          this.visa = true;
        } else {
          this.visa = false;
        }

        if (visa[0] == 'true') {
          this.visaPercent = 20;
        }
        if (visa[0] == 'true' && visa[1] == 'true') {
          this.visaPercent = 40;
        }
        if (visa[0] == 'true' && visa[1] == 'true' && visa[2] == 'true') {
          this.visaPercent = 60;
        }
        if (
          visa[0] == 'true' &&
          visa[1] == 'true' &&
          visa[2] == 'true' &&
          visa[3] == 'true'
        ) {
          this.visaPercent = 80;
        }
        if (
          visa[0] == 'true' &&
          visa[1] == 'true' &&
          visa[2] == 'true' &&
          visa[3] == 'true' &&
          visa[4] == 'true'
        ) {
          this.visaPercent = 100;
        }

        // infrance
        if (infrance[0] == 'true') {
          this.infrancePercent = 25;
        }
        if (infrance[0] == 'true' && infrance[1] == 'true') {
          this.infrancePercent = 40;
        }
        if (
          infrance[0] == 'true' &&
          infrance[1] == 'true' &&
          infrance[2] == 'true'
        ) {
          this.infrancePercent = 55;
        }
        if (
          infrance[0] == 'true' &&
          infrance[1] == 'true' &&
          infrance[2] == 'true' &&
          infrance[3] == 'true'
        ) {
          this.infrancePercent = 70;
        }
        if (
          infrance[0] == 'true' &&
          infrance[1] == 'true' &&
          infrance[2] == 'true' &&
          infrance[3] == 'true' &&
          infrance[4] == 'true'
        ) {
          this.infrancePercent = 85;
        }
        if (
          infrance[0] == 'true' &&
          infrance[1] == 'true' &&
          infrance[2] == 'true' &&
          infrance[3] == 'true' &&
          infrance[4] == 'true' &&
          infrance[5] == 'true'
        ) {
          this.infrancePercent = 100;
          this.infrance = true;
        } else {
          this.infrance = false;
        }
      });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  // Options for Owl carousel
  teamOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin: 24,
    autoplay: false,
    autoplaySpeed: 1200,
    autoplayTimeout: 2500,
    navSpeed: 700,
    rewind: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  // Scroll down to navigator
  goDown() {
    document.getElementById('pills-tabContent')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  ngOnDestroy() {
    // this._subscription.unsubscribe();
    // if (!this._subscription.closed) {
    //   console.error('Some error unsubscribing ?!');
    // } else {
    //   console.error('unsubscribed!!!!');
    // }
  }
}
