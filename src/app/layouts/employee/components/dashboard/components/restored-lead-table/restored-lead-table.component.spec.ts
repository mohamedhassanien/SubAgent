import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoredLeadTableComponent } from './restored-lead-table.component';

describe('ProspectTableComponent', () => {
  let component: RestoredLeadTableComponent;
  let fixture: ComponentFixture<RestoredLeadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestoredLeadTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoredLeadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
