import { TestBed } from '@angular/core/testing';

import { HisobService } from './hisob.service';

describe('HisobService', () => {
  let service: HisobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HisobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
