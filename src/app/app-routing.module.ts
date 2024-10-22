import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { StudentGuard } from './shared/guards/student/student.guard';
import { EmployeeGuard } from './shared/guards/employee/employee.guard';
import { HousinganywhereComponent } from './layouts/student-nav/components/housing/housinganywhere/housinganywhere.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing/home',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./layouts/landing/landing.module').then((m) => m.LandingModule),
  },
  // {
  //   path: 'students',
  //   loadChildren: () =>
  //     import('./layouts/student/student.module').then((m) => m.StudentModule),
  //   canActivate: [StudentGuard],
  // },
  {
    path: 'employees',
    loadChildren: () =>
      import('./layouts/employee/employee.module').then(
        (m) => m.EmployeeModule
      ),
    canActivate: [EmployeeGuard],
  },
  {
    path: 'student-navigator',
    loadChildren: () =>
      import('./layouts/student-nav/student-nav.module').then(
        (m) => m.StudentNavModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./layouts/profile/profile.module').then((m) => m.ProfileModule),
    // canActivate: [StudentGuard]
  },
  {
    path: 'marketplace',
    loadChildren: () =>
      import('./layouts/marketplace/marketplace.module').then(
        (m) => m.MarketplaceModule
      ),
  },

  {
    path: 'chat-bot',
    loadChildren: () =>
      import('./layouts/chat-bot/chat-bot.module').then((m) => m.ChatBotModule),
  },
  { path: 'housinganywhere', component: HousinganywhereComponent },

  // {
  //   path: 'owners',
  //   loadChildren:  ()=> import('./layouts/owner/owner.module')
  //   .then(m => m.OwnerModule), canActivate : [AgentGuard]
  // },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./layouts/auth/auth.module').then((m) => m.AuthModule),
  // },
  {
    path: 'auth',
    loadChildren: () =>
      import('./layouts/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./layouts/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./layouts/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'disabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
