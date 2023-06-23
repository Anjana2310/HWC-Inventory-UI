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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

import { FaciltyService } from './facilty.service';
import { ConfirmationService } from '../app-modules/core/services';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-facility-selection',
  templateUrl: './facility-selection.component.html',
  styleUrls: ['./facility-selection.component.css']
})
export class FacilitySelectionComponent implements OnInit {

  facilityForm: FormGroup;
  serviceProviderId: any;
  stores = [];
  enableContinue: Boolean = false;
  facilities = [];
  subFacilities = [];
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private faciltyService: FaciltyService,
    private http_service: LanguageService,
    private confirmationService: ConfirmationService) { }


  ngOnInit() {
    localStorage.removeItem('facilityDetail');
    localStorage.removeItem('facilityID');
    this.fetchLanguageResponse();
    this.serviceProviderId = localStorage.getItem('providerServiceID');

    this.facilityForm = this.createFacilityForm();
    this.getAllStores();
  }

  createFacilityForm() {
    return this.fb.group({
      isMainStore: null,
      facility: null,
      subFacility: null
    })
  }

  get isMainStore() {
    return this.facilityForm.controls['isMainStore'].value;
  }

  get facility() {
    return this.facilityForm.controls['facility'].value;
  }
  get subFacility() {
    return this.facilityForm.controls['subFacility'].value;
  }

  getAllStores() {
    this.faciltyService.getAllStores(this.serviceProviderId).subscribe((data) => {
      this.stores = data.data;
    })
  }

  checkStores() {
    this.subFacilities = [];
    this.facilities = [];
    this.facilityForm.patchValue({
      facility: null,
      subFacility: null
    })
    this.getFacility();
  }

  toContinue() {
    if (this.isMainStore == 'true' && this.facility != undefined && this.facility != null) {
      this.enableContinue = true;
      localStorage.setItem('facilityID', this.facility.facilityID)
      localStorage.setItem('facilityDetail', JSON.stringify(this.facility))
    } else if (this.isMainStore == 'false' && this.facility != undefined && this.facility != null && this.subFacility != undefined && this.subFacility != null) {
      this.enableContinue = true;
      localStorage.setItem('facilityID', this.subFacility.facilityID);
      localStorage.setItem('facilityDetail', JSON.stringify(this.subFacility));
      this.getFacilityMappedVanID(this.subFacility.facilityID);
    } else {
      this.enableContinue = false;
    }
  }

  getFacility() {
    this.facilities = this.stores.filter((facility) => {
      if (facility.isMainFacility == true && facility.deleted == false) {
        return facility;
      }
    })
  }

  getSubFacility() {
    this.facilityForm.patchValue({ subFacility: null });
    this.subFacilities = [];
    this.subFacilities = this.stores.filter((subFacility) => {
      if (!subFacility.deleted && subFacility.mainFacilityID && subFacility.mainFacilityID == this.facility.facilityID) {
        return subFacility;
      }
    })
  }

  vanID: any;
  parkingPlaceID: any;

  getFacilityMappedVanID(facilityID) {
    this.faciltyService.getVanByStoreID(facilityID)
      .subscribe(res => {
        if (res.statusCode == 200 && res.data) {
          this.vanID = res.data.vanID;
          this.parkingPlaceID = res.data.parkingPlaceID;
        }
      });
  }

  checkSubFacility() {

  }

  designation: any;
  proceedFurther() {
    this.designation = 'Pharmacist';
    if (this.vanID && this.parkingPlaceID) {
      localStorage.setItem('vanID', this.vanID);
      localStorage.setItem('parkingPlaceID', this.parkingPlaceID);
    }
    this.routeToDesignation(this.designation);
  }

  routeToDesignation(designation) {
    switch (designation) {
      case "Pharmacist":
        this.router.navigate(['/loadStores']);
        break;
      default:
    }
  }

  goToWorkList() {

  }

  //AN40085822 29/9/2021 Integrating Multilingual Functionality --Start--
  ngDoCheck(){
    this.fetchLanguageResponse();
  }

  fetchLanguageResponse() {
    this.languageComponent = new SetLanguageComponent(this.http_service);
    this.languageComponent.setLanguage();
    this.currentLanguageSet = this.languageComponent.currentLanguageObject; 
  }
  //--End--
}
