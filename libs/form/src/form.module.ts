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
import { FileListFormComponent } from './file-list-form/file-list-form.component';
import { ApproveDepartmentFormComponent } from './approve-department-form/approve-department-form.component';
import { UserRequestFormComponent } from './user-request-form/user-request-form.component';
import { DataServiceDialogComponent } from './data-service-dialog/data-service-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { DeclineDepartmentFormComponent } from './decline-department-form/decline-department-form.component';
import { AdminDataSetFormComponent } from './admin-data-set-form/admin-data-set-form.component';
import { QuillModule } from 'ngx-quill';
import { EditUserComponent } from './edit-user/edit-user.component';

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
    FileListFormComponent,
    ApproveDepartmentFormComponent,
    UserRequestFormComponent,
    DataServiceDialogComponent,
    DeclineDepartmentFormComponent,
    AdminDataSetFormComponent,
    EditUserComponent,
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
    MatDatepickerModule,
    MatCheckboxModule,
    SharedModule,
    UiModule,
    MatSelectModule,
    MatNativeDateModule,
    MatRippleModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction
          [{ size: ['small', 'medium', 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],
          ['image'], // add's image support
          ['clean'], // remove formatting button
        ],
      },
    }),
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
    DataServiceDialogComponent,
    AdminSaoFormComponent,
    FileListFormComponent,
    DeclineDepartmentFormComponent,
    EditUserComponent,
    AdminDataSetFormComponent,
  ],
  providers: [MatDatepickerModule],
})
export class FormModule {}
