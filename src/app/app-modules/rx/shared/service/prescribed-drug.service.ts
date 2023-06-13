import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';

@Injectable()
export class PrescribedDrugService {

  dummify = {
    prescribed: {
      prescriptionID: '1A22eddt5',
      prescribedDate: '08/08/2018',
      consultantName: 'Balu Lal',
      status: false,
      prescribedDrugs: [{
        drugID: '123431',
        drugName: 'SomeMed CapsoTableSyruped',
        batchNumber: '245u67ujt',
        qoh: 209,
        quantityPrescribed: 203,
        quantiyIssued: 209
      }, {
        drugID: '123431',
        drugName: 'SomeMed CapsoTableSyruped',
        batchNumber: '245u67ujt',
        qoh: 209,
        quantityPrescribed: 203,
        quantiyIssued: 209
      }, {
        drugID: '123431',
        drugName: 'SomeMed CapsoTableSyruped',
        batchNumber: '245u67ujt',
        qoh: 209,
        quantityPrescribed: 203,
        quantiyIssued: 209
      }]
    }
  };

  constructor(private http: Http) { }

  getPrescription(reqObj) {
    const vanID = localStorage.getItem('vanID');
    const parkingPlaceID = localStorage.getItem('parkingPlaceID');
    const msgObj = Object.assign(reqObj, {vanID}, {parkingPlaceID});

    // return Observable.of(this.dummify);
    return this.http.post(environment.getPrescriptions, msgObj)
    .map(res => res.json());
  }



  allocateBatches(list, facilityID) {
    return this.http.post(`${environment.allocateBatchStockUrl}/${facilityID}`, list)
    .map(res => res.json());
  }

  saveStockExit(dispensingItem) {
    const vanID = localStorage.getItem('vanID');
    const parkingPlaceID = localStorage.getItem('parkingPlaceID');
    const msgObj = Object.assign(dispensingItem, {vanID}, {parkingPlaceID});
    console.log('dispensingItem', JSON.stringify(dispensingItem, null, 4));

    return this.http.post(environment.saveStockExitUrl, msgObj)
      .map(res => res.json());
  }

}
