import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTestComponent } from './language-test.component';

describe('LanguageTestComponent', () => {
  let component: LanguageTestComponent;
  let fixture: ComponentFixture<LanguageTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
