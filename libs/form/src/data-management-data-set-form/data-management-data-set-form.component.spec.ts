import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementDataSetFormComponent } from './data-management-data-set-form.component';

describe('DataManagementDataSetFormComponent', () => {
  let component: DataManagementDataSetFormComponent;
  let fixture: ComponentFixture<DataManagementDataSetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataManagementDataSetFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataManagementDataSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
