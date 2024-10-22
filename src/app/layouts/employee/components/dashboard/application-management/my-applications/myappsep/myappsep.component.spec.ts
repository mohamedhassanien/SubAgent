import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappsepComponent } from './myappsep.component';

describe('MyappsepComponent', () => {
  let component: MyappsepComponent;
  let fixture: ComponentFixture<MyappsepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyappsepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyappsepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
