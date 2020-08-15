import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHomeWorkComponent } from './teacher-home-work.component';

describe('TeacherHomeWorkComponent', () => {
  let component: TeacherHomeWorkComponent;
  let fixture: ComponentFixture<TeacherHomeWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherHomeWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherHomeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
