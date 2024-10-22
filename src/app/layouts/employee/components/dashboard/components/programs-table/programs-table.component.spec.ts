import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsTableComponent } from './programs-table.component';

describe('SchoolsTableComponent', () => {
  let component: ProgramsTableComponent;
  let fixture: ComponentFixture<ProgramsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
