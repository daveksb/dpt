import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DataServiceDialogComponent } from './data-service-dialog/data-service-dialog.component';
import { PdpaComponent } from './pdpa/pdpa.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DataServiceDialogComponent,
    PdpaComponent,
    SideNavComponent,
    TopNavComponent,
  ],
  imports: [CommonModule, MatDialogModule, RouterModule],
  exports: [
    PdpaComponent,
    SideNavComponent,
    DataServiceDialogComponent,
    TopNavComponent,
  ],
})
export class UiModule {}