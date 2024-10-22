import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlsVfsComponent } from './tls-vfs.component';

describe('TlsVfsComponent', () => {
  let component: TlsVfsComponent;
  let fixture: ComponentFixture<TlsVfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlsVfsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlsVfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
