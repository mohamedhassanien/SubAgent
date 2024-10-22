import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementInventoryComponent } from './appartement-inventory.component';

describe('AppartementInventoryComponent', () => {
  let component: AppartementInventoryComponent;
  let fixture: ComponentFixture<AppartementInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppartementInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppartementInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
