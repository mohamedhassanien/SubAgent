import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectGridViewComponent } from './prospect-grid-view.component';

describe('ProspectGridViewComponent', () => {
  let component: ProspectGridViewComponent;
  let fixture: ComponentFixture<ProspectGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectGridViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
