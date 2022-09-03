import { TestBed } from '@angular/core/testing';

import { InstallPwaService } from './install-pwa.service';

describe('InstallPwaService', () => {
  let service: InstallPwaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallPwaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
