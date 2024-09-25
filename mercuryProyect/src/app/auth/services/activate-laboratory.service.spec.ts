import { TestBed } from '@angular/core/testing';

import { ActivateLaboratoryService } from './activate-laboratory.service';

describe('ActivateLaboratoryService', () => {
  let service: ActivateLaboratoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateLaboratoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
