import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './components/application/application.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProfileComponent } from './profile.component';
import { ProgramsComponent } from './components/programs/programs.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'documents',
      },
      {
        path: 'documents',
        component: DocumentsComponent
      }, 
      {
        path: 'application',
        component: ApplicationComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'programs',
        component: ProgramsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
