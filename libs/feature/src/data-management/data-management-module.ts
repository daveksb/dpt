import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { UiModule } from '@dpt/ui';
import { FileHistoryComponent, FormModule } from '@dpt/form';
import { DataManagementMainComponent } from './data-management-main/data-management-main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenHandleInterceptor } from '../interceptor/api-interceptor';

const routes: Routes = [
  {
    path: '',
    component: DataManagementMainComponent,
  },
  {
    path: ':id',
    component: FileHistoryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [DataManagementMainComponent],
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
    MatIconModule,
  ],
  exports: [DataManagementMainComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHandleInterceptor,
      multi: true,
    },
  ],
})
export class DataManagementModule {}
