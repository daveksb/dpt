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
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

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
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
  ],
  exports: [
    DataManagementDataSetComponent,
    DataManagementFileComponent,
    DataManagementMainComponent,
  ],
})
export class DataManagementModule {}
