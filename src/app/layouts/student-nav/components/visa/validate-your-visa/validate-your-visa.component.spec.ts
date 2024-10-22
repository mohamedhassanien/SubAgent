import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateYourVisaComponent } from './validate-your-visa.component';

describe('ValidateYourVisaComponent', () => {
  let component: ValidateYourVisaComponent;
  let fixture: ComponentFixture<ValidateYourVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateYourVisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateYourVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
