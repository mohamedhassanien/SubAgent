import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredLeadTableComponent } from './registered-lead-table.component';

describe('ProspectTableComponent', () => {
  let component: RegisteredLeadTableComponent;
  let fixture: ComponentFixture<RegisteredLeadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteredLeadTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredLeadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
