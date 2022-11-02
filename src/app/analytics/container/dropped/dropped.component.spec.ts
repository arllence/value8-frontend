import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppedAnalyticsComponent } from './dropped.component';

describe('DroppedAnalyticsComponent', () => {
  let component: DroppedAnalyticsComponent;
  let fixture: ComponentFixture<DroppedAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroppedAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroppedAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
