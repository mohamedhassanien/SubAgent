import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppjanthisyearComponent } from './appjanthisyear.component';

describe('AppjanthisyearComponent', () => {
  let component: AppjanthisyearComponent;
  let fixture: ComponentFixture<AppjanthisyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppjanthisyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppjanthisyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
