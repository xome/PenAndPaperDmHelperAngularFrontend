import { TestBed } from '@angular/core/testing';

import { AdventuresApiService } from './adventures-api.service';

describe('AdventuresViewerApiService', () => {
  let service: AdventuresApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdventuresApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
