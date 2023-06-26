import { TestBed } from '@angular/core/testing';

import { FcmServiceService } from './fcm-service.service';

describe('FcmServiceService', () => {
  let service: FcmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FcmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
