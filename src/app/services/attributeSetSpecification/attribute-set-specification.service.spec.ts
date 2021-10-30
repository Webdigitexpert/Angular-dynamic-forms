import { TestBed } from '@angular/core/testing';

import { AttributeSetSpecificationService } from './attribute-set-specification.service';

describe('AttributeSetSpecificationService', () => {
  let service: AttributeSetSpecificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeSetSpecificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
