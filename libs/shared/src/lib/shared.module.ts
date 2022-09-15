import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDialogComponent } from './default-dialog/default-dialog.component';
import { MainApiService } from './main-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  imports: [CommonModule, HttpClientModule, MatButtonModule],
  providers: [MainApiService],
  declarations: [DefaultDialogComponent],
})
export class SharedModule {}
