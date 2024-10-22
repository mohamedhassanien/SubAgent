import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsepthisyearComponent } from './appsepthisyear.component';

describe('AppsepthisyearComponent', () => {
  let component: AppsepthisyearComponent;
  let fixture: ComponentFixture<AppsepthisyearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsepthisyearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsepthisyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
