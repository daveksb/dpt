import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Routes, RouterModule } from '@angular/router';
import {
  DataPublishComponent,
  DataReportComponent,
  DataServiceDetailComponent,
  DataServiceListComponent,
  DataServiceRequestComponent,
  ForgotPasswordComponent,
  LandingComponent,
  LoginComponent,
  RegisterComponent,
} from '@dpt/feature';
import { PdpaComponent, UiModule } from '@dpt/ui';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pdpa', component: PdpaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'data-service-list', component: DataServiceListComponent },
  { path: 'data-service-detail/:id', component: DataServiceDetailComponent },
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
  imports: [
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatDialogModule,
    UiModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
