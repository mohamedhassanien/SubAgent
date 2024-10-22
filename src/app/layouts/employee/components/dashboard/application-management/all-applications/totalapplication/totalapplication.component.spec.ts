import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalapplicationComponent } from './totalapplication.component';

describe('TotalapplicationComponent', () => {
  let component: TotalapplicationComponent;
  let fixture: ComponentFixture<TotalapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalapplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
