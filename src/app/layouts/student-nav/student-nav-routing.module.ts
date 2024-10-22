import { NgModule } from '@angular/core';
import { StudentNavComponent } from './student-nav.component';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './components/application/application.component';
import { CvTranscriptComponent } from './components/application/cv-transcript/cv-transcript.component';
import { AcceptanceComponent } from './components/acceptance/acceptance.component';
import { PayCVECComponent } from './components/acceptance/pay-cvec/pay-cvec.component';
import { PayTheDepositComponent } from './components/acceptance/pay-the-deposit/pay-the-deposit.component';
import { AlternanceComponent } from './components/acceptance/alternance/alternance.component';
import { MotivationLetterComponent } from './components/application/motivation-letter/motivation-letter.component';
import { RecommendationLetterComponent } from './components/application/recommendation-letter/recommendation-letter.component';
import { HousingComponent } from './components/housing/housing.component';
import { BookingComponent } from './components/housing/booking/booking.component';
import { AvoidScamsComponent } from './components/housing/avoid-scams/avoid-scams.component';
import { InterviewPreparationComponent } from './components/application/interview-preparation/interview-preparation.component';
import { LanguageTestComponent } from './components/application/language-test/language-test.component';
import { GarantComponent } from './components/housing/garant/garant.component';
import { HousingCertificateComponent } from './components/housing/housing-certificate/housing-certificate.component';
import { HousingInsuranceComponent } from './components/housing/housing-insurance/housing-insurance.component';
import { AppartementInventoryComponent } from './components/housing/appartement-inventory/appartement-inventory.component';
import { CafComponent } from './components/housing/caf/caf.component';
import { VisaComponent } from './components/visa/visa.component';
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
import { TlsVfsComponent } from './components/visa/tls-vfs/tls-vfs.component';
import { AcceptanceLetterComponent } from './components/acceptance/acceptance-letter/acceptance-letter.component';
import { InterviewComponent } from './components/interview/interview.component';
import { InterviewPreComponent } from './components/interview/interview-pre/interview-pre.component';

const routes: Routes = [
  {
    path: '',
    component: StudentNavComponent,
    children: [
      {
        path: '',
        redirectTo: 'application',
      },
      {
        path: 'application',
        component: ApplicationComponent,
        children: [
          { path: '', redirectTo: 'cv-transcript' },
          {
            path: 'cv-transcript',
            component: CvTranscriptComponent,
          },
          { path: 'motivation-letter', component: MotivationLetterComponent },
          {
            path: 'recommendation-letter',
            component: RecommendationLetterComponent,
          },
          {
            path: 'interview-preparation',
            component: InterviewPreparationComponent,
          },
          {
            path: 'language-test',
            component: LanguageTestComponent,
          },
        ],
      },

      {
        path: 'acceptance',
        component: AcceptanceComponent,
        children: [
          { path: '', redirectTo: 'acceptance-letter' },
          { path: 'pay-the-deposit', component: PayTheDepositComponent },
          { path: 'pay-cvec', component: PayCVECComponent },
          { path: 'alternance', component: AlternanceComponent },
          { path: 'acceptance-letter', component: AcceptanceLetterComponent },
        ],
      },
      {
        path: 'housing',
        component: HousingComponent,
        children: [
          { path: '', redirectTo: 'booking' },
          { path: 'booking', component: BookingComponent },
          { path: 'avoid-scams', component: AvoidScamsComponent },
          { path: 'garant', component: GarantComponent },
          {
            path: 'housing-certificate',
            component: HousingCertificateComponent,
          },
          { path: 'housing-insurance', component: HousingInsuranceComponent },
          {
            path: 'appartement-inventory',
            component: AppartementInventoryComponent,
          },
          { path: 'caf', component: CafComponent },
        ],
      },
      {
        path: 'visa',
        component: VisaComponent,
        children: [
          { path: '', redirectTo: 'campus-france' },
          { path: 'campus-france', component: CampusFranceComponent },
          { path: 'france-visa', component: FranceVisaComponent },
          { path: 'validate-your-visa', component: ValidateYourVisaComponent },
          { path: 'my-visa-rejected', component: MyVisaRejectedComponent },
          { path: 'tls-vfs', component: TlsVfsComponent },
        ],
      },
      {
        path: 'in-france',
        component: InFranceComponent,
        children: [
          { path: '', redirectTo: 'extra-insurance' },
          { path: 'extra-insurance', component: ExtraInsuranceComponent },
          { path: 'bank-account', component: BankAccountComponent },
          { path: 'crous', component: CrousComponent },
          { path: 'gym-membership', component: GymMembershipComponent },
          { path: 'sim-card-internet', component: SimCardInternetComponent },
          {
            path: 'social-security-card',
            component: SocialSecurityCardComponent,
          },
        ],
      },
      {
        path: 'interview',
        component: InterviewComponent,
        children: [
          { path: '', redirectTo: 'interview-pre' },
          { path: 'interview-pre', component: InterviewPreComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentNavRoutingModule {}
