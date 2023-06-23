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
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { InventoryService } from 'app/app-modules/inventory/shared/service/inventory.service';
import { ConfirmationService } from 'app/app-modules/core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-store-stock-adjustment',
  templateUrl: './store-stock-adjustment.component.html',
  styleUrls: ['./store-stock-adjustment.component.css']
})
export class StoreStockAdjustmentComponent implements OnInit {

  storeStockAdjustmentForm: FormGroup;
  adjustmentTypeList = ["Issue", "Receipt"];
  draftID: any;

  editMode = false;
  currentLanguageSet: any;
  languageComponent: SetLanguageComponent;
  isMainStore: boolean=false;
  lastUpdatedStockDate: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private http_service: LanguageService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private inventoryService: InventoryService) { }

  ngOnInit() {
    this.storeStockAdjustmentForm = this.createStoreStockAdjustmentForm();
    this.draftID = this.route.snapshot.paramMap.get('draftID');
    this.fetchLanguageResponse();

    if (this.draftID) {
      this.editMode = true;
      this.getStockAdjustmentDraftDetails(this.draftID);
    } else {
      this.editMode = false;
    }

    this.isMainStore = JSON.parse(localStorage.getItem('facilityDetail')).isMainFacility;
    this.showLastUpdatedStockLog();
  }

  createStoreStockAdjustmentForm() {
    return this.fb.group({
      refNo: null,
      adjustmentDate: { value: new Date(), disabled: true },
      stockAdjustmentDraftID: null,
      draftDesc: null,
      stockAdjustmentList: this.fb.array([this.initStockAdjustmentList()])
    });
  }

  initStockAdjustmentList() {
    return this.fb.group({
      itemStockEntryID: null,
      itemID: null,
      itemName: null,
      batchID: null,
      quantityInHand: null,
      adjustmentType: null,
      adjustedQuantity: null,
      qohAfterAdjustment: null,
      reason: null,
      deleted: false,
      stockAdjustmentDraftID: null,
      sADraftItemMapID: null
    })
  }

  addToStockAdjustmentList() {
    let stockAdjustmentFormArray = this.storeStockAdjustmentForm.controls['stockAdjustmentList'] as FormArray;
    stockAdjustmentFormArray.push(this.initStockAdjustmentList());
  }

  removeFromStockAdjustmentList(index, stockForm?: FormGroup) {
    let stockAdjustmentFormArray = this.storeStockAdjustmentForm.controls['stockAdjustmentList'] as FormArray;

    if (stockAdjustmentFormArray.length > 1) {
      stockAdjustmentFormArray.removeAt(index);
    }
    else {
      stockForm.reset();
      stockForm.controls['itemName'].enable();
    }
  }

  submitStockAdjustmentDraft(storeStockAdjustmentForm: FormGroup) {
    let storeStockAdjustment = JSON.parse(JSON.stringify(storeStockAdjustmentForm.value));

    let otherDetails = {
      "createdBy": localStorage.getItem('username'),
      "modifiedBy": localStorage.getItem('username'),
      "providerServiceMapID": localStorage.getItem('providerServiceID'),
      "facilityID": localStorage.getItem('facilityID'),
      "vanID": localStorage.getItem("vanID"),
      "parkingPlaceID": localStorage.getItem("parkingPlaceID")
    }

    let stockAdjustmentItemDraft = storeStockAdjustment.stockAdjustmentList.map(item => {
      item.isAdded = (item.adjustmentType == 'Receipt') ? true : false;
      item.adjustedQuantity = item.adjustedQuantity ? +(item.adjustedQuantity) : 0;
      item.adjustmentType = undefined;
      item = Object.assign({}, item, otherDetails);
      return item;
    })

    let temp = Object.assign({}, storeStockAdjustment, otherDetails, { stockAdjustmentItemDraft: stockAdjustmentItemDraft, stockAdjustmentList: undefined })

    this.confirmationService.provideDraftDescription(this.currentLanguageSet.inventory.draftDescription, temp.draftDesc)
      .subscribe(draftDesc => {
        temp.draftDesc = draftDesc;

        this.inventoryService.saveStockAdjustmentDraft(temp)
          .subscribe(response => {
            if (temp.stockAdjustmentDraftID) {
              this.confirmationService.alert(this.currentLanguageSet.inventory.updatedSuccessfully, 'success');
              // this.getStockAdjustmentDraftDetails(this.draftID);
              this.storeStockAdjustmentForm.reset({adjustmentDate: new Date()});
              this.location.back();
            } else {
              this.confirmationService.alert(this.currentLanguageSet.inventory.savedsuccessfully, 'success');
              this.storeStockAdjustmentForm.reset();
              this.storeStockAdjustmentForm.reset({adjustmentDate: new Date()});
              this.resetStockAdjustmentFormArray();
            }
          })
      })
  }

  submitStockAdjustmentFinal(storeStockAdjustmentForm: FormGroup) {
    let storeStockAdjustment = JSON.parse(JSON.stringify(storeStockAdjustmentForm.value));

    let otherDetails = {
      "createdBy": localStorage.getItem('username'),
      "providerServiceMapID": localStorage.getItem('providerServiceID'),
      "facilityID": localStorage.getItem('facilityID'),
      "vanID": localStorage.getItem("vanID"),
      "parkingPlaceID": localStorage.getItem("parkingPlaceID")
    }

    let stockAdjustmentItemDraft = storeStockAdjustment.stockAdjustmentList.map(item => {
      item.isAdded = (item.adjustmentType == 'Receipt') ? true : false;
      item.adjustedQuantity = item.adjustedQuantity ? +(item.adjustedQuantity) : 0;
      item.adjustmentType = undefined;
      item = Object.assign({}, item, otherDetails);
      return item;
    })

    let temp = Object.assign({}, storeStockAdjustment, otherDetails, { stockAdjustmentItem: stockAdjustmentItemDraft, stockAdjustmentList: undefined })

    this.inventoryService.saveStockAdjustment(temp)
      .subscribe(response => {
        if (temp.stockAdjustmentDraftID) {
          this.confirmationService.alert(this.currentLanguageSet.inventory.savedsuccessfully, 'success');
          // this.getStockAdjustmentDraftDetails(this.draftID);
          this.storeStockAdjustmentForm.reset({adjustmentDate: new Date()});
          this.location.back();
        } else {
          this.confirmationService.alert(this.currentLanguageSet.inventory.savedsuccessfully, 'success');
          this.storeStockAdjustmentForm.reset();
          this.storeStockAdjustmentForm.reset({adjustmentDate: new Date()});
          this.resetStockAdjustmentFormArray();
        }
      })
  }


  getStockAdjustmentDraftDetails(draftID) {
    let temp = parseInt(draftID);
    this.inventoryService.getStockAdjustmentDraftDetails(temp)
      .subscribe(response => {
        let stockAdjusmentList = response.stockAdjustmentItemDraftEdit;
        let stockAdjustmentFormArray = this.storeStockAdjustmentForm.controls['stockAdjustmentList'] as FormArray;

        for (let i = 0; i < stockAdjusmentList.length; i++) {
          stockAdjusmentList[i].adjustmentType = stockAdjusmentList[i].isAdded ? 'Receipt' : 'Issue';
          stockAdjusmentList[i].stockAdjustmentDraftID = response.stockAdjustmentDraftID;
          stockAdjustmentFormArray.at(i).patchValue(stockAdjusmentList[i]);
          (<FormGroup>stockAdjustmentFormArray.at(i)).controls['itemName'].disable();
          this.calculateQOHAfterAdjustment(stockAdjustmentFormArray.at(i) as FormGroup);
          if (stockAdjustmentFormArray.length < stockAdjusmentList.length)
            this.addToStockAdjustmentList();
        }

        this.storeStockAdjustmentForm.patchValue({
          adjustmentDate: new Date(response.createdDate),
          refNo: response.refNo,
          stockAdjustmentDraftID: response.stockAdjustmentDraftID,
          draftDesc: response.draftDesc
        });
      })
  }


  calculateQOHAfterAdjustment(stockForm: FormGroup) {
    let qoh = parseInt(stockForm.value.quantityInHand) || 0;
    let adjustedQuantity = parseInt(stockForm.value.adjustedQuantity) || 0;
    let adjustmentType = stockForm.value.adjustmentType;

    if (adjustmentType == 'Receipt') {
      if (qoh >= 0 && adjustedQuantity >= 0)
        stockForm.patchValue({ qohAfterAdjustment: qoh + adjustedQuantity })
    } else if (adjustmentType == 'Issue') {
      if (qoh > 0 && adjustedQuantity >= 0 && adjustedQuantity <= qoh)
        stockForm.patchValue({ qohAfterAdjustment: qoh - adjustedQuantity })
    }
  }

  resetStockAdjustmentFormArray() {
    let stockAdjustmentFormArray = this.storeStockAdjustmentForm.controls['stockAdjustmentList'] as FormArray;
    stockAdjustmentFormArray.controls.length = 0;
    this.addToStockAdjustmentList();
  }

  resetStoreStockAdjustmentForm() {
    this.resetStockAdjustmentFormArray();
    this.storeStockAdjustmentForm.reset({adjustmentDate: new Date()});
  }

  goBack() {
    this.location.back();
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

  addEAushadhiStock()
  {
    let reqObj={
      "facilityID": localStorage.getItem('facilityID'),
    }
    this.inventoryService.addEAushadhiItemsToAmrit(reqObj)
    .subscribe(response => {
          if(response != null && response !== undefined && response.statusCode === 200)
          {
            this.confirmationService.alert(response.data.response,'success');
            this.showLastUpdatedStockLog();
          }
          else{
            this.confirmationService.alert(response.errorMessage,'error');
          }
        }, err => {
          this.confirmationService.alert(err, 'error');
        });
  }
  showLastUpdatedStockLog() {
    let reqObj={
      "facilityID": localStorage.getItem('facilityID'),
    }
    this.inventoryService.showLastUpdatedStockLogs(reqObj).subscribe(logResponse => {
      console.log("response stock", logResponse);
      if(logResponse != null && logResponse !== undefined && logResponse.statusCode === 200)
      {
        if(logResponse.data.lastSuccessDate)
           this.lastUpdatedStockDate = new Date(logResponse.data.lastSuccessDate);
           else
           this.lastUpdatedStockDate = null;

      }
      else{
        this.confirmationService.alert(logResponse.errorMessage,'error');
      }
    }, err => {
      this.confirmationService.alert(err, 'error');
    });

  }
}
