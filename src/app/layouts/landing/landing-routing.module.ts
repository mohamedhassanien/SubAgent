import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramInfoComponent } from './programs/components/program-info/program-info.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'programs',
        pathMatch: 'full',
      },
      {
        path: 'programs',
        component: ProgramsComponent,
      },
      {
        path: 'programs/:name/:id',
        component: ProgramInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
