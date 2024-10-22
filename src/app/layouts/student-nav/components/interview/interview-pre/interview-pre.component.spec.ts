import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPreComponent } from './interview-pre.component';

describe('InterviewPreComponent', () => {
  let component: InterviewPreComponent;
  let fixture: ComponentFixture<InterviewPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewPreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
