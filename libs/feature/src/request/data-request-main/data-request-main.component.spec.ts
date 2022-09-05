import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRequestMainComponent } from './data-request-main.component';

describe('DataRequestMainComponent', () => {
  let component: DataRequestMainComponent;
  let fixture: ComponentFixture<DataRequestMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataRequestMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataRequestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
