import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dpt-file-button',
  templateUrl: './file-button.component.html',
  styleUrls: ['./file-button.component.scss'],
})
export class FileButtonComponent implements OnInit {
  @Input() formatType = '';
  constructor() {}

  ngOnInit(): void {}
}
