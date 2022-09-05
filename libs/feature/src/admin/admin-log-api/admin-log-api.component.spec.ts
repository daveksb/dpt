import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLogApiComponent } from './admin-log-api.component';

describe('AdminLogApiComponent', () => {
  let component: AdminLogApiComponent;
  let fixture: ComponentFixture<AdminLogApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLogApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLogApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
