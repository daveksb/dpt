import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaoFormComponent } from './admin-sao-form.component';

describe('AdminSaoFormComponent', () => {
  let component: AdminSaoFormComponent;
  let fixture: ComponentFixture<AdminSaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSaoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
