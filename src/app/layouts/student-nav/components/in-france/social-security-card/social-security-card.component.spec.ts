import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSecurityCardComponent } from './social-security-card.component';

describe('SocialSecurityCardComponent', () => {
  let component: SocialSecurityCardComponent;
  let fixture: ComponentFixture<SocialSecurityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialSecurityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSecurityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
