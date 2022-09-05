import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DataServiceDetailComponent,
  DataServiceListComponent,
  DataServiceRequestComponent,
  ForgotPasswordComponent,
  LandingComponent,
  LoginComponent,
  RegisterComponent,
} from '@dpt/feature';
import { PdpaComponent } from '@dpt/ui';
import { DataPublishComponent } from 'libs/feature/src/data-publish/data-publish.component';
import { DataReportComponent } from 'libs/feature/src/data-report/data-report.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pdpa', component: PdpaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'data-service-list', component: DataServiceListComponent },
  { path: 'data-service-detail', component: DataServiceDetailComponent },
  { path: 'data-service-request', component: DataServiceRequestComponent },
  {
    path: 'data-request',
    loadChildren: () =>
      import('./../../../../libs/feature/src/request/data-request-module').then(
        (a) => a.DataRequestModule
      ),
  },
  { path: 'publish', component: DataPublishComponent },
  {
    path: 'data-management',
    loadChildren: () =>
      import(
        './../../../../libs/feature/src/data-management/data-management-module'
      ).then((a) => a.DataManagementModule),
  },
  { path: 'report', component: DataReportComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./../../../../libs/feature/src/admin/admin.module').then(
        (a) => a.AdminModule
      ),
  },
  { path: '**', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
