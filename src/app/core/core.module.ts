import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { CoreRoutingModule } from './core.routing.module';

import { HeaderComponent } from './components/header/header.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { UpperHeaderComponent } from './components/upper-header/upper-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    UpperHeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    UpperHeaderComponent,
  ],
})
export class CoreModule {}
