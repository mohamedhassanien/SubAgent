import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigsComponent } from './figs.component';

describe('FigsComponent', () => {
  let component: FigsComponent;
  let fixture: ComponentFixture<FigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
