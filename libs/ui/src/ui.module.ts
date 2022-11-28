import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PdpaComponent } from './pdpa/pdpa.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PdpaComponent, SideNavComponent, TopNavComponent],
  imports: [CommonModule, MatDialogModule, RouterModule, MatButtonModule],
  exports: [PdpaComponent, SideNavComponent, TopNavComponent],
})
export class UiModule {}
