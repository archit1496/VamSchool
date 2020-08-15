import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLiveClassComponent } from './student-live-class.component';

describe('StudentLiveClassComponent', () => {
  let component: StudentLiveClassComponent;
  let fixture: ComponentFixture<StudentLiveClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLiveClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLiveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
