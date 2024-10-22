import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccordionFourComponent } from './occordion-four.component';

describe('OccordionFourComponent', () => {
  let component: OccordionFourComponent;
  let fixture: ComponentFixture<OccordionFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccordionFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccordionFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
