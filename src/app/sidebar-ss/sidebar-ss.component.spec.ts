import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSsComponent } from './sidebar-ss.component';

describe('SidebarSsComponent', () => {
  let component: SidebarSsComponent;
  let fixture: ComponentFixture<SidebarSsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
