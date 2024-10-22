import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  events: string[] = [];
  isActive: boolean = false;
  imgActive1: string = '/assets/Services/application/icons/application.svg';
  imgActive2: string = '/assets/Services/numbers/confirm.svg';
  imgActive3: string = '/assets/Services/numbers/accomodation.svg';
  imgActive4: string = '/assets/Services/numbers/visa.svg';
  imgActive5: string = '/assets/Services/numbers/inParis.svg';
  imgActive6: string = '/assets/Services/numbers/addedServices';
  options: AnimationOptions = {
    path: '/assets/student.json',
  };
 
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this._ActivatedRoute.snapshot.queryParams['step'] == 'application') {
      let element: HTMLElement = document.getElementById(
        'application-tab'
      ) as HTMLElement;

      element.click();
    }
    if (this._ActivatedRoute.snapshot.queryParams['step'] == 'confirm') {
      let element: HTMLElement = document.getElementById(
        'confirm-tab'
      ) as HTMLElement;

      element.click();
    }
    if (this._ActivatedRoute.snapshot.queryParams['step'] == 'visa') {
      let element: HTMLElement = document.getElementById(
        'visa-tab'
      ) as HTMLElement;

      element.click();
    }
    if (this._ActivatedRoute.snapshot.queryParams['step'] == 'accomodation') {
      let element: HTMLElement = document.getElementById(
        'accomodation-tab'
      ) as HTMLElement;

      element.click();
    }
    if (this._ActivatedRoute.snapshot.queryParams['step'] == 'inFrance') {
      let element: HTMLElement = document.getElementById(
        'inFrance-tab'
      ) as HTMLElement;

      element.click();
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  a() {
    this.imgActive1 = '/assets/Services/application/icons/application.svg';
    this.imgActive2 = '/assets/Services/numbers/confirm.svg';
    this.imgActive3 = '/assets/Services/numbers/accomodation.svg';
    this.imgActive4 = '/assets/Services/numbers/visa.svg';
    this.imgActive5 = '/assets/Services/numbers/inParis.svg';
    this.router.navigate(['marketplace/services'], {
      queryParams: { step: 'application' },
    });
  }
  b() {
    this.imgActive1 = '/assets/Services/numbers/application.svg';
    this.imgActive2 = '/assets/Services/confirm/confirm_step.png';
    this.imgActive3 = '/assets/Services/numbers/accomodation.svg';
    this.imgActive4 = '/assets/Services/numbers/visa.svg';
    this.imgActive5 = '/assets/Services/numbers/inParis.svg';
    this.router.navigate(['marketplace/services'], {
      queryParams: { step: 'confirm' },
    });
  }
  c() {
    this.imgActive1 = '/assets/Services/numbers/application.svg';
    this.imgActive2 = '/assets/Services/numbers/confirm.svg';
    this.imgActive3 = '/assets/Services/accomdation/accomodation_step.svg';
    this.imgActive4 = '/assets/Services/numbers/visa.svg';
    this.imgActive5 = '/assets/Services/numbers/inParis.svg';
    this.router.navigate(['marketplace/services'], {
      queryParams: { step: 'accomodation' },
    });
  }
  d() {
    this.imgActive1 = '/assets/Services/numbers/application.svg';
    this.imgActive2 = '/assets/Services/numbers/confirm.svg';
    this.imgActive3 = '/assets/Services/numbers/accomodation.svg';
    this.imgActive4 = '/assets/Services/visa/visa_step.svg';
    this.imgActive5 = '/assets/Services/numbers/inParis.svg';
    this.router.navigate(['marketplace/services'], {
      queryParams: { step: 'visa' },
    });
  }
  e() {
    this.imgActive5 = '/assets/Services/infrance/inFrance.png';
    this.imgActive1 = '/assets/Services/numbers/application.svg';
    this.imgActive2 = '/assets/Services/numbers/confirm.svg';
    this.imgActive3 = '/assets/Services/numbers/accomodation.svg';
    this.imgActive4 = '/assets/Services/numbers/visa.svg';
    this.router.navigate(['marketplace/services'], {
      queryParams: { step: 'inFrance' },
    });
  }
}
