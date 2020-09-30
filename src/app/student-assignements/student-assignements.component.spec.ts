import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignementsComponent } from './student-assignements.component';

describe('StudentAssignementsComponent', () => {
  let component: StudentAssignementsComponent;
  let fixture: ComponentFixture<StudentAssignementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
