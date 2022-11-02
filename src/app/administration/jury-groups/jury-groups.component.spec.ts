import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryGroupsComponent } from './jury-groups.component';

describe('JuryGroupsComponent', () => {
  let component: JuryGroupsComponent;
  let fixture: ComponentFixture<JuryGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuryGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuryGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
