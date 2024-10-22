import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedProgramPopupComponent } from './suggested-program-popup.component';

describe('SuggestedProgramPopupComponent', () => {
  let component: SuggestedProgramPopupComponent;
  let fixture: ComponentFixture<SuggestedProgramPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedProgramPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedProgramPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
