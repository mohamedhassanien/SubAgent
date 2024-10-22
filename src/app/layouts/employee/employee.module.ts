import { Application } from 'src/app/shared/models/application';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddEmployeeComponent } from './components/dashboard/add-employee/add-employee.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  NgbModalModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { ProspectManagementComponent } from './components/dashboard/prospect-management/prospect-management.component';
import { ApplicationManagementComponent } from './components/dashboard/application-management/application-management.component';
import { NationalitiesComponent } from './components/dashboard/statistics/nationalities/nationalities.component';
import { EmployeesComponent } from './components/dashboard/statistics/employees/employees.component';
import { LeadsComponent } from './components/dashboard/prospect-management/leads/leads.component';
import { AddLeadComponent } from './components/dashboard/prospect-management/add-lead/add-lead.component';
import { AllApplicationsComponent } from './components/dashboard/application-management/all-applications/all-applications.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { ApplicationsComponent } from './components/dashboard/statistics/applications/applications.component';
import { LeadComponent } from './components/dashboard/prospect-management/leads/lead/lead.component';
import { AllLeadsComponent } from './components/dashboard/prospect-management/all-leads/all-leads.component';
import { SchoolsComponent } from './components/dashboard/statistics/schools/schools.component';
import { AllSchoolsComponent } from './components/dashboard/programs-management/all-schools/all-schools.component';
import { AllProgramsComponent } from './components/dashboard/programs-management/all-programs/all-programs.component';
import { ArchivedRecordsComponent } from './components/dashboard/archived-records/archived-records.component';
import { ArchivedProspectsComponent } from './components/dashboard/archived-records/archived-prospects/archived-prospects.component';
import { ArchivedApplicationsComponent } from './components/dashboard/archived-records/archived-applications/archived-applications.component';
import { DeletedRecordsComponent } from './components/dashboard/deleted-records/deleted-records.component';
import { DeletedLeadsComponent } from './components/dashboard/deleted-records/deleted-leads/deleted-leads.component';
import { DeletedApplicationsComponent } from './components/dashboard/deleted-records/deleted-applications/deleted-applications.component';
import { ProspectsTableComponent } from './components/dashboard/components/prospects-table/prospects-table.component';
import { SchoolsTableComponent } from './components/dashboard/components/schools-table/schools-table.component';
import { ProgramsTableComponent } from './components/dashboard/components/programs-table/programs-table.component';
import { ApplicationsTableComponent } from './components/dashboard/components/applications-table/applications-table.component';
import { CommentsComponent } from './components/dashboard/components/comments/comments.component';
import { UploadedDocumentsComponent } from './components/dashboard/components/uploaded-documents/uploaded-documents.component';
import { MyApplicationsComponent } from './components/dashboard/application-management/my-applications/my-applications.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';
import { LeadManagementComponent } from './components/dashboard/lead-management/lead-management.component';
import { RegisteredLeadComponent } from './components/dashboard/lead-management/registered-lead/registered-lead.component';
import { AddProspectComponent } from './components/dashboard/lead-management/add-prospect/add-prospect.component';
import { RestoredLeadTableComponent } from './components/dashboard/components/restored-lead-table/restored-lead-table.component';
import { RegisteredLeadTableComponent } from './components/dashboard/components/registered-lead-table/registered-lead-table.component';
import { TargetManagementComponent } from './components/target-management/target-management.component';
import { AddTargetComponent } from './components/target-management/add-target/add-target.component';
import { SiteApplicationsComponent } from './components/dashboard/application-management/site-applications/site-applications.component';
import { ProgramsManagementComponent } from './components/dashboard/programs-management/programs-management.component';
import { EditProgramComponent } from './components/dashboard/programs-management/edit-program/edit-program.component';
import { RestoredLeadComponent } from './components/dashboard/lead-management/restored-lead/restored-lead.component';
import { AddSchoolComponent } from './components/dashboard/programs-management/add-school/add-school.component';
import { UploadDetailsComponent } from './components/dashboard/programs-management/add-school/upload-details/upload-details.component';
import { UploadListComponent } from './components/dashboard/programs-management/add-school/upload-list/upload-list.component';
import { AddProgramComponent } from './components/dashboard/programs-management/add-program/add-program.component';
import { JanthisyearComponent } from './components/dashboard/prospect-management/all-leads/janthisyear/janthisyear.component';
import { SepthisyearComponent } from './components/dashboard/prospect-management/all-leads/septhisyear/septhisyear.component';
import { JannextyearComponent } from './components/dashboard/prospect-management/all-leads/jannextyear/jannextyear.component';
import { MyjanthisyearComponent } from './components/dashboard/prospect-management/leads/myjanthisyear/myjanthisyear.component';
import { MysepthisyearComponent } from './components/dashboard/prospect-management/leads/mysepthisyear/mysepthisyear.component';
import { MyjannextyearComponent } from './components/dashboard/prospect-management/leads/myjannextyear/myjannextyear.component';
import { AppjanthisyearComponent } from './components/dashboard/application-management/all-applications/appjanthisyear/appjanthisyear.component';
import { AppsepthisyearComponent } from './components/dashboard/application-management/all-applications/appsepthisyear/appsepthisyear.component';
import { AppjannextyearComponent } from './components/dashboard/application-management/all-applications/appjannextyear/appjannextyear.component';
import { MyappjanoneComponent } from './components/dashboard/application-management/my-applications/myappjanone/myappjanone.component';
import { MyappjantwoComponent } from './components/dashboard/application-management/my-applications/myappjantwo/myappjantwo.component';
import { MyappsepComponent } from './components/dashboard/application-management/my-applications/myappsep/myappsep.component';
import { TotalleadsComponent } from './components/dashboard/prospect-management/all-leads/totalleads/totalleads.component';
import { AllmyleadsComponent } from './components/dashboard/prospect-management/leads/allmyleads/allmyleads.component';
import { TotalapplicationComponent } from './components/dashboard/application-management/all-applications/totalapplication/totalapplication.component';
import { AllmyappComponent } from './components/dashboard/application-management/my-applications/allmyapp/allmyapp.component';
import { JthisyearComponent } from './components/dashboard/prospect-management/all-leads/jthisyear/jthisyear.component';
import { JnthisyearComponent } from './components/dashboard/prospect-management/leads/jnthisyear/jnthisyear.component';
import { MyjyearComponent } from './components/dashboard/application-management/all-applications/myjyear/myjyear.component';
import { MejanComponent } from './components/dashboard/application-management/my-applications/mejan/mejan.component';
import { DashbordprofileComponent } from './components/landing/dashbordprofile/dashbordprofile.component';
import { EmployeeManagementComponent } from './components/dashboard/employee-management/employee-management.component';
import { EmployeeTeamComponent } from './components/dashboard/employee-team/employee-team.component';
import { DragDirective } from '../../shared/directives/dragAndDrop.directive';
import { NotificationsComponent } from './components/dashboard/notifications/notifications.component';

import { GridViewComponent } from './components/dashboard/components/grid-view/grid-view.component';
import { ProspectGridViewComponent } from './components/dashboard/components/prospect-grid-view/prospect-grid-view.component';
import { ApplicationGridViewComponent } from './components/dashboard/components/application-grid-view/application-grid-view.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';


import { NgxSliderModule } from '@angular-slider/ngx-slider';

import {MatTabsModule} from '@angular/material/tabs';
import { DeletedProspectsComponent } from './components/dashboard/deleted-records/deleted-prospects/deleted-prospects.component';
import { SuggestedProgramPopupComponent } from './components/dashboard/components/suggested-program-popup/suggested-program-popup.component';
import {AutoCompleteModule} from 'primeng/autocomplete';


@NgModule({
  declarations: [
    DragDirective,
    LandingComponent,
    DashboardComponent,
    StatisticsComponent,
    ProspectManagementComponent,
    ApplicationManagementComponent,
    NationalitiesComponent,
    EmployeesComponent,
    LeadsComponent,
    LeadComponent,
    AddLeadComponent,
    AllApplicationsComponent,
    ApplicationsComponent,
    AllLeadsComponent,
    ArchivedRecordsComponent,
    ArchivedProspectsComponent,
    ArchivedApplicationsComponent,
    DeletedRecordsComponent,
    DeletedLeadsComponent,
    DeletedApplicationsComponent,
    ProspectsTableComponent,
    ApplicationsTableComponent,
    AllSchoolsComponent,
    AllProgramsComponent,
    SchoolsTableComponent,
    ProgramsTableComponent,
    SchoolsComponent,
    CommentsComponent,
    UploadedDocumentsComponent,
    MyApplicationsComponent,
    LeadManagementComponent,
    RestoredLeadComponent,
    RegisteredLeadComponent,
    AddProspectComponent,
    RestoredLeadTableComponent,
    RegisteredLeadTableComponent,
    AddEmployeeComponent,
    TargetManagementComponent,
    AddTargetComponent,
    SiteApplicationsComponent,
    ProgramsManagementComponent,
    EditProgramComponent,
    AddSchoolComponent,
    UploadDetailsComponent,
    UploadListComponent,
    AddProgramComponent,
    JanthisyearComponent,
    SepthisyearComponent,
    JannextyearComponent,
    MyjanthisyearComponent,
    MysepthisyearComponent,
    MyjannextyearComponent,
    AppjanthisyearComponent,
    AppsepthisyearComponent,
    AppjannextyearComponent,
    MyappjanoneComponent,
    MyappjantwoComponent,
    MyappsepComponent,
    TotalleadsComponent,
    AllmyleadsComponent,
    TotalapplicationComponent,
    AllmyappComponent,
    JthisyearComponent,
    JnthisyearComponent,
    MyjyearComponent,
    MejanComponent,
    DashbordprofileComponent,
    EmployeeManagementComponent,
    EmployeeTeamComponent,
    NotificationsComponent,
    GridViewComponent,
    ProspectGridViewComponent,
    ApplicationGridViewComponent,
    DeletedProspectsComponent,
    SuggestedProgramPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EmployeeRoutingModule,
    NgApexchartsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModalModule,
    SharedModule,
    NgxIntlTelInputModule,
    NgbModule,
    MaterialModule,
    DragScrollModule,
    MdbAccordionModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    ProgressBarModule,
    BadgeModule,
    MatAutocompleteModule,
    InputNumberModule,
    MultiSelectModule,
    DragDropModule,
    MatButtonModule,
    NgxSliderModule,
    MatTabsModule,
    AutoCompleteModule
  ],
})
export class EmployeeModule {}
