import { TestBed } from '@angular/core/testing';

import { TrainingRestService } from './training-rest.service';

describe('TrainingRestService', () => {
  let service: TrainingRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
