import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from '@dpt/form';

@Component({
  selector: 'dpt-register',
  standalone: true,
  imports: [CommonModule, FormRegisterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
