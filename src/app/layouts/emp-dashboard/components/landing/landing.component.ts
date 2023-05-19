import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { TranslatorService } from 'src/app/shared/services/translate/translate.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {
  fullName: string = String(localStorage.getItem('name'));
  empUserName: string = String(localStorage.getItem('userName'));
  type: string = String(localStorage.getItem('type'));
  showFiller: boolean = false;
  isCollapsed: boolean = false;
  mainRouter!: string;
  secRouter!: string;

  docElement!: HTMLElement;
  isFullScreen: boolean = false;

  notifications!: any[];

  screenWidth!: number;

  profilePicture: string = String(localStorage.getItem('picture'));
  checkedArr: any[] = [];
  constructor(
    private _EmployeeService: EmployeeService,
    private _Router: Router,
    public translate: TranslateService,
    private translator: TranslatorService
  ) {
    this._EmployeeService.getNotifications().subscribe((data: any) => {
      this.notifications = data;
    });
    this.screenWidth = window.innerWidth;
    this.translator.localEvent;
    translate.setDefaultLang('fr');

    this.translator.localEvent.subscribe((locale) =>
      this.translate.use(locale)
    );
  }

  ngOnInit(): void {}

  changeLocale(locale: string) {
    this.translator.changeLocale(locale);
  }

  onHover(e: any, id: any) {
    if (e.isTrusted) {
      this._EmployeeService.checkNoti(id).subscribe((data) => {
        console.log(data);
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number } }) {
    this.screenWidth = event.target.innerWidth;
  }

  // To logout employee
  signOut() {
    localStorage.clear();
    this._Router.navigate(['/auth', 'login']);
  }

  // To toggle fullscreen
  toggleFullScreen() {
    if (!this.isFullScreen) {
      this.docElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }

  // To get date
  getDate(time: number) {
    const reactionTime = new Date(time).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = new Date(currentTime - reactionTime);
  }
}
