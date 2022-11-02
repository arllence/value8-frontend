import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingLinkComponent } from './meeting-link.component';

describe('MeetingLinkComponent', () => {
  let component: MeetingLinkComponent;
  let fixture: ComponentFixture<MeetingLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
