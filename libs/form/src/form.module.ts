import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormForgotPasswordComponent } from './form-forgot-password/form-forgot-password.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataServiceRequestFormComponent } from './data-service-request-form/data-service-request-form.component';
import { DataRequestFormComponent } from './data-request-form/data-request-form.component';
import { DataPublishFormComponent } from './data-publish-form/data-publish-form.component';
import { DataManagementFileFormComponent } from './data-management-file-form/data-management-file-form.component';
import { DataManagementDataSetFormComponent } from './data-management-data-set-form/data-management-data-set-form.component';

@NgModule({
  declarations: [
    FormForgotPasswordComponent,
    FormLoginComponent,
    FormRegisterComponent,
    DataServiceRequestFormComponent,
    DataRequestFormComponent,
    DataPublishFormComponent,
    DataManagementFileFormComponent,
    DataManagementDataSetFormComponent,
  ],

  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    FormForgotPasswordComponent,
    FormLoginComponent,
    FormRegisterComponent,
    DataServiceRequestFormComponent,
  ],
})
export class FormModule {}
