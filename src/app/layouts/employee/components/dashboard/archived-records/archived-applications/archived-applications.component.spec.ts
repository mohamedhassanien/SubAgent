import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedApplicationsComponent } from './archived-applications.component';

describe('ArchivedApplicationsComponent', () => {
  let component: ArchivedApplicationsComponent;
  let fixture: ComponentFixture<ArchivedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
