import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAssignmentComponent } from './add-new-assignment.component';

describe('AddNewAssignmentComponent', () => {
  let component: AddNewAssignmentComponent;
  let fixture: ComponentFixture<AddNewAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
