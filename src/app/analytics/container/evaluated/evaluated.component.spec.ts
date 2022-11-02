import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedAnalyticsComponent } from './evaluated.component';

describe('EvaluatedAnalyticsComponent', () => {
  let component: EvaluatedAnalyticsComponent;
  let fixture: ComponentFixture<EvaluatedAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatedAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatedAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
