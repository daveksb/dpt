import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementDataSetComponent } from './data-management-data-set.component';

describe('DataManagementDataSetComponent', () => {
  let component: DataManagementDataSetComponent;
  let fixture: ComponentFixture<DataManagementDataSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataManagementDataSetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataManagementDataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
