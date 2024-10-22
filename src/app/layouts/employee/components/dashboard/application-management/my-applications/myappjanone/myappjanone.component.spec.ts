import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyappjanoneComponent } from './myappjanone.component';

describe('MyappjanoneComponent', () => {
  let component: MyappjanoneComponent;
  let fixture: ComponentFixture<MyappjanoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyappjanoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyappjanoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
