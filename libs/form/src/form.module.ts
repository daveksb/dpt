import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormForgotPasswordComponent } from './form-forgot-password/form-forgot-password.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataServiceRequestFormComponent } from './data-service-request-form/data-service-request-form.component';
import { DataRequestFormComponent } from './data-request-form/data-request-form.component';
import { DataPublishFormComponent } from './data-publish-form/data-publish-form.component';
import { DataManagementFileFormComponent } from './data-management-file-form/data-management-file-form.component';
import { DataManagementDataSetFormComponent } from './data-management-data-set-form/data-management-data-set-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@dpt/shared';
import { DefaultDialogComponent } from './default-dialog/default-dialog.component';
import { UiModule } from '@dpt/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminDepartmentFormComponent } from './admin-department-form/admin-department-form.component';
import { AdminSaoFormComponent } from './admin-sao-form/admin-sao-form.component';

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
    DefaultDialogComponent,
    AdminDepartmentFormComponent,
    AdminSaoFormComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatIconModule,
    SharedModule,
    UiModule,
  ],
  exports: [
    FormForgotPasswordComponent,
    FormLoginComponent,
    FormRegisterComponent,
    DataServiceRequestFormComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    SharedModule,
    DefaultDialogComponent,
    AdminSaoFormComponent,
  ],
})
export class FormModule {}
