import { TestBed } from '@angular/core/testing';

import { PlayListAPIService } from './play-list-api.service';

describe('PlayListService', () => {
  let service: PlayListAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayListAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
