import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JnthisyearComponent } from './jnthisyear.component';

describe('JnthisyearComponent', () => {
  let component: JnthisyearComponent;
  let fixture: ComponentFixture<JnthisyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JnthisyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JnthisyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
