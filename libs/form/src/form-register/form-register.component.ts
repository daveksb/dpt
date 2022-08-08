import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dpt-form-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent {
  constructor() {}

  status = 1;

  radioButtonChanged($event: any) {
    const value = $event.target.value;
    if (value === 1) {
      this.status === 1;
    } else if (value === 2) {
      this.status === 2;
    }
  }
}
