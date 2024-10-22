import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraInsuranceComponent } from './extra-insurance.component';

describe('ExtraInsuranceComponent', () => {
  let component: ExtraInsuranceComponent;
  let fixture: ComponentFixture<ExtraInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
