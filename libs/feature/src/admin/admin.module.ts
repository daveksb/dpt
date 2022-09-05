import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@dpt/ui';
import { FormModule } from '@dpt/form';
import { AdminDataSetComponent } from './admin-data-set/admin-data-set.component';
import { AdminDepartmentComponent } from './admin-department/admin-department.component';
import { AdminLogApiComponent } from './admin-log-api/admin-log-api.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminPageSettingComponent } from './admin-page-setting/admin-page-setting.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AdminSoaComponent } from './admin-soa/admin-soa.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      { path: 'user', component: AdminUserComponent },
      { path: 'role', component: AdminRoleComponent },
      { path: 'log', component: AdminLogApiComponent },
      { path: 'data-set', component: AdminDataSetComponent },
      { path: 'department', component: AdminDepartmentComponent },
      { path: 'page-setting', component: AdminPageSettingComponent },
      { path: 'soa', component: AdminSoaComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'user',
  },
];

@NgModule({
  declarations: [
    AdminMainComponent,
    AdminUserComponent,
    AdminRoleComponent,
    AdminLogApiComponent,
    AdminDataSetComponent,
    AdminDepartmentComponent,
    AdminPageSettingComponent,
    AdminSoaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    UiModule,
    FormModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    AdminMainComponent,
    AdminUserComponent,
    AdminRoleComponent,
    AdminLogApiComponent,
    AdminDataSetComponent,
    AdminDepartmentComponent,
    AdminPageSettingComponent,
    AdminSoaComponent,
  ],
})
export class AdminModule {}
