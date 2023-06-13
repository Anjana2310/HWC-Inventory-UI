import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ItemSearchService {

  constructor(private http: Http) { }

  searchDrugItem(searchTerms: string) {
    const body = {
      'itemName': searchTerms,
      'facilityID': localStorage.getItem('facilityID')
    }

    return this.http.post(environment.searchItemUrl, body)
      .map(res => res.json().data);
  }

  searchDrugItemforTransfer(search, facilityTo) {
    const body = {
      'itemName': search,
      'transferFromFacilityID': localStorage.getItem('facilityID'),
      'transferToFacilityID': facilityTo
    }

    return this.http.post(environment.searchTransferItemUrl, body)
      .map(res => res.json().data);

  }

  getItemDetailsByName(searchTerms: string) {
    const searchedItem = {
      'itemName': searchTerms,
      'facilityID': localStorage.getItem('facilityID')
    }
    return this.http.post(environment.getItemDetailsByNameUrl, searchedItem)
      .map(res => res.json().data);
  }

}
