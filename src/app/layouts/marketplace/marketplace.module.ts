import { CvFormComponent } from './components/all-services/cv-builder/cv-form/cv-form.component';
import { CvViewComponent } from './components/all-services/cv-builder/cv-view/cv-view.component';
import { LandingComponent } from './components/all-services/landing/landing.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CoreModule } from 'src/app/core/core.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { playerFactory, SharedModule } from 'src/app/shared/shared.module';
import { LottieModule } from 'ngx-lottie';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { AllServicesComponent } from './components/all-services.component';
import { HousingService } from './services/housing.service';
import { CvBuilderComponent } from './components/all-services/cv-builder/cv-builder.component';
import { HousingComponent } from './components/all-services/housing/housing.component';

import {
  SocialAuthServiceConfig,
  SocialAuthService,
} from 'angularx-social-login';
import {
  FacebookLoginProvider,
  // GoogleLoginProvider,
} from 'angularx-social-login';

@NgModule({
  declarations: [
    LandingComponent,
    AllServicesComponent,
    HousingComponent,
    CvBuilderComponent,
    CvViewComponent,
    CvFormComponent,
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    MaterialModule,
    HttpClientModule,
    NgxSliderModule,
    CoreModule,
    ImageCropperModule,
    SharedModule,
  ],
  providers: [
    HousingService,
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
export class MarketplaceModule {}
