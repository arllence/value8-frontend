import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveApplicationsComponent } from './retrieve-applications.component';

describe('RetrieveApplicationsComponent', () => {
  let component: RetrieveApplicationsComponent;
  let fixture: ComponentFixture<RetrieveApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrieveApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
