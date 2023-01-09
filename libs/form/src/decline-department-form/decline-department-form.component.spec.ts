import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeclineDepartmentFormComponent } from './decline-department-form.component';

describe('DeclineDepartmentFormComponent', () => {
  let component: DeclineDepartmentFormComponent;
  let fixture: ComponentFixture<DeclineDepartmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeclineDepartmentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeclineDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
