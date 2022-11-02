import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationReportsComponent } from './evaluation-report.component';

describe('EvaluationReportsComponent', () => {
  let component: EvaluationReportsComponent;
  let fixture: ComponentFixture<EvaluationReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
