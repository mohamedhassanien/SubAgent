import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpDashboardRoutingModule } from './emp-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MatRadioModule } from '@angular/material/radio';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEmployeeComponent } from './components/dashboard/add-employee/add-employee.component';
import { AllLeadsComponent } from './components/dashboard/lead-management/all-leads/all-leads.component';
import { LeadsComponent } from './components/dashboard/lead-management/leads/leads.component';
import { LeadManagementComponent } from './components/dashboard/lead-management/lead-management.component';
import { AddLeadComponent } from './components/dashboard/lead-management/add-lead/add-lead.component';
import { ArchivedRecordsComponent } from './components/dashboard/archived-records/archived-records.component';
import { ArchivedLeadsComponent } from './components/dashboard/archived-records/archived-leads/archived-leads.component';
import { ArchivedApplicationsComponent } from './components/dashboard/archived-records/archived-applications/archived-applications.component';
import { ApplicationManagementComponent } from './components/dashboard/application-management/application-management.component';
import { AllApplicationsComponent } from './components/dashboard/application-management/all-applications/all-applications.component';
import { MyApplicationsComponent } from './components/dashboard/application-management/my-applications/my-applications.component';
import { LandingComponent } from './components/landing/landing.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { SchoolsComponent } from './components/dashboard/statistics/schools/schools.component';
import { EmployeesComponent } from './components/dashboard/statistics/employees/employees.component';
import { LeadComponent } from './components/dashboard/lead-management/leads/lead/lead.component';
import { ApplicationsComponent } from './components/dashboard/statistics/applications/applications.component';
import { ApplicationComponent } from './components/dashboard/application-management/all-applications/application/application.component';
import { LeadsTableComponent } from './components/dashboard/components/leads-table/leads-table.component';
import { ApplicationsTableComponent } from './components/dashboard/components/applications-table/applications-table.component';
import { UploadedDocumentsComponent } from './components/dashboard/components/uploaded-documents/uploaded-documents.component';
import { ProspectComponent } from './components/dashboard/prospect/prospect.component';
import { AllProspectComponent } from './components/dashboard/prospect/all-prospect/all-prospect.component';
import { MyProspectComponent } from './components/dashboard/prospect/my-prospect/my-prospect.component';
import { AddProspectComponent } from './components/dashboard/prospect/add-prospect/add-prospect.component';
import { ProspectTableComponent } from './components/dashboard/components/prospect-table/prospect-table.component';
import { TargetManagementComponent } from './components/target-management/target-management.component';
import { AddTargetComponent } from './components/target-management/add-target/add-target.component';
import { ProgramsManagementComponent } from './components/dashboard/programs-management/programs-management.component';
import { SiteApplicationsComponent } from './components/dashboard/application-management/site-applications/site-applications.component';
import { EditProgramComponent } from './components/dashboard/programs-management/edit-program/edit-program.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    LandingComponent,
    DashboardComponent,
    StatisticsComponent,
    LeadManagementComponent,
    ApplicationManagementComponent,
    SchoolsComponent,
    EmployeesComponent,
    LeadsComponent,
    LeadComponent,
    AddLeadComponent,
    AllApplicationsComponent,
    ApplicationsComponent,
    ApplicationComponent,
    AllLeadsComponent,
    ArchivedRecordsComponent,
    ArchivedLeadsComponent,
    ArchivedApplicationsComponent,
    LeadsTableComponent,
    ApplicationsTableComponent,
    UploadedDocumentsComponent,
    MyApplicationsComponent,
    ProspectComponent,
    AllProspectComponent,
    MyProspectComponent,
    AddProspectComponent,
    ProspectTableComponent,
    AddEmployeeComponent,
    TargetManagementComponent,
    AddTargetComponent,
    SiteApplicationsComponent,
    ProgramsManagementComponent,
    EditProgramComponent,
  ],
  imports: [
    CommonModule,
    EmpDashboardRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TableModule,
    ButtonModule,
    BadgeModule,
    ProgressBarModule,
    MatInputModule,
    NgxIntlTelInputModule,
    MatSidenavModule,
    DropdownModule,
    NgxSliderModule,
    MatMenuModule,
    MatIconModule,
    SharedModule,
    MdbAccordionModule,
    MatRadioModule,
    MatBadgeModule,
    MatDividerModule,
    MatFormFieldModule,
    DragScrollModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: empTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
})
export class EmpDashboardModule {}
export function empTranslateLoader(http: HttpClient) {
  console.log('FeatureModule empTranslateLoader');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
