import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from '@dpt/form';
import { TopNavComponent } from '@dpt/ui';

@Component({
  selector: 'dpt-login',
  standalone: true,
  imports: [CommonModule, FormLoginComponent, TopNavComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
