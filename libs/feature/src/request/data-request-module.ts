import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

import { UiModule } from '@dpt/ui';
import { FormModule } from '@dpt/form';
import { DataRequestComponent } from './data-request/data-request.component';
import { DataRequestAdminComponent } from './data-request-admin/data-request-admin.component';
import { DataRequestMainComponent } from './data-request-main/data-request-main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
  {
    path: '',
    component: DataRequestMainComponent,
    children: [
      { path: 'request-list', component: DataRequestAdminComponent },
      { path: 'data-set', component: DataRequestComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'data-set',
  },
];

@NgModule({
  declarations: [
    DataRequestComponent,
    DataRequestAdminComponent,
    DataRequestMainComponent,
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
    MatSortModule,
  ],
  exports: [
    DataRequestComponent,
    DataRequestAdminComponent,
    DataRequestMainComponent,
  ],
})
export class DataRequestModule {}
