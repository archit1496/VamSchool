import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMarksAssignmentComponent } from './teacher-marks-assignment.component';

describe('TeacherMarksAssignmentComponent', () => {
  let component: TeacherMarksAssignmentComponent;
  let fixture: ComponentFixture<TeacherMarksAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMarksAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMarksAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
