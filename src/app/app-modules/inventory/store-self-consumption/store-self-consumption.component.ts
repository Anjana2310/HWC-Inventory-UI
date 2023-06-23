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
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from '../../core/services/confirmation.service';
import { InventoryService } from '../shared/service/inventory.service';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';


@Component({
  selector: 'app-store-self-consumption',
  templateUrl: './store-self-consumption.component.html',
  styleUrls: ['./store-self-consumption.component.css']
})
export class StoreSelfConsumptionComponent implements OnInit {

  storeSelfConsumptionForm: FormGroup;
  facilityID: any;
  providerServiceMapID: any;
  createdBy: any;
  currentLanguageSet: any;
  languageComponent: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http_service: LanguageService,
    private inventoryService: InventoryService,
    private alertService: ConfirmationService) {
  }

  ngOnInit() {
    this.createdBy = localStorage.getItem('username');
    this.facilityID = localStorage.getItem('facilityID');
    this.fetchLanguageResponse();
    this.providerServiceMapID = localStorage.getItem('providerServiceID');

    if (this.facilityID == null || this.facilityID <= 0) {
      this.router.navigate(['/inventory']);
    }

    this.storeSelfConsumptionForm = this.createStoreSelfConsumptionForm();
  }

  createStoreSelfConsumptionForm() {
    return this.fb.group({
      referenceNumber: null,
      dispenseReason: null,
      dispensedStock: new FormArray([this.initDispensedStock()])
    })
  }

  initDispensedStock() {
    return this.fb.group({
      itemStockEntryID: null,
      batchNo: [null, Validators.required],
      itemID: [null, Validators.required],
      itemName: [null, Validators.required],
      quantityInHand: null,
      quantity: [null, Validators.required],
    });
  }

  addDispensedStock() {
    let stockForm = this.storeSelfConsumptionForm.controls['dispensedStock'] as FormArray;
    // if (stock) {
    stockForm.push(this.initDispensedStock());
    // } else {
    // this.alertService.alert('Please enter the values first', 'info');
    // }
  }

  checkValidity(stock?: FormGroup) {
    const tempValid = stock.value;
    // console.log('tempValid', tempValid)
    if (tempValid.quantity) {
      return false;
    } else {
      return true;
    }
  }

  removeDispensedStock(index, stock?: FormGroup) {
    let stockForm = this.storeSelfConsumptionForm.controls['dispensedStock'] as FormArray;
    if (stockForm.length > 1) {
      stockForm.removeAt(index);
    }
    else {
      stock.reset();
      stock.controls['itemName'].enable();
    }
  }

  saveSelfConsumptionStock() {
    let temp = JSON.parse(JSON.stringify(this.storeSelfConsumptionForm.value));
    let itemStockExit = temp.dispensedStock.map(item => {
      item = Object.assign({}, item, {
        "createdBy": this.createdBy,
        "facilityID": this.facilityID
      });
      return item;
    })
    let requestBody = Object.assign({}, {
      "issueType": "Manual",
      "refNo": temp.referenceNumber,
      "reason": temp.dispenseReason,
      "itemStockExit": itemStockExit,
      "facilityID": this.facilityID,
      "providerServiceMapID": this.providerServiceMapID,
      "createdBy": this.createdBy,
      "dispensedStock": undefined,
      "vanID": localStorage.getItem("vanID"),
      "parkingPlaceID": localStorage.getItem("parkingPlaceID")
    })

    // console.log("Self Stock Consumption", JSON.stringify(requestBody, null, 4));

    this.inventoryService.storeSelfConsumption(requestBody)
      .subscribe(response => {
        if (response.statusCode == 200) {
          this.alertService.alert(this.currentLanguageSet.inventory.savedsuccessfully, 'success');
          this.reset();
        }
        else
          this.alertService.alert(response.status, 'error');
      }, err => {
        this.alertService.alert(err, 'error');
      })
  }

  reset() {
    this.removeAllDispensedStock(this.storeSelfConsumptionForm.controls['dispensedStock'] as FormArray)
    // let i = this.storeSelfConsumptionForm.controls['dispensedStock'] as FormArray;
    // i = null;
    // i = new FormArray([this.initDispensedStock()]);
    this.storeSelfConsumptionForm.reset();
    // this.storeSelfConsumptionForm = this.createStoreSelfConsumptionForm();
  }

  validateRequestedQuantity(stock: FormGroup) {
    let quantityInHand = stock.value.quantityInHand;
    let requestedQuantity = stock.value.quantity;

    if (requestedQuantity <= 0) {
      this.alertService.alert(this.currentLanguageSet.inventory.quantitycannotbenegativeorzero);
      stock.controls['quantity'].setValue(null);
    } else if (requestedQuantity > quantityInHand) {
      this.alertService.alert(this.currentLanguageSet.inventory.insufficientquantityinthisbatch);
      stock.controls['quantity'].setValue(null);
    }
  }

  removeAllDispensedStock(dispensedStockArray: FormArray) {
    // let len = dispensedStockArray.length;
    // for (let i = 0; i < len - 1; i++) {
    while (dispensedStockArray.length > 1) {
      dispensedStockArray.removeAt(0);
    }
    dispensedStockArray.enable();

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
