import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [],
})
export class LandingComponent implements OnInit {
  isLoaded: boolean = true;
  router: string = '';
  scroll = false;
  mainLinkArr!: string[];
  viewFooter!: boolean;

  constructor(private _Router: Router) {
    this._Router.events.subscribe(() => {
      this.mainLinkArr = this._Router.url.split('/');
      this.viewFooter = this.mainLinkArr.includes('login');
    });

    if (this._Router.url == '/landing/home') {
      sessionStorage.setItem('done', 'done');
      if (sessionStorage.getItem('done') == 'done') {
        this.isLoaded = false;
      } else {
        this.isLoaded = true;
      }
      this._Router.events.subscribe(() => {
        this.router = this._Router.url;
      });
    }
  }

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event']) onScroll(a: any) {
    if (window.scrollY > 100) {
      this.scroll = true;
      a = this.scroll;
    } else this.scroll = false;
    a = this.scroll;
  }
}
