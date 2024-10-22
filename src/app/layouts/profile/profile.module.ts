import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LottieModule } from 'ngx-lottie';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { SharedModule } from 'primeng/api';
import { DocumentsComponent } from './components/documents/documents.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ApplicationComponent } from './components/application/application.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MotivationComponent } from './components/documents/motivation/motivation.component';
import { IdentityComponent } from './components/documents/identity/identity.component';
import { LanguageComponent } from './components/documents/language/language.component';
import { SupportComponent } from './components/documents/support/support.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  FacebookLoginProvider,
  SocialAuthServiceConfig,
  SocialAuthService,
} from 'angularx-social-login';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgramsComponent } from './components/programs/programs.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DocumentsComponent,
    ApplicationComponent,
    WishlistComponent,
    NotificationComponent,
    SettingsComponent,
    MotivationComponent,
    IdentityComponent,
    LanguageComponent,
    SupportComponent,
    ProgramsComponent,
  ],
  imports: [
    CommonModule,
    MdbAccordionModule,
    MatCheckboxModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ProfileRoutingModule,
    HttpClientModule,
    DropdownModule,
    InputNumberModule,
    NgxSliderModule,
    MultiSelectModule,
    SharedModule,
    LottieModule,
    GalleriaModule,
    ButtonModule,
    NgbModule,
    CarouselModule,
    MatTabsModule,
    NgxIntlTelInputModule,
    CoreModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1019683985339770'),
          },
        ],
        onError: (err) => {
          console.log(err);
        },
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
  ],
})
export class ProfileModule {}
