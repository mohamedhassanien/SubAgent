import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappjantwoComponent } from './myappjantwo.component';

describe('MyappjantwoComponent', () => {
  let component: MyappjantwoComponent;
  let fixture: ComponentFixture<MyappjantwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyappjantwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyappjantwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
