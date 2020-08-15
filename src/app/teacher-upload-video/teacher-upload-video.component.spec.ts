import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUploadVideoComponent } from './teacher-upload-video.component';

describe('TeacherUploadVideoComponent', () => {
  let component: TeacherUploadVideoComponent;
  let fixture: ComponentFixture<TeacherUploadVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherUploadVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUploadVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
