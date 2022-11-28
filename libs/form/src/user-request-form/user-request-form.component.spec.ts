import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataRequestFormComponent } from '../data-request-form/data-request-form.component';

describe('DataRequestFormComponent', () => {
  let component: DataRequestFormComponent;
  let fixture: ComponentFixture<DataRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataRequestFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
