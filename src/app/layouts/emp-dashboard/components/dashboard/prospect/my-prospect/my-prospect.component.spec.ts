import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProspectComponent } from './my-prospect.component';

describe('MyProspectComponent', () => {
  let component: MyProspectComponent;
  let fixture: ComponentFixture<MyProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
