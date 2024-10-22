import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedProspectsComponent } from './deleted-prospects.component';

describe('DeletedProspectsComponent', () => {
  let component: DeletedProspectsComponent;
  let fixture: ComponentFixture<DeletedProspectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedProspectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
