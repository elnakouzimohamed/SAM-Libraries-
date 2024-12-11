import { TestBed } from '@angular/core/testing';

import { GENAIService } from './genai.service';

describe('GENAIService', () => {
  let service: GENAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GENAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
