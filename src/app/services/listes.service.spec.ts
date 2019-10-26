import { TestBed } from '@angular/core/testing';

import { ListesService } from './listes.service';

describe('ListesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListesService = TestBed.get(ListesService);
    expect(service).toBeTruthy();
  });
});
