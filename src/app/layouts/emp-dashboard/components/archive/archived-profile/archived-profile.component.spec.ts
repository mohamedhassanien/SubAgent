import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedProfileComponent } from './archived-profile.component';

describe('ArchivedProfileComponent', () => {
  let component: ArchivedProfileComponent;
  let fixture: ComponentFixture<ArchivedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
