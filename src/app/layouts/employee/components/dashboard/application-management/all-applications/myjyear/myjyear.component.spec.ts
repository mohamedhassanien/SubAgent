import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyjyearComponent } from './myjyear.component';

describe('MyjyearComponent', () => {
  let component: MyjyearComponent;
  let fixture: ComponentFixture<MyjyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyjyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyjyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
