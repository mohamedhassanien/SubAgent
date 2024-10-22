import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymMembershipComponent } from './gym-membership.component';

describe('GymMembershipComponent', () => {
  let component: GymMembershipComponent;
  let fixture: ComponentFixture<GymMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
