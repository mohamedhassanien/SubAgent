import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyjannextyearComponent } from './myjannextyear.component';

describe('MyjannextyearComponent', () => {
  let component: MyjannextyearComponent;
  let fixture: ComponentFixture<MyjannextyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyjannextyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyjannextyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
