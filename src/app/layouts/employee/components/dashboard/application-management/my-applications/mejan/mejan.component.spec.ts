import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MejanComponent } from './mejan.component';

describe('MejanComponent', () => {
  let component: MejanComponent;
  let fixture: ComponentFixture<MejanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MejanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MejanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
