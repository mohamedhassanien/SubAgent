import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramInfoComponent } from './components/program-info/program-info.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { EditProgComponent } from './components/edit-prog/edit-prog.component';
import { Blog1Component } from './components/blogs/Blog/blog1/blog1.component';
import { Blog2Component } from './components/blogs/Blog/blog2/blog2.component';
import { Blog4Component } from './components/blogs/Blog/blog4/blog4.component';
import { Blog8Component } from './components/blogs/Blog/blog8/blog8.component';
import { Blog3Component } from './components/blogs/Blog/blog3/blog3.component';
import { Blog5Component } from './components/blogs/Blog/blog5/blog5.component';
import { Blog6Component } from './components/blogs/Blog/blog6/blog6.component';
import { AllSchoolsComponent } from './components/all-schools/all-schools.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { DataenteryComponent } from './components/dataentery/dataentery.component';
import { ChatBotEventComponent } from './components/chat-bot-event/chat-bot-event.component';
import { PrivateSchoolComponent } from './components/private-school/private-school.component';

// import { ContactUsComponent } from './components/contact-us/contact-us.component';
// import { EmbassadorComponent } from './components/embassador/embassador.component';
// import { SchoolsComponent } from './components/schools/schools.component';
// import { SchoolInfoComponent } from './components/school-info/school-info.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'About-Us',
        component: AboutUsComponent,
      },
      {
        path: 'private-school',
        component: PrivateSchoolComponent,
      },
      {
        path: 'chat-bot',
        component: ChatBotComponent,
      },
      {
        path: 'dataentery',
        component: DataenteryComponent,
      },
      {
        path: 'chat-bot-event',
        component: ChatBotEventComponent,
      },
      {
        path: 'programs',
        component: ProgramsComponent,
      },
      {
        path: 'programs/:name/:id',
        component: ProgramInfoComponent,
      },
      {
        path: 'Terms',
        component: TermsComponent,
      },
      {
        path: 'Privacy',
        component: PrivacyComponent,
      },
      {
        path: 'Schools',
        component: AllSchoolsComponent,
      },
      // {
      //   path: 'ambassador',
      //   component: EmbassadorComponent,
      // },
      // {
      //   path: 'Contact-Us',
      //   component: ContactUsComponent,
      // },
      {
        path: 'edit-prog/:id',
        component: EditProgComponent,
      },
      // {
      //   path: 'Contact-Us',
      //   component: ContactUsComponent,
      // },
      // {
      //   path: 'schools',
      //   component: SchoolsComponent,
      // },
      // {
      //   path: 'schools/:id',
      //   component: SchoolInfoComponent,
      // },
      // {
      //   path: 'Events', component: EventsComponent
      // },
      // {
      //   path: 'Event-details', component: EventDetailsComponent
      // },
      {
        path: 'blogs',
        component: BlogsComponent,
      },
      {
        path: 'blog/1',
        component: Blog1Component,
      },
      {
        path: 'blog/2',
        component: Blog2Component,
      },
      {
        path: 'blog/4',
        component: Blog4Component,
      },
      {
        path: 'blog/8',
        component: Blog8Component,
      },
      {
        path: 'blog/3',
        component: Blog3Component,
      },

      {
        path: 'blog/5',
        component: Blog5Component,
      },
      {
        path: 'blog/6',
        component: Blog6Component,
      },

      // {
      //   path: 'zooms', component: ZoomMeetingComponent
      // },
      // {
      //   path: 'zoom', component: MeetingDetailsComponent
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
