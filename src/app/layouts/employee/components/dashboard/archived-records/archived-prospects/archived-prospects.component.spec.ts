import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedLeadsComponent } from './archived-prospects.component';

describe('ArchivedLeadsComponent', () => {
  let component: ArchivedLeadsComponent;
  let fixture: ComponentFixture<ArchivedLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivedLeadsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
