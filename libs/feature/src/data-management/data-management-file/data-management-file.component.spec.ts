import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementFileComponent } from './data-management-file.component';

describe('DataManagementFileComponent', () => {
  let component: DataManagementFileComponent;
  let fixture: ComponentFixture<DataManagementFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataManagementFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataManagementFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
