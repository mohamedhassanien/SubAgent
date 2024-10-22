import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-private-school',
  templateUrl: './private-school.component.html',
  styleUrls: ['./private-school.component.scss']
})
export class PrivateSchoolComponent implements OnInit {

  constructor() { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    dotsEach:1,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
     
    },
    nav: false
  }
  ngOnInit(): void {
  }

}
