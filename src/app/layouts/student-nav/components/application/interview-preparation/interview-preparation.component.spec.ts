import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPreparationComponent } from './interview-preparation.component';

describe('InterviewPreparationComponent', () => {
  let component: InterviewPreparationComponent;
  let fixture: ComponentFixture<InterviewPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewPreparationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
