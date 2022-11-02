import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveMailsComponent } from './retrieve-emails.component';

describe('RetrieveMailsComponent', () => {
  let component: RetrieveMailsComponent;
  let fixture: ComponentFixture<RetrieveMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrieveMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
