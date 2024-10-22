import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss'],
})
export class HousingComponent implements OnInit {
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

  book: boolean = false;
  avoid: boolean = false;
  garant: boolean = false;
  hcertificate: boolean = false;
  hinsurance: boolean = false;
  inventory: boolean = false;
  caf: boolean = false;

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
        //         appsteps: { housing },
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

        // book
        if (housing[0] == 'true') {
          this.book = true;
        } else {
          this.book = false;
        }

        // avoid
        if (housing[1] == 'true') {
          this.avoid = true;
        } else {
          this.avoid = false;
        }

        // garant
        if (housing[2] == 'true') {
          this.garant = true;
        } else {
          this.garant = false;
        }

        // hcertificate
        if (housing[3] == 'true') {
          this.hcertificate = true;
        } else {
          this.hcertificate = false;
        }

        // hinsurance
        if (housing[4] == 'true') {
          this.hinsurance = true;
        } else {
          this.hinsurance = false;
        }

        // inventory
        if (housing[5] == 'true') {
          this.inventory = true;
        } else {
          this.inventory = false;
        }

        // caf
        if (housing[6] == 'true') {
          this.caf = true;
        } else {
          this.caf = false;
        }
      });
  }

  steps1() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: this.acceptance,
    //   housing: ['true', 'false', 'false', 'false', 'false', 'false', 'false'],
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.book){
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
          housing: ['true', 'false', 'false', 'false', 'false', 'false', 'false'],
          visa: this.visa,
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
    //   housing: ['true', 'true', 'false', 'false', 'false', 'false', 'false'],
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });
    var stepArray = '';
    if(this.avoid){
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
          housing: ['true', 'true', 'false', 'false', 'false', 'false', 'false'],
          visa: this.visa,
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
    //   housing: ['true', 'true', 'true', 'false', 'false', 'false', 'false'],
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.garant){
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
          housing: ['true', 'true', 'true', 'false', 'false', 'false', 'false'],
          visa: this.visa,
          infrance: this.infrance
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
    //   housing: ['true', 'true', 'true', 'true', 'false', 'false', 'false'],
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.hcertificate){
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
          housing: ['true', 'true', 'true', 'true', 'false', 'false', 'false'],
          visa: this.visa,
          infrance: this.infrance
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
    //   housing: ['true', 'true', 'true', 'true', 'true', 'false', 'false'],
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.hinsurance){
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
          housing: ['true', 'true', 'true', 'true', 'true', 'false', 'false'],
          visa: this.visa,
          infrance: this.infrance
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
    //   housing: ['true', 'true', 'true', 'true', 'true', 'true', 'false'],
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.inventory){
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
          housing: ['true', 'true', 'true', 'true', 'true', 'true', 'false'],
          visa: this.visa,
          infrance: this.infrance
        });
    }
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
  }

  steps7() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: this.acceptance,
    //   housing: ['true', 'true', 'true', 'true', 'true', 'true', 'true'],
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.caf){
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
          housing: ['true', 'true', 'true', 'true', 'true', 'true', 'true'],
          visa: this.visa,
          infrance: this.infrance
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
    document.getElementById('programs-container')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
