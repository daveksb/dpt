import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dpt-form-forgot-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-forgot-password.component.html',
  styleUrls: ['./form-forgot-password.component.scss'],
})
export class FormForgotPasswordComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
