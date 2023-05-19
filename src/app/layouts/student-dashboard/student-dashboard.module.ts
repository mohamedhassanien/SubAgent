import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyWishlistComponent } from './components/profile/my-wishlist/my-wishlist.component';
import { MyDocumentsComponent } from './components/profile/my-documents/my-documents.component';
import { GeneralComponent } from './components/general/general.component';
import { HowToStartComponent } from './components/general/how-to-start/how-to-start.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { EducationComponent } from './components/general/education/education.component';
import { AdditionalInformationComponent } from './components/general/additional-information/additional-information.component';
import { IdentityComponent } from './components/profile/my-documents/identity/identity.component';
import { MotivationComponent } from './components/profile/my-documents/motivation/motivation.component';
import { AcademicComponent } from './components/profile/my-documents/academic/academic.component';
import { LanguageComponent } from './components/profile/my-documents/language/language.component';
import { SupportingComponent } from './components/profile/my-documents/supporting/supporting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LottieModule } from 'ngx-lottie';
import { SharedModule, playerFactory } from 'src/app/shared/shared.module';
import { ChipModule } from 'primeng/chip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MyInfoComponent } from './components/profile/my-info/my-info.component';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    LandingComponent,
    ProfileComponent,
    MyInfoComponent,
    MyWishlistComponent,
    MyDocumentsComponent,
    GeneralComponent,
    HowToStartComponent,
    EditProfileComponent,
    AccountSettingsComponent,
    EducationComponent,
    AdditionalInformationComponent,
    IdentityComponent,
    MotivationComponent,
    AcademicComponent,
    LanguageComponent,
    SupportingComponent,
  ],
  imports: [
    CommonModule,
    StudentDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    RouterModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxSliderModule,
    MdbAccordionModule,
    NgxIntlTelInputModule,
    ChipModule,
    MatIconModule,
    MatStepperModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    LottieModule.forRoot({ player: playerFactory }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: studentTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
})
export class StudentDashboardModule {}
export function studentTranslateLoader(http: HttpClient) {
  console.log('FeatureModule studentTranslateLoader');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
