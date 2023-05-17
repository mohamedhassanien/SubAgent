import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteApplicationsComponent } from './site-applications.component';

describe('SiteApplicationsComponent', () => {
  let component: SiteApplicationsComponent;
  let fixture: ComponentFixture<SiteApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
