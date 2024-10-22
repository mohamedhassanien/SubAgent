import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusFranceComponent } from './campus-france.component';

describe('CampusFranceComponent', () => {
  let component: CampusFranceComponent;
  let fixture: ComponentFixture<CampusFranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusFranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusFranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
