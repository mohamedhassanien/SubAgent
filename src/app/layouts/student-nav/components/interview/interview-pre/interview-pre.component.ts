import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-interview-pre',
  templateUrl: './interview-pre.component.html',
  styleUrls: ['./interview-pre.component.scss']
})
export class InterviewPreComponent implements OnInit {

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

