import { RequestsComponent } from './components/requests/requests.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: ''
      },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'Statistics', component: StatisticsComponent
      },
      {
        path: 'Contacts', component: ContactsComponent
      },
      {
        path: 'Requests', component: RequestsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
