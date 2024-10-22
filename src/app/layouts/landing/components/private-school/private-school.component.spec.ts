import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSchoolComponent } from './private-school.component';

describe('PrivateSchoolComponent', () => {
  let component: PrivateSchoolComponent;
  let fixture: ComponentFixture<PrivateSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
