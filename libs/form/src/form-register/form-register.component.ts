import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dpt-form-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
