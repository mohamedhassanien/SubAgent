import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanthisyearComponent } from './janthisyear.component';

describe('JanthisyearComponent', () => {
  let component: JanthisyearComponent;
  let fixture: ComponentFixture<JanthisyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JanthisyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JanthisyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
