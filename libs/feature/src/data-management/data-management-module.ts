import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { UiModule } from '@dpt/ui';
import { FormModule } from '@dpt/form';
import { DataManagementDataSetComponent } from './data-management-data-set/data-management-data-set.component';
import { DataManagementFileComponent } from './data-management-file/data-management-file.component';
import { DataManagementMainComponent } from './data-management-main/data-management-main.component';

const routes: Routes = [
  {
    path: '',
    component: DataManagementMainComponent,
    children: [
      { path: 'file', component: DataManagementFileComponent },
      { path: 'data-set', component: DataManagementDataSetComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'data-set',
  },
];

@NgModule({
  declarations: [
    DataManagementDataSetComponent,
    DataManagementFileComponent,
    DataManagementMainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    UiModule,
    FormModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
  exports: [
    DataManagementDataSetComponent,
    DataManagementFileComponent,
    DataManagementMainComponent,
  ],
})
export class DataManagementModule {}
