import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

import { StudentsService } from './../../../../shared/services/students/students.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatorService } from 'src/app/shared/services/translate/translate.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  // Variables
  profilePicture!: string;
  profileName!: string;
  active = 'my-info';

  mainRouter!: string;
  secRouter!: string;
  subRouter!: string;

  originalMainRouter!: string;
  originalSecRouter!: string;

  fragment!: string;

  description!: string;

  progressPercentage: number = 0;
  type: string = String(localStorage.getItem('type'));

  constructor(
    private _StudentsService: StudentsService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _SharedService: SharedService,
    public translate: TranslateService,
    private translator: TranslatorService
  ) {
    this._SharedService.profilePictureChanged.subscribe((data: any) => {
      this.profilePicture = data;
    });

    this._SharedService.progressChanged.subscribe((data: any) => {
      this.getProgressPct();
    });

    this._ActivatedRoute.fragment.subscribe((frag: any) => {
      this.fragment = frag;
    });

    // To get activated route
    this._Router.events.subscribe(() => {
      const routerArray = this._Router.url.split('/');
      const [, , , mainRouter, secRouter = '', subRouter = ''] = routerArray;
      // To save original routers without editing for routering purposes
      this.originalMainRouter = mainRouter;
      this.originalSecRouter = secRouter;
      // To uppercase first letter of the main router
      this.mainRouter =
        mainRouter.substring(0, 1).toUpperCase() +
        mainRouter.substring(1, mainRouter.length);
      // To uppercase first letter of the secondary router
      this.secRouter =
        secRouter.substring(0, 1).toUpperCase() +
        secRouter.substring(1, secRouter.length);
      // To handel sub Router which is responsible for documents
      this.subRouter = subRouter;
      // To check if the router have - symbol
      // if so remove it
      if (this.mainRouter.includes('-')) {
        this.mainRouter = this.mainRouter.replace(/-/g, ' ');
        if (this.mainRouter.includes('#')) {
          this.mainRouter = this.mainRouter.split('#')[0];
        }
      }

      if (this.secRouter.includes('-')) {
        this.secRouter = this.secRouter.replace(/-/g, ' ');
        if (this.secRouter.includes('#')) {
          this.secRouter = this.secRouter.split('#')[1];
        } else {
          this.secRouter = this.secRouter.split('?')[0];
        }
        this.secRouter =
          this.secRouter.substring(0, 1).toUpperCase() +
          this.secRouter.substring(1, secRouter.length);
      } else if (secRouter.includes('my')) {
        this.secRouter =
          secRouter.substring(0, 1).toUpperCase() +
          secRouter.substring(1, 2) +
          ' ' +
          secRouter.substring(2, secRouter.length);
      }

      if (this.subRouter.includes('-')) {
        const subRouterArray = this.subRouter.split('-');
        subRouterArray[0] =
          subRouterArray[0].substring(0, 1).toUpperCase() +
          subRouterArray[0].substring(1, subRouterArray[0].length);
        this.subRouter = subRouterArray.join(' ');
      }
      // To catch the page describtion which is depending on the routing
      if (this.originalMainRouter.split('#')[0] === 'account-settings') {
        this.description =
          'Edit your account settings and change your password here.';
      } else this.description = 'Set up your profile.';
    });

    this.translator.localEvent;
    translate.setDefaultLang('en');

    this.translator.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
  }

  ngOnInit(): void {
    // To call all profile info
    this.getProfileInfo();

    // To call Progress percentage
    this.getProgressPct();
  }

  // To call all profile info
  getProfileInfo() {
    const email = localStorage.getItem('userEmail') as string;
    this._StudentsService.profile(email).subscribe((data: any) => {
      const [
        {
          status,
          data: [{ profile_picture_url: picture, name }],
        },
      ] = data;

      if (status === 200) {
        this.profilePicture = picture;
        this.profileName = name.split(' ')[0];
      }
    });
  }

  // To call Progress percentage
  getProgressPct() {
    const StuName = localStorage.getItem('userName') as string;
    const StuEmail = localStorage.getItem('userEmail') as string;
    this._StudentsService
      .getStuProgress(StuName, StuEmail)
      .subscribe((data: any) => {
        if (data[0].status == 200) {
          this.progressPercentage = Math.floor(
            data[0].percentage.replace('%', '')
          );
        }
      });
  }
}
