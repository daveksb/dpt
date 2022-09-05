import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataServiceRequestFormComponent } from './data-service-request-form.component';

describe('DataServiceRequestFormComponent', () => {
  let component: DataServiceRequestFormComponent;
  let fixture: ComponentFixture<DataServiceRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataServiceRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataServiceRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
