import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CountUpModule } from 'ngx-countup';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { LottieModule } from 'ngx-lottie';
import { GalleriaModule } from 'primeng/galleria';
import player from 'lottie-web';
import { DropdownModule } from 'primeng/dropdown';
import { MatCardModule } from '@angular/material/card';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  NgbCarouselModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramInfoComponent } from './components/program-info/program-info.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { Blog1Component } from './components/blogs/Blog/blog1/blog1.component';
import { Blog2Component } from './components/blogs/Blog/blog2/blog2.component';
import { Blog3Component } from './components/blogs/Blog/blog3/blog3.component';
import { Blog4Component } from './components/blogs/Blog/blog4/blog4.component';
import { Blog5Component } from './components/blogs/Blog/blog5/blog5.component';
import { Blog6Component } from './components/blogs/Blog/blog6/blog6.component';
import { Blog8Component } from './components/blogs/Blog/blog8/blog8.component';
import { EditProgComponent } from './components/edit-prog/edit-prog.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BlogsCarusolComponent } from './components/blogs-carusol/blogs-carusol.component';
import { AllSchoolsComponent } from './components/all-schools/all-schools.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { ChatBotEventComponent } from './components/chat-bot-event/chat-bot-event.component';
import { DataenteryComponent } from './components/dataentery/dataentery.component';
import { PrivateSchoolComponent } from './components/private-school/private-school.component';
import { NgxTimelineModule } from 'ngx-timeline';

// import { ContactUsComponent } from './components/contact-us/contact-us.component';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
// import { EventsComponent } from './components/events/events.component';
// import { FooterComponent } from 'src/app/core/components/footer/footer.component';
// import { ZoomMeetingComponent } from './components/zoom-meeting/zoom-meeting.component';
// import { EventDetailsComponent } from './components/event-details/event-details.component';
// import { CountdownModule } from 'ngx-countdown';
// import { MeetingDetailsComponent } from './components/meeting-details/meeting-details.component';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { StaticsComponent } from './../../core/components/statics/statics.component';
// import { UserReviewComponent } from 'src/app/core/components/user-review/user-review.component';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { EditProgComponent } from './components/edit-prog/edit-prog.component';
// import { SchoolInfoComponent } from './components/school-info/school-info.component';
// import { SchoolsComponent } from './components/schools/schools.component';
// Import ng-circle-progress

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    LandingComponent,
    AboutUsComponent,
    ProgramsComponent,
    ProgramInfoComponent,
    TermsComponent,
    PrivacyComponent,
    BlogsComponent,
    Blog1Component,
    Blog2Component,
    Blog3Component,
    Blog4Component,
    Blog5Component,
    Blog6Component,
    Blog8Component,
    BlogsCarusolComponent,
    EditProgComponent,
    HomeComponent,
    AllSchoolsComponent,
    ChatBotComponent,
    ChatBotEventComponent,
    DataenteryComponent,
    PrivateSchoolComponent
    // ContactUsComponent,
    // EventsComponent,
    // FooterComponent,
    // StaticsComponent,
    // UserReviewComponent,
    // ZoomMeetingComponent,
    // EventDetailsComponent,
    // MeetingDetailsComponent,
    // SchoolsComponent,
    // SchoolInfoComponent,
  ],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    CommonModule,
    DropdownModule,
    SelectButtonModule,
    ButtonModule,
    NgxSliderModule,
    GalleriaModule,
    ReactiveFormsModule,
    SharedModule,
    MatSliderModule,
    AuthModule,
    CoreModule,
    MdbAccordionModule,
    SwiperModule,
    LandingRoutingModule,
    CountUpModule,
    CarouselModule,
    NgxDropzoneModule,
    NgxIntlTelInputModule,
    MatStepperModule,
    MultiSelectModule,
    NgxTimelineModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    [LottieModule.forRoot({ player: playerFactory })],
    DialogModule,
    NgbModule,
    NgbModalModule,
  ],
})
export class LandingModule {}
