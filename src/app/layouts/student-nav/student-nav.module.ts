import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import player from 'lottie-web';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentNavRoutingModule } from './student-nav-routing.module';
import { StudentNavComponent } from './student-nav.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ApplicationComponent } from './components/application/application.component';
import { CvTranscriptComponent } from './components/application/cv-transcript/cv-transcript.component';
import { AcceptanceComponent } from './components/acceptance/acceptance.component';
import { MotivationLetterComponent } from './components/application/motivation-letter/motivation-letter.component';
import { PayTheDepositComponent } from './components/acceptance/pay-the-deposit/pay-the-deposit.component';
import { PayCVECComponent } from './components/acceptance/pay-cvec/pay-cvec.component';
import { AlternanceComponent } from './components/acceptance/alternance/alternance.component';
import { GarantComponent } from './components/housing/garant/garant.component';
import { VisaComponent } from './components/visa/visa.component';
import { RecommendationLetterComponent } from './components/application/recommendation-letter/recommendation-letter.component';
import { HousingComponent } from './components/housing/housing.component';
import { BookingComponent } from './components/housing/booking/booking.component';
import { AvoidScamsComponent } from './components/housing/avoid-scams/avoid-scams.component';
import { InterviewPreparationComponent } from './components/application/interview-preparation/interview-preparation.component';
import { LanguageTestComponent } from './components/application/language-test/language-test.component';
import { InFranceComponent } from './components/in-france/in-france.component';
import { ExtraInsuranceComponent } from './components/in-france/extra-insurance/extra-insurance.component';
import { BankAccountComponent } from './components/in-france/bank-account/bank-account.component';
import { CrousComponent } from './components/in-france/crous/crous.component';
import { GymMembershipComponent } from './components/in-france/gym-membership/gym-membership.component';
import { SimCardInternetComponent } from './components/in-france/sim-card-internet/sim-card-internet.component';
import { SocialSecurityCardComponent } from './components/in-france/social-security-card/social-security-card.component';
import { CampusFranceComponent } from './components/visa/campus-france/campus-france.component';
import { FranceVisaComponent } from './components/visa/france-visa/france-visa.component';
import { ValidateYourVisaComponent } from './components/visa/validate-your-visa/validate-your-visa.component';
import { MyVisaRejectedComponent } from './components/visa/my-visa-rejected/my-visa-rejected.component';
import { LottieModule } from 'ngx-lottie';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CafComponent } from './components/housing/caf/caf.component';
import { HousingInsuranceComponent } from './components/housing/housing-insurance/housing-insurance.component';
import { AppartementInventoryComponent } from './components/housing/appartement-inventory/appartement-inventory.component';
import { OccordionFourComponent } from './components/visa/campus-france/occordion-four/occordion-four.component';
import { OccordionOneComponent } from './components/visa/campus-france/occordion-one/occordion-one.component';
import { TlsVfsComponent } from './components/visa/tls-vfs/tls-vfs.component';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

// import { PrimeIcons, MenuItem } from 'primeng/api'

import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { PrimeIcons } from 'primeng/api';
import { AcceptanceLetterComponent } from './components/acceptance/acceptance-letter/acceptance-letter.component';
import { InterviewComponent } from './components/interview/interview.component';
import { InterviewPreComponent } from './components/interview/interview-pre/interview-pre.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    StudentNavComponent,
    ApplicationComponent,
    CvTranscriptComponent,
    AcceptanceComponent,
    MotivationLetterComponent,
    PayTheDepositComponent,
    PayCVECComponent,
    AlternanceComponent,
    GarantComponent,
    VisaComponent,
    RecommendationLetterComponent,
    HousingComponent,
    BookingComponent,
    AvoidScamsComponent,
    InterviewPreparationComponent,
    LanguageTestComponent,
    InFranceComponent,
    ExtraInsuranceComponent,
    BankAccountComponent,
    CrousComponent,
    GymMembershipComponent,
    SimCardInternetComponent,
    SocialSecurityCardComponent,
    CampusFranceComponent,
    FranceVisaComponent,
    ValidateYourVisaComponent,
    MyVisaRejectedComponent,
    CafComponent,
    HousingInsuranceComponent,
    AppartementInventoryComponent,
    OccordionFourComponent,
    OccordionOneComponent,
    TlsVfsComponent,
    AcceptanceLetterComponent,
    InterviewComponent,
    InterviewPreComponent,
  ],
  imports: [
    CommonModule,
    StudentNavRoutingModule,
    [LottieModule.forRoot({ player: playerFactory })],
    GalleriaModule,
    ButtonModule,
    // PrimeIcons,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    MaterialModule,
    HttpClientModule,
    NgxSliderModule,
    CoreModule,
    SharedModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      animationDuration: 300,
    }),
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
export class StudentNavModule {}
