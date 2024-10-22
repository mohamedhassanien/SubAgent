import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-in-france',
  templateUrl: './in-france.component.html',
  styleUrls: ['./in-france.component.scss'],
})
export class InFranceComponent implements OnInit {
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

  extra: boolean = false;
  bank: boolean = false;
  crous: boolean = false;
  gym: boolean = false;
  sim: boolean = false;
  social: boolean = false;
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
        //         appsteps: { infrance },
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

        // extra
        if (infrance[0] == 'true') {
          this.extra = true;
        } else {
          this.extra = false;
        }

        // bank
        if (infrance[1] == 'true') {
          this.bank = true;
        } else {
          this.bank = false;
        }

        // crous
        if (infrance[2] == 'true') {
          this.crous = true;
        } else {
          this.crous = false;
        }

        // gym
        if (infrance[3] == 'true') {
          this.gym = true;
        } else {
          this.gym = false;
        }

        // sim
        if (infrance[4] == 'true') {
          this.sim = true;
        } else {
          this.sim = false;
        }

        // social
        if (infrance[5] == 'true') {
          this.social = true;
        } else {
          this.social = false;
        }
      });
  }

  steps1() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: this.acceptance,
    //   housing: this.housing,
    //   visa:this.visa,
    //   infrance: ['true', 'false', 'false', 'false', 'false', 'false'],
    // });

    var stepArray = '';
    if(this.extra){
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
        docprepration: this.docs,
      interview: this.interview,
      acceptance: this.acceptance,
      housing: this.housing,
      visa:this.visa,
      infrance: ['true', 'false', 'false', 'false', 'false', 'false'],
        });
    }
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
  }

  steps2() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: this.acceptance,
    //   housing: this.housing,
    //   visa:this.visa,
    //   infrance: ['true', 'true', 'false', 'false', 'false', 'false'],
    // });

    var stepArray = '';
    if(this.bank){
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
        docprepration: this.docs,
        interview: this.interview,
        acceptance: this.acceptance,
        housing: this.housing,
        visa:this.visa,
        infrance: ['true', 'true', 'false', 'false', 'false', 'false'],
        });
    }
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
  }

  steps3() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: this.acceptance,
    //   housing: this.housing,
    //   visa:this.visa,
    //   infrance: ['true', 'true', 'true', 'false', 'false', 'false'],
    // });

    var stepArray = '';
    if(this.crous){
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
        docprepration: this.docs,
        interview: this.interview,
        acceptance: this.acceptance,
        housing: this.housing,
        visa:this.visa,
        infrance: ['true', 'true', 'true', 'false', 'false', 'false'],
        });
    }
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
  }

  steps4() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: this.acceptance,
    //   housing: this.housing,
    //   visa:this.visa,
    //   infrance: ['true', 'true', 'true', 'true', 'false', 'false'],
    // });

    var stepArray = '';
    if(this.gym){
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
        docprepration: this.docs,
        interview: this.interview,
        acceptance: this.acceptance,
        housing: this.housing,
        visa:this.visa,
        infrance: ['true', 'true', 'true', 'true', 'false', 'false'],
        });
    }
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
  }

  steps5() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: this.acceptance,
    //   housing: this.housing,
    //   visa:this.visa,
    //   infrance: ['true', 'true', 'true', 'true', 'true', 'false'],
    // });

    var stepArray = '';
    if(this.sim){
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
        docprepration: this.docs,
        interview: this.interview,
        acceptance: this.acceptance,
        housing: this.housing,
        visa:this.visa,
        infrance: ['true', 'true', 'true', 'true', 'true', 'false'],
        });
    }
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
  }

  steps6() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: this.acceptance,
    //   housing: this.housing,
    //   visa:this.visa,
    //   infrance: ['true', 'true', 'true', 'true', 'true', 'true'],
    // });

    var stepArray = '';
    if(this.social){
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
        docprepration: this.docs,
      interview: this.interview,
      acceptance: this.acceptance,
      housing: this.housing,
      visa:this.visa,
      infrance: ['true', 'true', 'true', 'true', 'true', 'true'],
        });
    }
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
