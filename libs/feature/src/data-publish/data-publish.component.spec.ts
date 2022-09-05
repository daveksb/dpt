import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPublishComponent } from './data-publish.component';

describe('DataPublishComponent', () => {
  let component: DataPublishComponent;
  let fixture: ComponentFixture<DataPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataPublishComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
