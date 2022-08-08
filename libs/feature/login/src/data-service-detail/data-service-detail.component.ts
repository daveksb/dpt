import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceDialogComponent, TopNavComponent } from '@dpt/ui';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ThemeService } from '@dpt/shared';

@Component({
  selector: 'dpt-data-service-detail',
  standalone: true,
  imports: [CommonModule, TopNavComponent, RouterModule],
  templateUrl: './data-service-detail.component.html',
  styleUrls: ['./data-service-detail.component.scss'],
})
export class DataServiceDetailComponent implements OnInit{
  customStyle = '';

  constructor(public dialog: MatDialog, private themeService: ThemeService) {}

  selectTheme(evt: any) {
    this.themeService.setTheme(evt.target.value);
  }

  ngOnInit(): void {
    this.themeService.selectedTheme$.subscribe((res) => {
      this.customStyle = `background-color: var(--main-bg-${res})`;
    });
  }

  openDialog() {
    this.dialog.open(DataServiceDialogComponent, {
      height: '250px',
      width: '350px',
    });
  }
}
