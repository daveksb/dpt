import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceDetailComponent } from './data-service-detail/data-service-detail.component';
import { DataServiceListComponent } from './data-service-list/data-service-list.component';
import { DataServiceRequestComponent } from './data-service-request/data-service-request.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { UiModule } from '@dpt/ui';
import { LoginComponent } from './login/login.component';
import { FormModule } from '@dpt/form';

@NgModule({
  declarations: [
    DataServiceDetailComponent,
    DataServiceListComponent,
    DataServiceRequestComponent,
    ForgotPasswordComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [CommonModule, RouterModule, MatDialogModule, UiModule, FormModule],
  exports: [
    DataServiceDetailComponent,
    DataServiceListComponent,
    DataServiceRequestComponent,
    ForgotPasswordComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
  ],
})
export class FeatureModule {}
