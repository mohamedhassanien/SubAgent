import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTheDepositComponent } from './pay-the-deposit.component';

describe('PayTheDepositComponent', () => {
  let component: PayTheDepositComponent;
  let fixture: ComponentFixture<PayTheDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayTheDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTheDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
