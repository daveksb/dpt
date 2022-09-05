import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementFileFormComponent } from './data-management-file-form.component';

describe('DataManagementFileFormComponent', () => {
  let component: DataManagementFileFormComponent;
  let fixture: ComponentFixture<DataManagementFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataManagementFileFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataManagementFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
