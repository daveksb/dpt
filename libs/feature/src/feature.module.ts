import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceDetailComponent } from './data-service-detail/data-service-detail.component';
import { DataServiceListComponent } from './data-service-list/data-service-list.component';
import { DataServiceRequestComponent } from './data-service-request/data-service-request.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingComponent } from './landing/landing.component';
import { MatTabsModule } from '@angular/material/tabs';

import { RegisterComponent } from './register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { UiModule } from '@dpt/ui';
import { LoginComponent } from './login/login.component';
import { FormModule } from '@dpt/form';
import { DataPublishComponent } from './data-publish/data-publish.component';
import { DataReportComponent } from './data-report/data-report.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    DataServiceDetailComponent,
    DataServiceListComponent,
    DataServiceRequestComponent,
    ForgotPasswordComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    DataPublishComponent,
    DataReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiModule,
    FormModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
  ],
  exports: [
    DataServiceDetailComponent,
    DataServiceListComponent,
    DataServiceRequestComponent,
    ForgotPasswordComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    MatTabsModule,
    MatIconModule,
  ],
})
export class FeatureModule {}
