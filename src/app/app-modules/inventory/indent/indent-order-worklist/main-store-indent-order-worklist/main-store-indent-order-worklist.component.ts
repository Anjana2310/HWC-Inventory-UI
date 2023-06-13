import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'app/app-modules/core/services';
import { Router } from '@angular/router'
import { MdDialog } from '@angular/material';
import { InventoryService } from 'app/app-modules/inventory/shared/service/inventory.service';
import { MainStoreItemModelComponent } from './main-store-item-model/main-store-item-model.component';
import { RejectItemFromMainstoreModelComponent } from './reject-item-from-mainstore-model/reject-item-from-mainstore-model.component';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-main-store-indent-order-worklist',
  templateUrl: './main-store-indent-order-worklist.component.html',
  styleUrls: ['./main-store-indent-order-worklist.component.css']
})
export class MainStoreIndentOrderWorklistComponent implements OnInit {

  enableDispensary: Boolean = false;
  isMainStore: Boolean = false;
  enableIndentReceipt: Boolean = false;

  mainstoreOrderlist: any = [];
  mainStoreItemList: any = [];
  orderReqObject: any;
  rejectOrderList = [];

  mainFacilityID: any;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    private inventoryService: InventoryService,
    private dialog: MdDialog,
    public http_service:LanguageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {
    this.orderReqObject = {
      "facilityID": localStorage.getItem('facilityID')
    }
    this.showMainStoreOrderWorklist(this.orderReqObject);
    this.navigateToIndentReceipt();
    this.fetchLanguageResponse();

  }
  showMainStoreOrderWorklist(orderReqObject) {
    this.inventoryService.showMainstoreOrderWorklist(orderReqObject).subscribe((orderlistRes) => {
      this.mainstoreOrderlist = orderlistRes.data;
    })

  }
  viewItemListDetails(orderList) {
    this.dialog.open(MainStoreItemModelComponent, {
      width: "80%",
      panelClass: 'fit-screen',
      data: {
        itemListDetails: orderList
      }
    })
  }
  viewItemListDetailsForDispense(itemData) {
    console.log('itemData', itemData);
    window.localStorage.setItem('toFacilityID', itemData.fromFacilityID);
    window.localStorage.setItem('fromFacilityName', itemData.fromFacilityName);
    window.localStorage.setItem('fromFacilityID', itemData.toFacilityID);
    // this.router.navigate(['/inventory/mainStoreIndentDispenses/97/3'])
    this.router.navigate(['/inventory/mainStoreIndentDispenses/', itemData.fromFacilityID, itemData.indentID])
  }
  rejectIndent(rejectOrder) {

    // let rejectOrderObj = Object.assign({}, rejectOrder, {"action": "Rejected" });
    let dialogRef = this.dialog.open(RejectItemFromMainstoreModelComponent, {
      width: "40%",
      height: "40%",
      panelClass: 'fit-screen',
      data: {
        rejectItem: rejectOrder
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('result',result);
      
      if (result) {
        this.showMainStoreOrderWorklist(this.orderReqObject);
      }
    })
  }
  navigateToIndentReceipt() {
    this.isMainStore = JSON.parse(localStorage.getItem('facilityDetail')).isMainFacility;
    this.mainFacilityID = JSON.parse(localStorage.getItem('facilityDetail')).mainFacilityID;

    if (this.isMainStore && (this.mainFacilityID != null || this.mainFacilityID != undefined)) {
      this.enableIndentReceipt = true;
    }
  }

  routingPath() {
    this.router.navigate(['inventory/subStoreIndentOrderWorklist']);

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
