import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranceVisaComponent } from './france-visa.component';

describe('FranceVisaComponent', () => {
  let component: FranceVisaComponent;
  let fixture: ComponentFixture<FranceVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FranceVisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FranceVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
