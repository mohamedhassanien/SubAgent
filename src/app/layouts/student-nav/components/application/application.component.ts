import { Component, HostListener, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  private _subscription!: Subscription;
  displayCustom!: boolean;
  reloadSubject = new Subject();

  activeIndex: number = 0;

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

  constructor(private _StudentsService: StudentsService) {}

  userName: string = String(localStorage.getItem('userName'));

  ngOnInit(): void {
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

  motivation: boolean = false;
  recmmondation: boolean = false;
  language: boolean = false;
  allapp: boolean = false;
  docs = [];
  interview = [];
  acceptance = [];
  housing = [];
  visa = [];
  infrance = [];
  getProfileData() {
    const userEmail = String(localStorage.getItem('userEmail'));
    this._subscription = this._StudentsService
      .profile(userEmail)
      .subscribe((res: any) => {
        console.log(res);

        // const [
        //   {
        //     data: [
        //       {
        //         ml,
        //         cv,
        //         lc,
        //         rl,
        //         trans,
        //         appsteps: { docprepration },
        //       },
        //     ],
        //   },
        // ] = res;

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
        this.docs = docprepration;
        this.interview = interview;
        this.acceptance = acceptance;
        this.housing = housing;
        this.visa = visa;
        this.infrance = infrance;

        // cv
        if (
          cv !== null &&
          JSON.stringify(cv) !== '{}' &&
          trans !== null &&
          JSON.stringify(trans) !== '{}'
        ) {
          this.motivation = true;

        } else {
          this.motivation = false;
        }
        // motivation letter
        if (ml !== null && JSON.stringify(ml) !== '{}') {
          this.recmmondation = true;
        } else {
          this.recmmondation = false;
        }

        // recommendation letter
        if (rl !== null && JSON.stringify(rl) !== '{}') {
          this.language = true;
        } else {
          this.language = false;
        }

        // langauge test
        if (docprepration[3] == 'true') {
          this.allapp = true;
        } else {
          this.allapp = false;
        }
      });
  }

  // check last step
  steps() {
    const userName = String(localStorage.getItem('userName'));
    // const stepArray = JSON.stringify({
    //   docprepration: ['false', 'false', 'false', 'true'],
    //   interview: ['false'],
    //   acceptance: ['false', 'false', 'false'],
    //   housing: ['false', 'false', 'false', 'false', 'false', 'false', 'false'],
    //   visa: ['false', 'false', 'false', 'false', 'false'],
    //   infrance: ['false', 'false', 'false', 'false', 'false', 'false'],
    // });

    var stepArray = '';
    if(this.allapp){
       stepArray = JSON.stringify({
        docprepration: this.docs,
        interview: this.interview,
        acceptance: this.acceptance,
        housing: this.housing,
        visa: this.visa,
        infrance: this.infrance,
      });
    }
    else{
      stepArray = JSON.stringify({
        docprepration: ['false', 'false', 'false', 'true'],
      interview: ['false'],
      acceptance: ['false', 'false', 'false'],
      housing: ['false', 'false', 'false', 'false', 'false', 'false', 'false'],
      visa: ['false', 'false', 'false', 'false', 'false'],
      infrance: ['false', 'false', 'false', 'false', 'false', 'false'],
        });
    }
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  navbarFixed: boolean = false;
  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 650) {
      this.navbarFixed = true;
    } else this.navbarFixed = false;
  }

  // Scroll down to navigator
  goDown() {
    document.getElementById('programs-container')!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
