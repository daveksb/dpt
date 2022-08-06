import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dpt-form-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
