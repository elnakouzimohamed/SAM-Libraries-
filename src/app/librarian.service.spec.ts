import { TestBed } from '@angular/core/testing';

import { LibrarianService } from './librarian.service';

describe('LibrarianService', () => {
  let service: LibrarianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
