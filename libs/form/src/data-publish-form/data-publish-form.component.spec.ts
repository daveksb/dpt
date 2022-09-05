import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPublishFormComponent } from './data-publish-form.component';

describe('DataPublishFormComponent', () => {
  let component: DataPublishFormComponent;
  let fixture: ComponentFixture<DataPublishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataPublishFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataPublishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
