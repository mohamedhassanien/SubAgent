import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedRecordsComponent } from './archived-records.component';

describe('ArchivedRecordsComponent', () => {
  let component: ArchivedRecordsComponent;
  let fixture: ComponentFixture<ArchivedRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
