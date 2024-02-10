import { TestBed } from '@angular/core/testing';

import { GenericDataService } from './generic-data.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GenericDataserviceService', () => {
  let service: GenericDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GenericDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
