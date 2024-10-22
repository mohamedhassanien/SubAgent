import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppjannextyearComponent } from './appjannextyear.component';

describe('AppjannextyearComponent', () => {
  let component: AppjannextyearComponent;
  let fixture: ComponentFixture<AppjannextyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppjannextyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppjannextyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
