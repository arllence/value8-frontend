import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmailComponent } from './common-email.component';

describe('CommonEmailComponent', () => {
  let component: CommonEmailComponent;
  let fixture: ComponentFixture<CommonEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
