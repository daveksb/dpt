import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileListFormComponent } from './file-list-form.component';

describe('FileListFormComponent', () => {
  let component: FileListFormComponent;
  let fixture: ComponentFixture<FileListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileListFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
