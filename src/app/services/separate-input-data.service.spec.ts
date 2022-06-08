import { TestBed } from '@angular/core/testing';

import { SeparateInputDataService } from './separate-input-data.service';

describe('SeparateInputDataService', () => {
  let service: SeparateInputDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeparateInputDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
