import { TestBed, inject } from '@angular/core/testing';

import { InventoryMasterService } from './inventory-master.service';

describe('InventoryMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryMasterService]
    });
  });

  it('should be created', inject([InventoryMasterService], (service: InventoryMasterService) => {
    expect(service).toBeTruthy();
  }));
});
