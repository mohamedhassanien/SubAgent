import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalleadsComponent } from './totalleads.component';

describe('TotalleadsComponent', () => {
  let component: TotalleadsComponent;
  let fixture: ComponentFixture<TotalleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalleadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
