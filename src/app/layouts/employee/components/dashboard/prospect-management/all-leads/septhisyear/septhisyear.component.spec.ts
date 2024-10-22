import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepthisyearComponent } from './septhisyear.component';

describe('SepthisyearComponent', () => {
  let component: SepthisyearComponent;
  let fixture: ComponentFixture<SepthisyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepthisyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SepthisyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
