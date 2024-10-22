import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrousComponent } from './crous.component';

describe('CrousComponent', () => {
  let component: CrousComponent;
  let fixture: ComponentFixture<CrousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
