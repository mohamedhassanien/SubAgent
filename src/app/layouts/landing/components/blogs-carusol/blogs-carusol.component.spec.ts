import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsCarusolComponent } from './blogs-carusol.component';

describe('BlogsCarusolComponent', () => {
  let component: BlogsCarusolComponent;
  let fixture: ComponentFixture<BlogsCarusolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsCarusolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsCarusolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
