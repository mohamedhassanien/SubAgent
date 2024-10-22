import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysepthisyearComponent } from './mysepthisyear.component';

describe('MysepthisyearComponent', () => {
  let component: MysepthisyearComponent;
  let fixture: ComponentFixture<MysepthisyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysepthisyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysepthisyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
