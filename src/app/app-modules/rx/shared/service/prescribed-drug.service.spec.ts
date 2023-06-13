import { TestBed, inject } from '@angular/core/testing';

import { PrescribedDrugService } from './prescribed-drug.service';

describe('PrescribedDrugService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrescribedDrugService]
    });
  });

  it('should be created', inject([PrescribedDrugService], (service: PrescribedDrugService) => {
    expect(service).toBeTruthy();
  }));
});
