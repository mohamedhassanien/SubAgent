import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectComponent } from './lead-management.component';

describe('ProspectComponent', () => {
  let component: ProspectComponent;
  let fixture: ComponentFixture<ProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
