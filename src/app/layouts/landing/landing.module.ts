import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule, playerFactory } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LottieModule } from 'ngx-lottie';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CoreModule } from 'src/app/core/core.module';

import { LandingRoutingModule } from './landing-routing.module';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramInfoComponent } from './programs/components/program-info/program-info.component';
import { FigsComponent } from './programs/components/program-info/figs/figs.component';
import { GalileoDataComponent } from './programs/components/program-info/galileo-data/galileo-data.component';
import { LandingComponent } from './landing/landing.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    ProgramsComponent,
    ProgramInfoComponent,
    FigsComponent,
    GalileoDataComponent,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    CarouselModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    MatSnackBarModule,
    MatInputModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxIntlTelInputModule,
    BsDropdownModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: landingTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    [LottieModule.forRoot({ player: playerFactory })],
    NgbModule,
    NgbModalModule,
    CoreModule,
  ],
})
export class LandingModule {}
export function landingTranslateLoader(http: HttpClient) {
  console.log('FeatureModule landingTranslateLoader');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
