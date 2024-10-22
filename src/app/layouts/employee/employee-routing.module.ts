import { AddSchoolComponent } from './components/dashboard/programs-management/add-school/add-school.component';
import { ProgramsManagementComponent } from './components/dashboard/programs-management/programs-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { NationalitiesComponent } from './components/dashboard/statistics/nationalities/nationalities.component';
import { ApplicationsComponent } from './components/dashboard/statistics/applications/applications.component';
import { SchoolsComponent } from './components/dashboard/statistics/schools/schools.component';
import { EmployeesComponent } from './components/dashboard/statistics/employees/employees.component';
import { ProspectManagementComponent } from './components/dashboard/prospect-management/prospect-management.component';
import { AddLeadComponent } from './components/dashboard/prospect-management/add-lead/add-lead.component';
import { LeadsComponent } from './components/dashboard/prospect-management/leads/leads.component';
import { AllLeadsComponent } from './components/dashboard/prospect-management/all-leads/all-leads.component';
import { ApplicationManagementComponent } from './components/dashboard/application-management/application-management.component';
import { AllApplicationsComponent } from './components/dashboard/application-management/all-applications/all-applications.component';
import { ArchivedRecordsComponent } from './components/dashboard/archived-records/archived-records.component';
import { ArchivedApplicationsComponent } from './components/dashboard/archived-records/archived-applications/archived-applications.component';
import { ArchivedProspectsComponent } from './components/dashboard/archived-records/archived-prospects/archived-prospects.component';
import { DeletedRecordsComponent } from './components/dashboard/deleted-records/deleted-records.component';
import { DeletedLeadsComponent } from './components/dashboard/deleted-records/deleted-leads/deleted-leads.component';
import { DeletedApplicationsComponent } from './components/dashboard/deleted-records/deleted-applications/deleted-applications.component';
import { MyApplicationsComponent } from './components/dashboard/application-management/my-applications/my-applications.component';
import { LeadManagementComponent } from './components/dashboard/lead-management/lead-management.component';
import { RestoredLeadComponent } from './components/dashboard/lead-management/restored-lead/restored-lead.component';
import { RegisteredLeadComponent } from './components/dashboard/lead-management/registered-lead/registered-lead.component';
import { AddProspectComponent } from './components/dashboard/lead-management/add-prospect/add-prospect.component';
import { AddEmployeeComponent } from './components/dashboard/add-employee/add-employee.component';
import { AddTargetComponent } from './components/target-management/add-target/add-target.component';
import { SiteApplicationsComponent } from './components/dashboard/application-management/site-applications/site-applications.component';
import { EditProgramComponent } from './components/dashboard/programs-management/edit-program/edit-program.component';
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
import { MyappsepComponent } from './components/dashboard/application-management/my-applications/myappsep/myappsep.component';
import { MyappjantwoComponent } from './components/dashboard/application-management/my-applications/myappjantwo/myappjantwo.component';
import { TotalleadsComponent } from './components/dashboard/prospect-management/all-leads/totalleads/totalleads.component';
import { AllmyleadsComponent } from './components/dashboard/prospect-management/leads/allmyleads/allmyleads.component';
import { TotalapplicationComponent } from './components/dashboard/application-management/all-applications/totalapplication/totalapplication.component';
import { AllmyappComponent } from './components/dashboard/application-management/my-applications/allmyapp/allmyapp.component';
import { JthisyearComponent } from './components/dashboard/prospect-management/all-leads/jthisyear/jthisyear.component';
import { JnthisyearComponent } from './components/dashboard/prospect-management/leads/jnthisyear/jnthisyear.component';
import { MyjyearComponent } from './components/dashboard/application-management/all-applications/myjyear/myjyear.component';
import { MejanComponent } from './components/dashboard/application-management/my-applications/mejan/mejan.component';
import { AllSchoolsComponent } from '../employee/components/dashboard/programs-management/all-schools/all-schools.component';
import { AllProgramsComponent } from '../employee/components/dashboard/programs-management/all-programs/all-programs.component';
import { EmployeeTeamComponent } from './components/dashboard/employee-team/employee-team.component';
import { EmployeeManagementComponent } from './components/dashboard/employee-management/employee-management.component';
import { DashbordprofileComponent } from './components/landing/dashbordprofile/dashbordprofile.component';
import { NotificationsComponent } from './components/dashboard/notifications/notifications.component';
import { DeletedProspectsComponent } from './components/dashboard/deleted-records/deleted-prospects/deleted-prospects.component';

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
        path: 'profile',
        component: DashbordprofileComponent,
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
                redirectTo: 'applications',
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
            path: 'lead-management',
            component: LeadManagementComponent,
            children: [
              {
                path: '',
                redirectTo: 'restored-lead',
              },
              {
                path: 'restored-lead',
                component: RestoredLeadComponent,
              },
              {
                path: 'registered-lead',
                component: RegisteredLeadComponent,
              },
              {
                path: 'add-prospect',
                component: AddProspectComponent,
              },
            ],
          },

          {
            path: 'prospect-management',
            component: ProspectManagementComponent,
            children: [
              {
                path: '',
                redirectTo: 'all-leads',
              },
              {
                path: 'leads',
                component: LeadsComponent,
                children: [
                  {
                    path: '',
                    redirectTo: 'janthisyear',
                  },
                  {
                    path: 'mytotalleads',
                    component: AllmyleadsComponent,
                  },
                  {
                    path: 'jnthisyear',
                    component: JnthisyearComponent,
                  },
                  {
                    path: 'janthisyear',
                    component: MyjanthisyearComponent,
                  },
                  {
                    path: 'septhisyear',
                    component: MysepthisyearComponent,
                  },
                  {
                    path: 'jannextyear',
                    component: MyjannextyearComponent,
                  },
                ],
              },
              {
                path: 'all-leads',
                component: AllLeadsComponent,
                children: [
                  {
                    path: '',
                    redirectTo: 'totalleads',
                  },
                  {
                    path: 'totalleads',
                    component: TotalleadsComponent,
                  },
                  {
                    path: 'jthisyear',
                    component: JthisyearComponent,
                  },
                  {
                    path: 'janthisyear',
                    component: JanthisyearComponent,
                  },
                  {
                    path: 'septhisyear',
                    component: SepthisyearComponent,
                  },
                  {
                    path: 'jannextyear',
                    component: JannextyearComponent,
                  },
                ],
              },
              {
                path: 'add-lead',
                component: AddLeadComponent,
              },
            ],
          },
          { path: 'add-employee', component: AddEmployeeComponent },
          {
            path: 'employee-manegment',
            component: EmployeeManagementComponent,
          },
          { path: 'employee-team', component: EmployeeTeamComponent },
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
                children: [
                  {
                    path: '',
                    redirectTo: 'totalapplication',
                  },
                  {
                    path: 'totalapplication',
                    component: TotalapplicationComponent,
                  },
                  {
                    path: 'appjan',
                    component: MyjyearComponent,
                  },
                  {
                    path: 'janthisyear',
                    component: AppjanthisyearComponent,
                  },
                  {
                    path: 'septhisyear',
                    component: AppsepthisyearComponent,
                  },
                  {
                    path: 'jannextyear',
                    component: AppjannextyearComponent,
                  },
                ],
              },
              {
                path: 'applications',
                component: MyApplicationsComponent,
                children: [
                  {
                    path: '',
                    redirectTo: 'janthisyear',
                  },
                  {
                    path: 'mytotalapplication',
                    component: AllmyappComponent,
                  },
                  {
                    path: 'myappj',
                    component: MejanComponent,
                  },
                  {
                    path: 'janthisyear',
                    component: MyappjanoneComponent,
                  },
                  {
                    path: 'septhisyear',
                    component: MyappsepComponent,
                  },
                  {
                    path: 'jannextyear',
                    component: MyappjantwoComponent,
                  },
                ],
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
                redirectTo: 'archived-prospects',
              },
              {
                path: 'archived-prospects',
                component: ArchivedProspectsComponent,
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
                redirectTo: 'deleted-prospects',
              },
              {
                path: 'deleted-leads',
                component: DeletedLeadsComponent,
              },
              {
                path: 'deleted-applications',
                component: DeletedApplicationsComponent,
              },
              {
                path: 'deleted-prospects',
                component: DeletedProspectsComponent,
              },
            ],
          },

          {
            path: 'programs-management',
            component: ProgramsManagementComponent,
            children: [
              {
                path: '',
                redirectTo: 'all-schools',
              },
              {
                path: 'all-schools',
                component: AllSchoolsComponent,
              },
              {
                path: 'all-programs',
                component: AllProgramsComponent,
              },
              {
                path: 'add-program',
                component: AddProgramComponent,
              },
              {
                path: 'edit-program',
                component: EditProgramComponent,
              },

              {
                path: 'add-school',
                component: AddSchoolComponent,
              },
              {
                path: 'edit-school',
                component: AddSchoolComponent,
              },
            ],
          },
        ],
      },
      {
        path:"notifications",
        component: NotificationsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
