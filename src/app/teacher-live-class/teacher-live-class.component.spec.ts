import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLiveClassComponent } from './teacher-live-class.component';

describe('TeacherLiveClassComponent', () => {
  let component: TeacherLiveClassComponent;
  let fixture: ComponentFixture<TeacherLiveClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherLiveClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLiveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
