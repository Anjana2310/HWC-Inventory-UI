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
