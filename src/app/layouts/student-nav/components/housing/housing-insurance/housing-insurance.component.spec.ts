import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingInsuranceComponent } from './housing-insurance.component';

describe('HousingInsuranceComponent', () => {
  let component: HousingInsuranceComponent;
  let fixture: ComponentFixture<HousingInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
