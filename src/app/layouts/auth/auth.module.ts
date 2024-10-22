import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { RegisterAgentComponent } from './components/register-agent/register-agent.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DoneComponent } from './components/done/done.component';
import { CheckInboxComponent } from './components/check-inbox/check-inbox.component';
import { AuthComponent } from './components/auth/auth.component';
import { VerfiyComponent } from './components/verfiy/verfiy.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {
  SocialAuthServiceConfig,
  SocialAuthService,
} from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { SharedModule } from '../../shared/shared.module';
import { RepresentativePasswordComponent } from './components/representative-password/representative-password.component';

export function MsalInterfaceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '44cca134-2599-4594-925f-c181645935fb',
      redirectUri: 'http://localhost:4200',
    },
  });
}
@NgModule({
  declarations: [
    LoginComponent,
    RegisterStudentComponent,
    RegisterAgentComponent,
    ResetPasswordComponent,
    DoneComponent,
    CheckInboxComponent,
    VerfiyComponent,
    AuthComponent,
    ChangePasswordComponent,
    RepresentativePasswordComponent,
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
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInterfaceFactory,
    },
    MsalService,
    SocialAuthService,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIntlTelInputModule,
    MatIconModule,
    MsalModule,
    SharedModule,
  ],
})
export class AuthModule {}
