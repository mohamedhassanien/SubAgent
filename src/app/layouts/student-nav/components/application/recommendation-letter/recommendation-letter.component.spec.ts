import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationLetterComponent } from './recommendation-letter.component';

describe('RecommendationLetterComponent', () => {
  let component: RecommendationLetterComponent;
  let fixture: ComponentFixture<RecommendationLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
