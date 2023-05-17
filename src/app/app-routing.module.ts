import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StudentGuard } from './shared/guards/student/student.guard';
import { EmployeeGuard } from './shared/guards/employee/employee.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./layouts/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'landing',
    loadChildren: () =>
      import('./layouts/landing/landing.module').then((m) => m.LandingModule),
  },

  {
    path: 'employees',
    loadChildren: () =>
      import('./layouts/emp-dashboard/emp-dashboard.module').then(
        (m) => m.EmpDashboardModule
      ),
      canActivate: [EmployeeGuard],
  },

  {
    path: 'students',
    loadChildren: () =>
      import('./layouts/student-dashboard/student-dashboard.module').then(
        (m) => m.StudentDashboardModule
      ),
      canActivate: [StudentGuard],

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
