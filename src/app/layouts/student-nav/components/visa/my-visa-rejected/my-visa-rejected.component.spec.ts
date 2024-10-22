import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVisaRejectedComponent } from './my-visa-rejected.component';

describe('MyVisaRejectedComponent', () => {
  let component: MyVisaRejectedComponent;
  let fixture: ComponentFixture<MyVisaRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVisaRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVisaRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
