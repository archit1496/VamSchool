import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomeDashboardComponent } from './student-home-dashboard.component';

describe('StudentHomeDashboardComponent', () => {
  let component: StudentHomeDashboardComponent;
  let fixture: ComponentFixture<StudentHomeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHomeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
