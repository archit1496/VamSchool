import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVideosComponent } from './student-videos.component';

describe('StudentVideosComponent', () => {
  let component: StudentVideosComponent;
  let fixture: ComponentFixture<StudentVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
