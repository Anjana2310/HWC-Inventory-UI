import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {

  constructor() { }

  manualDispenseItem: any = {};
  systemItemDispense: any = {};
  previousVisitData: any = {};
  selfConsumption: any = {};
  physicalStock: any = {};
  stockTransfer: any = {};
  adjustment: any = {};
  indentDetails: any = {};
  
}
