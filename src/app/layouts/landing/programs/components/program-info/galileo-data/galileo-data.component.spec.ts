import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalileoDataComponent } from './galileo-data.component';

describe('GalileoDataComponent', () => {
  let component: GalileoDataComponent;
  let fixture: ComponentFixture<GalileoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalileoDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalileoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
