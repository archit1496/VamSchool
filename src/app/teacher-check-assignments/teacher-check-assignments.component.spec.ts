import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCheckAssignmentsComponent } from './teacher-check-assignments.component';

describe('TeacherCheckAssignmentsComponent', () => {
  let component: TeacherCheckAssignmentsComponent;
  let fixture: ComponentFixture<TeacherCheckAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCheckAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCheckAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
