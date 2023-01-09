import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDataSetFormComponent } from './admin-data-set-form.component';

describe('AdminDataSetFormComponent', () => {
  let component: AdminDataSetFormComponent;
  let fixture: ComponentFixture<AdminDataSetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDataSetFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDataSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
