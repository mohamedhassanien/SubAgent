import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimCardInternetComponent } from './sim-card-internet.component';

describe('SimCardInternetComponent', () => {
  let component: SimCardInternetComponent;
  let fixture: ComponentFixture<SimCardInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimCardInternetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimCardInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
