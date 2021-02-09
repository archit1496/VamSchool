import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeQuoteComponent } from './home-quote.component';

describe('HomeQuoteComponent', () => {
  let component: HomeQuoteComponent;
  let fixture: ComponentFixture<HomeQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
