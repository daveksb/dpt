import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataServiceRequestComponent } from './data-service-request.component';

describe('DataServiceRequestComponent', () => {
  let component: DataServiceRequestComponent;
  let fixture: ComponentFixture<DataServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataServiceRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
