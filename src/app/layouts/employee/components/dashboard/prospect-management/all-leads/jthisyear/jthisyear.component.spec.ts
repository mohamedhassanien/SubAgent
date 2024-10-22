import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JthisyearComponent } from './jthisyear.component';

describe('JthisyearComponent', () => {
  let component: JthisyearComponent;
  let fixture: ComponentFixture<JthisyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JthisyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JthisyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
