import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PdpaComponent, UiModule } from '@dpt/ui';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AuthGuard,
  DataPublishComponent,
  DataReportComponent,
  DataServiceDetailComponent,
  DataServiceListComponent,
  DataServiceRequestComponent,
  FeatureModule,
  ForgotPasswordComponent,
  LandingComponent,
  LoginComponent,
  RegisterComponent,
  TokenHandleInterceptor,
} from '@dpt/feature';
import { SharedModule } from '@dpt/shared';
import { FormModule } from '@dpt/form';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'pdpa', component: PdpaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'data-service-list',
    component: DataServiceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'data-service-detail/:id',
    component: DataServiceDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'data-service-request',
    component: DataServiceRequestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'data-request',
    loadChildren: () =>
      import('./../../../../libs/feature/src/request/data-request-module').then(
        (a) => a.DataRequestModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'publish',
    component: DataPublishComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'data-management',
    loadChildren: () =>
      import(
        './../../../../libs/feature/src/data-management/data-management-module'
      ).then((a) => a.DataManagementModule),
    canActivate: [AuthGuard],
  },
  { path: 'report', component: DataReportComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    loadChildren: () =>
      import('./../../../../libs/feature/src/admin/admin.module').then(
        (a) => a.AdminModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', component: LandingComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UiModule,
    FeatureModule,
    SharedModule,
    FormModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHandleInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
