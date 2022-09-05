import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementMainComponent } from './data-management-main.component';

describe('DataManagementMainComponent', () => {
  let component: DataManagementMainComponent;
  let fixture: ComponentFixture<DataManagementMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataManagementMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
