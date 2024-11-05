import { TestBed } from '@angular/core/testing';

import { ArtistAPIService } from './artist-api.service';

describe('ArtistService', () => {
  let service: ArtistAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
