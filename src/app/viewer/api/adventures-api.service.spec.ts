import { TestBed } from '@angular/core/testing';

import { AdventuresApiService } from './adventures-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AdventuresViewerApiService', () => {
  let service: AdventuresApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AdventuresApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
