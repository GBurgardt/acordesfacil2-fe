import { TestBed } from '@angular/core/testing';

import { AcordesService } from './acordes.service';

describe('AcordesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcordesService = TestBed.get(AcordesService);
    expect(service).toBeTruthy();
  });
});
