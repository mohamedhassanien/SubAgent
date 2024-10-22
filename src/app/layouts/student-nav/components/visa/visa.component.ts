import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss'],
})
export class VisaComponent implements OnInit {
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

  comps: boolean = false;
  fvisa: boolean = false;
  tls: boolean = false;
  validate: boolean = false;
  myvisa: boolean = false;
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
        //         appsteps: { visa },
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

        // comps
        if (visa[0] == 'true') {
          this.comps = true;
        } else {
          this.comps = false;
        }

        // fvisa
        if (visa[1] == 'true') {
          this.fvisa = true;
        } else {
          this.fvisa = false;
        }

        // tls
        if (visa[2] == 'true') {
          this.tls = true;
        } else {
          this.tls = false;
        }

        // validate
        if (visa[3] == 'true') {
          this.validate = true;
        } else {
          this.validate = false;
        }

        // myvisa
        if (visa[4] == 'true') {
          this.myvisa = true;
        } else {
          this.myvisa = false;
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
    //   visa: ['true', 'false', 'false', 'false', 'false'],
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.comps){
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
      visa: ['true', 'false', 'false', 'false', 'false'],
      infrance: this.infrance,
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
    //   visa: ['true', 'true', 'false', 'false', 'false'],
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.fvisa){
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
      visa: ['true', 'true', 'false', 'false', 'false'],
      infrance: this.infrance,
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
    //   visa: ['true', 'true', 'true', 'false', 'false'],
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.tls){
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
      visa: ['true', 'true', 'true', 'false', 'false'],
      infrance: this.infrance,
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
    //   visa: ['true', 'true', 'true', 'true', 'false'],
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.validate){
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
        visa: ['true', 'true', 'true', 'true', 'false'],
        infrance: this.infrance,
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
    //   visa: ['true', 'true', 'true', 'true', 'true'],
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.myvisa){
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
      visa: ['true', 'true', 'true', 'true', 'true'],
      infrance: this.infrance,
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
