// import { CvBuilderComponent } from './all-services/cv-builder/cv-builder.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllServicesComponent } from './components/all-services.component';
import { CvBuilderComponent } from './components/all-services/cv-builder/cv-builder.component';
import { HousingComponent } from './components/all-services/housing/housing.component';
import { LandingComponent } from './components/all-services/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: AllServicesComponent,
    children: [
      { path: '', redirectTo: 'services', pathMatch: 'full' },
      {
        path: 'services',
        component: LandingComponent,
      },
      { path: 'cv-builder', component: CvBuilderComponent },
      { path: 'housing', component: HousingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceRoutingModule {}
