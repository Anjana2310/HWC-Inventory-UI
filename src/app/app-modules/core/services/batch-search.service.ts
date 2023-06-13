import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class BatchSearchService {

  constructor(private http: Http) { }

  searchItemBatch(searchTerms: string) {
    let body = {
      "itemName": searchTerms,
      "facilityID": localStorage.getItem('facilityID')
    }

    return this.http.post(environment.searchBatchUrl, body)
      .map(res => {
        let temp = res.json().data;
        temp.forEach(element => {
          if (element.expiryDate)
            element.expiryDate = new Date(element.expiryDate);
        });
        return temp;
      });
  }

  searchAdjustmentBatch(searchTerms: string) {
    let body = {
      "itemName": searchTerms,
      "facilityID": localStorage.getItem('facilityID')
    }

    return this.http.post(environment.searchBatchUrl, body)
      .map(res => {
        let temp = res.json().data;
        temp.forEach(element => {
          if (element.expiryDate)
            element.expiryDate = new Date(element.expiryDate);
        });
        return temp;
      });
  }
/* Service for indent-item-list component */
  searchItem(searchTerm: string) {
    let reqObj = {
        "itemName": searchTerm,
        "facilityID": localStorage.getItem('facilityID')    
      
    }
    return this.http.post(environment.searchItemListUrl, reqObj)
      .map(res => {
        let temp = res.json().data;
        temp.forEach(element => {
          if (element.expiryDate)
            element.expiryDate = new Date(element.expiryDate);
        });
        return temp;
      });

  }
}