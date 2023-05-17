import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedAppsComponent } from './archived-apps.component';

describe('ArchivedAppsComponent', () => {
  let component: ArchivedAppsComponent;
  let fixture: ComponentFixture<ArchivedAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
