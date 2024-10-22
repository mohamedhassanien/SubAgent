import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InFranceComponent } from './in-france.component';

describe('InFranceComponent', () => {
  let component: InFranceComponent;
  let fixture: ComponentFixture<InFranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InFranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InFranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
