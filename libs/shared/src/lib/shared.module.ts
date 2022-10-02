import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainApiService } from './main-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FileButtonComponent } from './file-button/file-button.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  exports: [MatDialogModule, FileButtonComponent],
  providers: [MainApiService],
  declarations: [FileButtonComponent],
})
export class SharedModule {}
