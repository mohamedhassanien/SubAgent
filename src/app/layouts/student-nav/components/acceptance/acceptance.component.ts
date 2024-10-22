import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/shared/services/students/students.service';

@Component({
  selector: 'app-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.scss'],
})
export class AcceptanceComponent implements OnInit {
  private _subscription!: Subscription;
  @ViewChild('onOpenAcceptance', { static: true }) onOpenAcceptance = {} as ElementRef;
  constructor(
    private _StudentsService: StudentsService,
    private _ModalService: NgbModal,) {}

  ngOnInit(): void {
    this._ModalService.open(this.onOpenAcceptance, { windowClass: 'acceptance_popup', size: 'lg' });
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

  deposit: boolean = false;
  cvec: boolean = false;
  acceptanceletter: boolean = false;
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
        //         lc,
        //         appsteps: { acceptance },
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
        // acceptance letter
        if (lc !== null && JSON.stringify(lc) !== '{}') {
          this.acceptanceletter = true;
        } else {
          this.acceptanceletter = false;
        }

        // pay deposir test
        if (acceptance[1] == 'true') {
          this.deposit = true;
        } else {
          this.deposit = false;
        }

        // cvec
        if (acceptance[2] == 'true') {
          this.cvec = true;
        } else {
          this.cvec = false;
        }
      });
  }

  // deposit
  steps1() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: ['false', 'true', 'true'],
    //   housing: this.housing,
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });
    var stepArray = '';
    if(this.deposit){
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
        acceptance: ['false', 'true', 'true'],
        housing: this.housing,
        visa: this.visa,
        infrance: this.infrance,
      });
    }
    console.log('stepArray: ', stepArray);
    this._StudentsService.editSteps(userName, stepArray).subscribe();
  }

  // cvec
  steps2() {
    const userName = String(localStorage.getItem('userName'));

    // const stepArray = JSON.stringify({
    //   docprepration: this.docs,
    //   interview: this.interview,
    //   acceptance: ['true', 'true', 'true'],
    //   housing: this.housing,
    //   visa: this.visa,
    //   infrance: this.infrance,
    // });

    var stepArray = '';
    if(this.cvec){
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
        acceptance: ['true', 'true', 'true'],
        housing: this.housing,
        visa: this.visa,
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

  dismissPopup(){
    this._ModalService.dismissAll();
  }
}
