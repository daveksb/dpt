import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDataSetComponent } from './admin-data-set.component';

describe('AdminDataSetComponent', () => {
  let component: AdminDataSetComponent;
  let fixture: ComponentFixture<AdminDataSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDataSetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
