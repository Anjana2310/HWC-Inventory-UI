/*
* AMRIT – Accessible Medical Records via Integrated Technology 
* Integrated EHR (Electronic Health Records) Solution 
*
* Copyright (C) "Piramal Swasthya Management and Research Institute" 
*
* This file is part of AMRIT.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see https://www.gnu.org/licenses/.
*/
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
