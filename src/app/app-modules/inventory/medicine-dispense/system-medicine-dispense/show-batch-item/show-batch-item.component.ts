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
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';
import { InventoryService } from './../../../shared/service/inventory.service';

@Component({
  selector: 'app-show-batch-item',
  templateUrl: './show-batch-item.component.html',
  styleUrls: ['./show-batch-item.component.css']
})
export class ShowBatchItemComponent implements OnInit {
  app: any;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;


  constructor(private inventoryService: InventoryService, public http_service: LanguageService, @Inject(MD_DIALOG_DATA) public data: any, public mdDialogRef: MdDialogRef<ShowBatchItemComponent>) { }
  issuedBatchList = [];
  beneficaryDetail: any;
  ngOnInit() {
    this.app = this.getApp();

    this.issuedBatchList = this.data.batchList
    this.beneficaryDetail = this.data.beneficaryDetail
    console.log('issuedBatchList', this.issuedBatchList);
    this.fetchLanguageResponse();

  }

  getApp() {
    console.log(sessionStorage.getItem('host'))
    if (sessionStorage.getItem('host')) {
      return sessionStorage.getItem('host')

    } else {
      return 'STORE';

    }
  }
  createStockExitList() {
    let stockExitList = [];
    this.issuedBatchList.forEach((dispenseItem) => {
      dispenseItem.itemBatchList.forEach((batch) => {
        let dispensedItem = {
          "createdBy": localStorage.getItem('userID'),
          "itemID": dispenseItem.itemID,
          "itemStockEntryID": batch.itemStockEntryID,
          "quantity": batch.quantity
        }
        stockExitList.push(dispensedItem);
      })
    })
    let dispensingItem = Object.assign({}, { issuedBy: this.app }, this.beneficaryDetail, { itemStockExit: stockExitList }, {
      "vanID": localStorage.getItem("vanID"),
      "parkingPlaceID": localStorage.getItem("parkingPlaceID"),
    });
    return dispensingItem;
  }

  saveAndUpdateItem() {
    let dispensingItem = this.createStockExitList();
    console.log('dispenseItem', dispensingItem);
    this.inventoryService.saveStockExit(dispensingItem).subscribe((response) => {
      this.closeBatchModal(response, this.issuedBatchList, null)
    })

  }

  saveUpdateAndPrintItem() {
    let dispensingItem = this.createStockExitList();
    console.log('dispenseItem', dispensingItem);
    this.inventoryService.saveStockExit(dispensingItem).subscribe((response) => {
      this.closeBatchModal(response, this.issuedBatchList, true)
    })
  }

  closeBatchModal(result, issuedBatchList, print) {
    let modalresult = Object.assign({ result: result, issuedBatchList: issuedBatchList, print: print })
    this.mdDialogRef.close(modalresult);
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
