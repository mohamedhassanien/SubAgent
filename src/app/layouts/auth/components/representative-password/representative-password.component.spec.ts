import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativePasswordComponent } from './representative-password.component';

describe('RepresentativePasswordComponent', () => {
  let component: RepresentativePasswordComponent;
  let fixture: ComponentFixture<RepresentativePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
