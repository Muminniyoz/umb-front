import { TestBed } from '@angular/core/testing';

import { TranzaksiyaService } from './tranzaksiya.service';

describe('TranzaksiyaService', () => {
  let service: TranzaksiyaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranzaksiyaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
