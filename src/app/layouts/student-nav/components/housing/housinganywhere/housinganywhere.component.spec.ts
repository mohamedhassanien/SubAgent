import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousinganywhereComponent } from './housinganywhere.component';

describe('HousinganywhereComponent', () => {
  let component: HousinganywhereComponent;
  let fixture: ComponentFixture<HousinganywhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousinganywhereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousinganywhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
