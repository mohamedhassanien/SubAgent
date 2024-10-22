import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JannextyearComponent } from './jannextyear.component';

describe('JannextyearComponent', () => {
  let component: JannextyearComponent;
  let fixture: ComponentFixture<JannextyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JannextyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JannextyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
