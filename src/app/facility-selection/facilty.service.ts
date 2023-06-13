import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';

@Injectable()
export class FaciltyService {

  constructor(private http: Http) { }

  stores: any;
  getAllStores(serviceProviderId) {
    // if (!this.stores) {
    //   this.stores = this.http.post(environment.getFacilityUrl + serviceProviderId, {})
    //     .map(res => res.json());
    // }
    // return this.stores;

     return this.http.post(environment.getFacilityUrl + serviceProviderId, {})
        .map(res => res.json());
  }

  getVanByStoreID(storeID) {
    return this.http.post(environment.getVanByStoreIDUrl + "/" + storeID, {storeID})
      .map(res => res.json());
  }

}
