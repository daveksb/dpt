import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDepartmentFormComponent } from './admin-department-form.component';

describe('AdminDepartmentFormComponent', () => {
  let component: AdminDepartmentFormComponent;
  let fixture: ComponentFixture<AdminDepartmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDepartmentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
