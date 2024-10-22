import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccordionOneComponent } from './occordion-one.component';

describe('OccordionOneComponent', () => {
  let component: OccordionOneComponent;
  let fixture: ComponentFixture<OccordionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccordionOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccordionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
