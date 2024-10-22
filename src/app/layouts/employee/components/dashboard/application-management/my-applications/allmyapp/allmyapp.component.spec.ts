import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmyappComponent } from './allmyapp.component';

describe('AllmyappComponent', () => {
  let component: AllmyappComponent;
  let fixture: ComponentFixture<AllmyappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllmyappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmyappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
