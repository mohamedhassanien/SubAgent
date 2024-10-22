import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar]);

// import lottie for animation
import { AnimationOptions } from 'ngx-lottie';
import { StudentsService } from 'src/app/shared/services/students/students.service';

// import swal pop up
import Swal from 'sweetalert2';

// to import the slider
import { OwlOptions } from 'ngx-owl-carousel-o';

// to import animation
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ScrollService } from 'src/app/shared/services/scroll/scroll-service.service';

import * as AOS from 'aos';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [
    // large screens
    trigger('activeSlide', [
      state(
        'active',
        style({
          width: '317px',
          height: '317px',
          border: 'solid 4px #ff5151',
          margin: '100px auto',
          // padding: '30px',
          borderRadius: '50%',
          transform: 'scale(1.4)',
          opacity: 1,
          font: '18px',
        })
      ),
      state(
        'inActive',
        style({
          width: '317px',
          height: '317px',
          border: 'solid 4px #16294f',
          borderRadius: '50%',
          margin: '100px auto 30px',
          transform: 'scale(0.9)',
          opacity: 0.5,
          font: '18px',
        })
      ),
      transition('active => inActive', [animate('0.4s')]),
      transition('inActive => active', [animate('0.4s')]),
    ]),
    // medium screens
    trigger('activeSlide-md', [
      state(
        'active-md',
        style({
          width: '357px',
          height: '357px',
          border: 'solid 2px #ff5151',
          margin: '100px auto 30px',
          borderRadius: '50%',
          transform: 'scale(1.2)',
          opacity: 1,
        })
      ),
      state(
        'inActive-md',
        style({
          width: '357px',
          height: '357px',
          border: 'solid 2px #16294f',
          margin: '100px auto',
          borderRadius: '50%',
          transform: 'scale(0.7)',
          opacity: 0.5,
        })
      ),
      transition('active-md => inActive-md', [animate('0.4s')]),
      transition('inActive-md => active-md', [animate('0.4s')]),
    ]),
    // small screens
    trigger('activeSlide-sm', [
      state(
        'active-sm',
        style({
          width: '233px',
          height: '233px',
          border: 'solid 2px #ff5151',
          margin: '70px auto',
          borderRadius: '50%',
          transform: 'scale(1.4)',
          opacity: 1,
        })
      ),
      state(
        'inActive-sm',
        style({
          width: '233px',
          height: '233px',
          border: 'solid 2px #16294f',
          borderRadius: '50%',
          margin: '70px auto',
          transform: 'scale(0.9)',
          opacity: 0.5,
        })
      ),
      transition('active-sm => inActive-sm', [animate('0.4s')]),
      transition('inActive-sm => active-sm', [animate('0.4s')]),
    ]),
  ],
})
export class AboutUsComponent implements OnInit, AfterViewInit {
  contactForm!: FormGroup;

  // Animation
  map: AnimationOptions = {
    path: '../../../../../assets/images/about-us/map-section/Map.json',
  };
  administrative: AnimationOptions = {
    path: '../../../../../assets/images/about-us/services-section/Administrative.json',
  };
  application: AnimationOptions = {
    path: '../../../../../assets/images/about-us/services-section/Application.json',
  };
  recommendation: AnimationOptions = {
    path: '../../../../../assets/images/about-us/services-section/Recommendation.json',
  };
  team: AnimationOptions = {
    path: '../../../../../assets/images/about-us/team-section/team-putting-together.json',
  };
  vision: AnimationOptions = {
    path: '../../../../../assets/images/about-us/vision-section/Our-vision.json',
  };

  constructor(
    private studentsService: StudentsService,
    private _ScrollService: ScrollService,
    private _router: Router
  ) {
    AOS.init({
      easing: 'ease-in-out',
      once: true,
    });
  }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }

  //--------------------aboutus carousel options for SubAgent:-----------------------
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

  onSubmit(formData: any) {
    let email = formData.value.email;
    let message = formData.value.message;
    this.studentsService.sendRequestByMail(email, message).subscribe((data) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'A Message has been sent!',
        showConfirmButton: false,
        timer: 1500,
      });
      this.contactForm.reset();
    });
  }

  ngAfterViewInit(): void {
    if (this._ScrollService.differentSectionFlag == true) {
      window.scrollTo(0, 4950);
      this._ScrollService.differentSectionFlag = false;
    }
  }

  registerPage() {
    this._router.navigate(['/auth/register/student']);
  }

}
