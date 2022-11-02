import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewersReportsComponent } from './reviewers-report.component';

describe('ReviewersReportsComponent', () => {
  let component: ReviewersReportsComponent;
  let fixture: ComponentFixture<ReviewersReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewersReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewersReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
