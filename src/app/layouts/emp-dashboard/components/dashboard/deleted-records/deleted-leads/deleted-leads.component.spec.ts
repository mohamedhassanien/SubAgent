import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedLeadsComponent } from './deleted-leads.component';

describe('DeletedLeadsComponent', () => {
  let component: DeletedLeadsComponent;
  let fixture: ComponentFixture<DeletedLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
