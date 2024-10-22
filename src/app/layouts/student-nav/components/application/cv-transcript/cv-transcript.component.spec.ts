import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTranscriptComponent } from './cv-transcript.component';

describe('MotivationLetterComponent', () => {
  let component: CvTranscriptComponent;
  let fixture: ComponentFixture<CvTranscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvTranscriptComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
