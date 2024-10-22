import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-avoid-scams',
  templateUrl: './avoid-scams.component.html',
  styleUrls: ['./avoid-scams.component.scss']
})
export class AvoidScamsComponent implements OnInit {
  flag: AnimationOptions = {
    path: '/assets/images/navigator/housing/avoid scams/red-flag.json',
  };
  constructor() { }

  ngOnInit(): void {
  }
  teamOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    margin: 24,
    autoplay: false,
    autoplaySpeed: 1200,
    autoplayTimeout: 2500,
    navSpeed: 700,
    rewind: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
}
