import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyjanthisyearComponent } from './myjanthisyear.component';

describe('MyjanthisyearComponent', () => {
  let component: MyjanthisyearComponent;
  let fixture: ComponentFixture<MyjanthisyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyjanthisyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyjanthisyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
