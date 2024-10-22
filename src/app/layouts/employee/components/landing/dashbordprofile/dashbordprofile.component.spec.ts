import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordprofileComponent } from './dashbordprofile.component';

describe('DashbordprofileComponent', () => {
  let component: DashbordprofileComponent;
  let fixture: ComponentFixture<DashbordprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
