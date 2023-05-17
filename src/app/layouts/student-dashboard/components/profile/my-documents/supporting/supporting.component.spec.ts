import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportingComponent } from './supporting.component';

describe('SupportingComponent', () => {
  let component: SupportingComponent;
  let fixture: ComponentFixture<SupportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
