import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AdditionalInformationComponent } from './components/general/additional-information/additional-information.component';
import { EducationComponent } from './components/general/education/education.component';
import { HowToStartComponent } from './components/general/how-to-start/how-to-start.component';
import { GeneralComponent } from './components/general/general.component';
import { ProgramsComponent } from '../landing/programs/programs.component';
import { SupportingComponent } from './components/profile/my-documents/supporting/supporting.component';
import { LanguageComponent } from './components/profile/my-documents/language/language.component';
import { AcademicComponent } from './components/profile/my-documents/academic/academic.component';
import { MotivationComponent } from './components/profile/my-documents/motivation/motivation.component';
import { IdentityComponent } from './components/profile/my-documents/identity/identity.component';
import { MyDocumentsComponent } from './components/profile/my-documents/my-documents.component';
import { MyWishlistComponent } from './components/profile/my-wishlist/my-wishlist.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingComponent } from './components/landing/landing.component';
import { MyInfoComponent } from './components/profile/my-info/my-info.component';
import { VipComponent } from './components/profile/my-documents/vip/vip.component';

const routes: Routes = [
  {
    path: ':name',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'myinfo',
          },
          {
            path: 'myinfo',
            component: MyInfoComponent,
          },
          {
            path: 'mywishlist',
            component: MyWishlistComponent,
          },
          {
            path: 'mydocuments',
            component: MyDocumentsComponent,
          },
          {
            path: 'mydocuments/identity-documents',
            component: IdentityComponent,
          },
          {
            path: 'mydocuments/motivation-documents',
            component: MotivationComponent,
          },
          {
            path: 'mydocuments/academic-documents',
            component: AcademicComponent,
          },
          {
            path: 'mydocuments/language-documents',
            component: LanguageComponent,
          },
          {
            path: 'mydocuments/supporting-documents',
            component: SupportingComponent,
          },
          {
            path: 'mydocuments/vip',
            component: VipComponent,
          },
          {
            path: 'programs',
            component: ProgramsComponent,
          },
        ],
      },
      {
        path: 'general',
        component: GeneralComponent,
        children: [
          {
            path: '',
            redirectTo: 'how-to-start',
          },
          {
            path: 'how-to-start',
            component: HowToStartComponent,
          },
          {
            path: 'education',
            component: EducationComponent,
          },
          {
            path: 'additional-information',
            component: AdditionalInformationComponent,
          },
        ],
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentDashboardRoutingModule {}
