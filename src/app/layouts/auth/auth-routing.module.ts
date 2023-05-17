import { CheckInboxComponent } from './components/check-inbox/check-inbox.component';
import { DoneComponent } from './components/done/done.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { VerfiyComponent } from './components/verfiy/verfiy.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConfirmPasswordGuard } from './guards/confirm-password/confirm-password.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'login/:token',
        component: LoginComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'change-password/:token',
        component: ChangePasswordComponent,
      },
      {
        path: 'done',
        component: DoneComponent,
      },
      {
        path: 'check-your-inbox',
        component: CheckInboxComponent,
      },
      {
        path: 'verfiy',
        component: VerfiyComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'change-password/:token',
        component: ChangePasswordComponent,
        canActivate: [ConfirmPasswordGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
