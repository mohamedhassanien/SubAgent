import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmyleadsComponent } from './allmyleads.component';

describe('AllmyleadsComponent', () => {
  let component: AllmyleadsComponent;
  let fixture: ComponentFixture<AllmyleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllmyleadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmyleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
