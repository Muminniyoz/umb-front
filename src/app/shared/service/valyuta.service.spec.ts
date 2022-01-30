import { TestBed } from '@angular/core/testing';

import { ValyutaService } from './valyuta.service';

describe('ValyutaService', () => {
  let service: ValyutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValyutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
