import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRequestAdminComponent } from './data-request-admin.component';

describe('DataRequestAdminComponent', () => {
  let component: DataRequestAdminComponent;
  let fixture: ComponentFixture<DataRequestAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataRequestAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataRequestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
