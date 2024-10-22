import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProspectComponent } from './restored-lead.component';

describe('AllProspectComponent', () => {
  let component: AllProspectComponent;
  let fixture: ComponentFixture<AllProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProspectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
