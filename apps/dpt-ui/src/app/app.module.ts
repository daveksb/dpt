import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
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
  ArticleAllComponent,
  ArticleComponent,
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
  RoleGuard,
  ArticleRoleGuard,
  TokenHandleInterceptor,
  AddArticleRoleGuard,
} from '@dpt/feature';
import { SharedModule } from '@dpt/shared';
import { EditUserComponent, FormModule } from '@dpt/form';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from 'libs/form/src/article-form/article-form.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ArticleDetailComponent } from 'libs/feature/src/article-detail/article-detail.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
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
    canActivate: [AuthGuard, RoleGuard],
    data: {
      permission: ['accReq'],
    },
  },
  {
    path: 'data-request',
    loadChildren: () =>
      import('./../../../../libs/feature/src/request/data-request-module').then(
        (a) => a.DataRequestModule
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      permission: ['accApproveService'],
    },
  },
  {
    path: 'publish',
    component: DataPublishComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      permission: ['accApproveApi'],
    },
  },
  {
    path: 'data-management',
    loadChildren: () =>
      import(
        './../../../../libs/feature/src/data-management/data-management-module'
      ).then((a) => a.DataManagementModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      permission: ['accAdd', 'accEdit'],
    },
  },
  { path: 'report', component: DataReportComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    loadChildren: () =>
      import('./../../../../libs/feature/src/admin/admin.module').then(
        (a) => a.AdminModule
      ),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      permission: ['accSetApi', 'accSetAccess', 'accManageUser'],
    },
  },
  { path: 'user', component: EditUserComponent, canActivate: [AuthGuard] },
  {
    path: 'article',
    children: [
      {
        path: 'list',
        component: ArticleComponent,
        canActivate: [AuthGuard, ArticleRoleGuard],
      },
      {
        path: 'all',
        component: ArticleAllComponent,
      },
      {
        path: 'edit/:tid',
        component: ArticleFormComponent,
        canActivate: [AuthGuard, AddArticleRoleGuard],
      },
      {
        path: 'add',
        component: ArticleFormComponent,
        canActivate: [AuthGuard, AddArticleRoleGuard],
      },
      {
        path: ':id',
        component: ArticleDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'all',
      },
    ],
    canActivate: [AuthGuard],
  },

  { path: '**', component: LandingComponent },
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
    MatNativeDateModule,
    NgxChartsModule,
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
  exports: [ArticleDetailComponent],
})
export class AppModule {}
