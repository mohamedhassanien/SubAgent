import { TestBed } from '@angular/core/testing';

import { ConfirmPasswordGuard } from './confirm-password.guard';

describe('ConfirmPasswordGuard', () => {
  let guard: ConfirmPasswordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmPasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
