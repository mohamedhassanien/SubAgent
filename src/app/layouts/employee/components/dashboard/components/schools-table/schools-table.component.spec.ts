import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsTableComponent } from './schools-table.component';

describe('SchoolsTableComponent', () => {
  let component: SchoolsTableComponent;
  let fixture: ComponentFixture<SchoolsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
