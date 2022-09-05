import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSoaComponent } from './admin-soa.component';

describe('AdminSoaComponent', () => {
  let component: AdminSoaComponent;
  let fixture: ComponentFixture<AdminSoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSoaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
