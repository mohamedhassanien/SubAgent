import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingCertificateComponent } from './housing-certificate.component';

describe('HousingCertificateComponent', () => {
  let component: HousingCertificateComponent;
  let fixture: ComponentFixture<HousingCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
