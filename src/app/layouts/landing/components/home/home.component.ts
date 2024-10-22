import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
// import Swiper core and required modules
import SwiperCore, {
  FreeMode,
  Autoplay,
  Parallax,
  SwiperOptions,
} from 'swiper';
SwiperCore.use([Autoplay, Parallax, FreeMode]);
// import ngx-lotties core
import { AnimationOptions } from 'ngx-lottie';

import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StudentsService } from 'src/app/shared/services/students/students.service';
import { Router } from '@angular/router';
import { ScrollService } from 'src/app/shared/services/scroll/scroll-service.service';
import { ChatBotService } from 'src/app/shared/services/chat-bot/chat-bot.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
 
})
export class HomeComponent implements OnInit {
 

 //--------------------home carousel options for SubAgent:-----------------------
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    dotsEach:1,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      769: {
        items: 3
      }
     
    },
    nav: false
  }
   

  constructor(
    private _FormBuilder: FormBuilder,
    private _StudentsService: StudentsService,
    private _Router: Router,
    private _ScrollService: ScrollService,
    private _ChatService: ChatService,
  ) {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }
  ngOnInit(): void {
 
    
  } 
 
}
