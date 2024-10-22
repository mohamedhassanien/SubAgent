import { ConfirmPasswordGuard } from './../../shared/guards/confirm-password/confirm-password.guard';
import { CheckInboxComponent } from './components/check-inbox/check-inbox.component';
import { DoneComponent } from './components/done/done.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { VerfiyComponent } from './components/verfiy/verfiy.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RepresentativePasswordComponent } from './components/representative-password/representative-password.component';

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
        path: 'register/student',
        component: RegisterStudentComponent,
      },
      {
        path: 'change-password/:token',
        component: ChangePasswordComponent,
        canActivate: [ConfirmPasswordGuard],
      },
      {
        path: 'representative-password',
        component: RepresentativePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
