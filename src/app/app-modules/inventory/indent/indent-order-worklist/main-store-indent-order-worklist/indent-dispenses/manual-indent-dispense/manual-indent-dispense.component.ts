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
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ConfirmationService } from 'app/app-modules/core/services';
import { InventoryService } from 'app/app-modules/inventory/shared/service/inventory.service';
import { SelectBatchForIndentItemComponent } from './select-batch-for-indent-item/select-batch-for-indent-item.component'
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-manual-indent-dispense',
  templateUrl: './manual-indent-dispense.component.html',
  styleUrls: ['./manual-indent-dispense.component.css']
})
export class ManualIndentDispenseComponent implements OnInit {

  mainStoreItemList: any;

  batchlist = [];
  manualDispenseList = [];
  mainStoreItemListForDispense: any = [];
  enableButton: Boolean = true;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private dialog: MdDialog,
    public http_service:LanguageService,
    private location: Location,
    private inventoryService: InventoryService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getItemList();
    this.fetchLanguageResponse();
  }

  manipulateMainStoreItem() {
    if (this.mainStoreItemList && this.mainStoreItemList.length > 0) {
      let selectedFlag = false;
      this.mainStoreItemList.forEach((dispenseItem) => {
        let itemdata = Object.assign(dispenseItem, { selectedFlag });
        this.mainStoreItemListForDispense.push(itemdata);
      });
      console.log("dispense", this.mainStoreItemListForDispense);
    }
    else {
      console.log('mainstoreItemList is empty');
    }
  }

  getItemList() {
    console.log("this.activatedRoute", this.activatedRoute);
    let viewItemReqObj = {
      "indentID": this.activatedRoute.snapshot.params['indentID'],
      "fromFacilityID": this.activatedRoute.snapshot.params['toFacilityID']
    }
    this.inventoryService.viewItemListForMainStore(viewItemReqObj).subscribe((viewItemResponse) => {
      if (viewItemResponse.statusCode == 200) {
        this.mainStoreItemList = viewItemResponse.data;
        this.manipulateMainStoreItem();
      }
    })
  }

  selectBatchForSelectedItem(selectedItem, editIndex, editableItem) {
    console.log('selectedItem', selectedItem);
    let batchlistObj = {
      "itemID": selectedItem.itemID,
      "facilityID": localStorage.getItem('facilityID')
    }
    this.inventoryService.viewBatchlistForIndentItem(batchlistObj).subscribe((batchlistResponse) => {
      if (batchlistResponse.statusCode == 200) {
        console.log("Batch list response", batchlistResponse);
        this.batchlist = batchlistResponse.data;
        console.log("this.batchList", this.batchlist);
        this.openSelectBatchDialog(selectedItem, this.batchlist, editIndex, editableItem);
      }
    })
  }

  goBack() {
    this.location.back();
  }



  openSelectBatchDialog(selectedItem, batchlist, editIndex, editableItem) {
    const mdDialogRef:
      MdDialogRef<SelectBatchForIndentItemComponent>
      = this.dialog.open(SelectBatchForIndentItemComponent, {
        width: "80%",
        panelClass: 'fit-screen',
        data: {
          indentItem: selectedItem,
          batchList: batchlist,
          editIndex: editIndex,
          editableItem: editableItem
        },
        disableClose: false
      });
    mdDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Result", result);

        if (editIndex != null) {
          this.manualDispenseList.splice(editIndex, 1);
          this.manualDispenseList.push(result);
          console.log('this.manualDispenseList', JSON.stringify(this.manualDispenseList, null, 4));

        } else {
          this.disableBatchSelcetion(selectedItem, this.mainStoreItemListForDispense);
          this.manualDispenseList.push(result);
        }
      }
    })
  }

  disableBatchSelcetion(selectedItem, mainStoreItemList) {
    this.mainStoreItemListForDispense = mainStoreItemList.filter((dispenseItem) => {
      if (selectedItem.itemName == dispenseItem.itemName) {
        let selectedFlag = true;
        Object.assign(dispenseItem, {
          selectedFlag: selectedFlag
        })
        return dispenseItem;
      } else {
        return dispenseItem;
      }
    })
    console.log('mainStoreItemListForDispense', this.mainStoreItemListForDispense);

  }

  editItem(item, editIndex) {
    this.selectBatchForSelectedItem(item.itemDetails, editIndex, item.batchDetails);
  }

  removeManualDispenseItem(deletedItem, deleteIndex) {
    this.manualDispenseList.splice(deleteIndex, 1);
    this.enableBatchSelection(deletedItem, this.mainStoreItemListForDispense);
  }

  enableBatchSelection(deletedItem, mainStoreItemList) {
    console.log('deletedItem', deletedItem);
    this.mainStoreItemListForDispense = mainStoreItemList.filter((dispenseItem) => {
      if (deletedItem.itemDetails.itemName == dispenseItem.itemName) {
        let selectedFlag = false;
        Object.assign(dispenseItem, {
          selectedFlag: selectedFlag
        })
        return dispenseItem;
      } else {
        return dispenseItem;
      }
    })
    console.log('mainStoreItemListForDispense', this.mainStoreItemListForDispense);
  }
  batchListDetails = [];

  saveDispenseList() {
    let itemDetailsObj: any;
    console.log('This.manual dispense list..', JSON.stringify(this.manualDispenseList, null, 4));

    console.log('this.manualDispenseList', JSON.stringify(this.manualDispenseList, null, 4));
    let currentDate = new Date();
    let currentDateManipulated = new Date(currentDate.valueOf() - 1 * currentDate.getTimezoneOffset() * 60 * 1000)

    this.manualDispenseList.forEach((itemData) => {
      console.log('itemData', itemData.item, itemData.itemDetails);

      itemData.batchDetails.batchList.forEach((batchData) => {
        let reqObjForBatchList = {
          "indentOrderID": itemData.itemDetails.indentOrderID,
          "indentID": itemData.itemDetails.indentID,
          "itemID": itemData.itemDetails.itemID,
          "itemName": itemData.itemDetails.itemName,
          "issuedQty": batchData.quantityOfDispense,
          "issueDate": currentDateManipulated,
          "remarks": itemData.itemDetails.remarks,
          "providerServiceMapID": itemData.itemDetails.providerServiceMapID,
          "vanID": itemData.itemDetails.vanID,
          "deleted": itemData.itemDetails.deleted,
          "processed": itemData.itemDetails.processed,
          "createdBy": itemData.itemDetails.createdBy,
          "createdDate": itemData.itemDetails.createdDate,
          "fromFacilityID": localStorage.getItem('fromFacilityID'),
          "fromFacilityName": localStorage.getItem('fromFacilityName'),
          "toFacilityID": localStorage.getItem('toFacilityID'),
          "parkingPlaceID": itemData.itemDetails.parkingPlaceID,
          "action": "Issued",
          "itemStockEntryID": batchData.batchNo.itemStockEntryID,
          "unitCostPrice": batchData.batchNo.totalCostPrice,
          "batchNo": batchData.batchNo.batchNo,
          "expiryDate": batchData.batchNo.expiryDate

        }
        this.batchListDetails.push(reqObjForBatchList)
      })
    })
    console.log('batchListDetails', this.batchListDetails);
    if (this.mainStoreItemListForDispense.length != this.manualDispenseList.length) {
      this.confirmationService.confirm("info", "All items are not selected. Do you want to proceed further?", "Yes", "No").subscribe((res) => {
        if (res) {
          this.saveAPICall();
        }
      })
    }
    if (this.mainStoreItemListForDispense.length == this.manualDispenseList.length) {
      this.saveAPICall();
    }
  }
  saveAPICall() {
    this.inventoryService.saveDispenseList(this.batchListDetails).subscribe((response) => {
      console.log('Response for save data', response);
      if (response.statusCode == 200) {
        this.confirmationService.alert((response.data.response), 'success');
        this.router.navigate(['/inventory/mainStoreIndentOrderWorklist']);
        this.resetLocalstorageData();
      }
    })
  }

  resetLocalstorageData() {
    localStorage.removeItem('fromFacilityID');
    localStorage.removeItem('fromFacilityName');
    localStorage.removeItem('toFacilityID');
  }

  // AV40085804 29/09/2021 Integrating Multilingual Functionality -----Start-----
  ngDoCheck() {
    this.fetchLanguageResponse();
  }

  fetchLanguageResponse() {
    this.languageComponent = new SetLanguageComponent(this.http_service);
    this.languageComponent.setLanguage();
    this.currentLanguageSet = this.languageComponent.currentLanguageObject;
  }
  // -----End------
}
