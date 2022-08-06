import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from '@dpt/form';

@Component({
  selector: 'dpt-login',
  standalone: true,
  imports: [CommonModule, FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
