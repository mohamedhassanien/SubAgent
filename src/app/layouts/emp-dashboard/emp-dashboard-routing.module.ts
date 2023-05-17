import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllLeadsComponent } from './components/dashboard/lead-management/all-leads/all-leads.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { AddEmployeeComponent } from './components/dashboard/add-employee/add-employee.component';
import { ApplicationManagementComponent } from './components/dashboard/application-management/application-management.component';
import { AllApplicationsComponent } from './components/dashboard/application-management/all-applications/all-applications.component';
import { MyApplicationsComponent } from './components/dashboard/application-management/my-applications/my-applications.component';
import { ArchivedRecordsComponent } from './components/dashboard/archived-records/archived-records.component';
import { ArchivedLeadsComponent } from './components/dashboard/archived-records/archived-leads/archived-leads.component';
import { ArchivedApplicationsComponent } from './components/dashboard/archived-records/archived-applications/archived-applications.component';
import { DeletedRecordsComponent } from './components/dashboard/deleted-records/deleted-records.component';
import { DeletedLeadsComponent } from './components/dashboard/deleted-records/deleted-leads/deleted-leads.component';
import { DeletedApplicationsComponent } from './components/dashboard/deleted-records/deleted-applications/deleted-applications.component';
import { LeadManagementComponent } from './components/dashboard/lead-management/lead-management.component';
import { LeadsComponent } from './components/dashboard/lead-management/leads/leads.component';
import { AddLeadComponent } from './components/dashboard/lead-management/add-lead/add-lead.component';
import { LandingComponent } from './components/landing/landing.component';
import { NationalitiesComponent } from './components/dashboard/statistics/nationalities/nationalities.component';
import { ApplicationsComponent } from './components/dashboard/statistics/applications/applications.component';
import { SchoolsComponent } from './components/dashboard/statistics/schools/schools.component';
import { EmployeesComponent } from './components/dashboard/statistics/employees/employees.component';
import { ProspectComponent } from './components/dashboard/prospect/prospect.component';
import { AllProspectComponent } from './components/dashboard/prospect/all-prospect/all-prospect.component';
import { MyProspectComponent } from './components/dashboard/prospect/my-prospect/my-prospect.component';
import { AddProspectComponent } from './components/dashboard/prospect/add-prospect/add-prospect.component';
import { AddTargetComponent } from './components/target-management/add-target/add-target.component';
import { SiteApplicationsComponent } from './components/dashboard/application-management/site-applications/site-applications.component';
import { ProgramsManagementComponent } from './components/dashboard/programs-management/programs-management.component';
import { EditProgramComponent } from './components/dashboard/programs-management/edit-program/edit-program.component';

const routes: Routes = [
  {
    path: ':name',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: '',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: '',
            redirectTo: 'statistics',
          },
          {
            path: 'statistics',
            component: StatisticsComponent,
            children: [
              {
                path: '',
                redirectTo: 'nationalities',
              },
              {
                path: 'nationalities',
                component: NationalitiesComponent,
              },
              {
                path: 'applications',
                component: ApplicationsComponent,
              },
              {
                path: 'schools',
                component: SchoolsComponent,
              },
              {
                path: 'employees',
                component: EmployeesComponent,
              },
            ],
          },
          {
            path: 'prospect',
            component: ProspectComponent,
            children: [
              {
                path: '',
                redirectTo: 'all-prospect',
              },
              {
                path: 'all-prospect',
                component: AllProspectComponent,
              },
              {
                path: 'my-prospect',
                component: MyProspectComponent,
              },
              {
                path: 'add-prospect',
                component: AddProspectComponent,
              },
            ],
          },

          {
            path: 'lead-management',
            component: LeadManagementComponent,
            children: [
              {
                path: '',
                redirectTo: 'all-leads',
              },
              {
                path: 'leads',
                component: LeadsComponent,
              },
              {
                path: 'all-leads',
                component: AllLeadsComponent,
              },
              {
                path: 'add-lead',
                component: AddLeadComponent,
              },
            ],
          },
          { path: 'add-employee', component: AddEmployeeComponent },
          { path: 'add-target', component: AddTargetComponent },

          {
            path: 'application-management',
            component: ApplicationManagementComponent,
            children: [
              {
                path: '',
                redirectTo: 'all-applications',
              },
              {
                path: 'all-applications',
                component: AllApplicationsComponent,
              },
              {
                path: 'applications',
                component: MyApplicationsComponent,
              },
              {
                path: 'site-apps',
                component: SiteApplicationsComponent,
              },
            ],
          },

          {
            path: 'target-management',
            component: ApplicationManagementComponent,
            children: [
              {
                path: '',
                redirectTo: 'add-target',
              },
              {
                path: 'add-target',
                component: AddTargetComponent,
              },
            ],
          },
          {
            path: 'archived-records',
            component: ArchivedRecordsComponent,
            children: [
              {
                path: '',
                redirectTo: 'archived-leads',
              },
              {
                path: 'archived-leads',
                component: ArchivedLeadsComponent,
              },
              {
                path: 'archived-applications',
                component: ArchivedApplicationsComponent,
              },
            ],
          },
          {
            path: 'deleted-records',
            component: DeletedRecordsComponent,
            children: [
              {
                path: '',
                redirectTo: 'deleted-leads',
              },
              {
                path: 'deleted-leads',
                component: DeletedLeadsComponent,
              },
              {
                path: 'deleted-applications',
                component: DeletedApplicationsComponent,
              },
            ],
          },

          {
            path: 'programs-management',
            component: ProgramsManagementComponent,
            children: [
              {
                path: '',
                redirectTo: 'deleted-leads',
              },

              {
                path: 'edit-program',
                component: EditProgramComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpDashboardRoutingModule {}
