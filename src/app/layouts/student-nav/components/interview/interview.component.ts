import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss'],
})
export class InterviewComponent implements OnInit {
  private _subscription!: Subscription;
  constructor(private _StudentsService: StudentsService) {}

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

  interviewpre: boolean = false;
  docs = [];
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
        this.acceptance = acceptance;
        this.housing = housing;
        this.visa = visa;
        this.infrance = infrance;


        // const [
        //   {
        //     data: [
        //       {
        //         appsteps: { interview },
        //       },
        //     ],
        //   },
        // ] = res;

        // interviewpre
        if (interview[0] == 'true') {
          this.interviewpre = true;
        } else {
          this.interviewpre = false;
        }
      });
  }

  steps1() {
    const userName = String(localStorage.getItem('userName'));

    const stepArray = JSON.stringify({
      docprepration: this.docs,
      interview: ['true'],
      acceptance: this.acceptance,
      housing: this.housing,
      visa: this.visa,
      infrance: this.infrance,
    });
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
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
