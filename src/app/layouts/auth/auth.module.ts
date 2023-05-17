import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { DoneComponent } from './components/done/done.component';
import { CheckInboxComponent } from './components/check-inbox/check-inbox.component';
import { VerfiyComponent } from './components/verfiy/verfiy.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ConfirmPasswordComponent,
    DoneComponent,
    CheckInboxComponent,
    VerfiyComponent,
    AuthComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    MatIconModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: authTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
})
export class AuthModule {}
export function authTranslateLoader(http: HttpClient) {
  console.log('FeatureModule authTranslateLoader');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
