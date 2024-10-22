import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationLetterComponent } from './motivation-letter.component';

describe('MotivationLetterComponent', () => {
  let component: MotivationLetterComponent;
  let fixture: ComponentFixture<MotivationLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivationLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivationLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
