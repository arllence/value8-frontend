import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProfileViewComponent } from './common-profile-view.component';

describe('CommonProfileComponent', () => {
  let component: CommonProfileViewComponent;
  let fixture: ComponentFixture<CommonProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
