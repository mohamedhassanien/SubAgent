import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Error404Component implements OnInit {
  // Options for Animations
  notFoundAnimation: AnimationOptions = {
    path: '../../../../../assets/images/not-found/404-error.json',
    autoplay: true,
    loop: true,
  };

  constructor() {}

  ngOnInit(): void {}

  goBack() {
    window.history.back();
  }
}
