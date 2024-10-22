import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayCVECComponent } from './pay-cvec.component';


describe('PayCVECComponent', () => {
  let component: PayCVECComponent;
  let fixture: ComponentFixture<PayCVECComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCVECComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCVECComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
