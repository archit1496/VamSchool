import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassSubjectComponent } from './student-class-subject.component';

describe('StudentClassSubjectComponent', () => {
  let component: StudentClassSubjectComponent;
  let fixture: ComponentFixture<StudentClassSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentClassSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClassSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
