import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDemoComponent } from './file-upload-demo.component';

describe('FileUploadDemoComponent', () => {
  let component: FileUploadDemoComponent;
  let fixture: ComponentFixture<FileUploadDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
