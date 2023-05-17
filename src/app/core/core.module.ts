import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { CoreRoutingModule } from './core.routing.module';

import { HeaderComponent } from './components/header/header.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    CoreRoutingModule,
  ],
  exports: [HeaderComponent, FooterComponent, NgbModule, ReactiveFormsModule],
})
export class CoreModule {}
