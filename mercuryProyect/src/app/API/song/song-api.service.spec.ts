import { TestBed } from '@angular/core/testing';

import { SongAPIService } from './song-api.service';

describe('SongService', () => {
  let service: SongAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
