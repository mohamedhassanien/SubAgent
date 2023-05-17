import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAgentApplicationComponent } from './sub-agent-application.component';

describe('SubAgentApplicationComponent', () => {
  let component: SubAgentApplicationComponent;
  let fixture: ComponentFixture<SubAgentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAgentApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAgentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
