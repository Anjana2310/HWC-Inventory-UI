import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ConfirmationService } from 'app/app-modules/core/services';
import { MdDialog } from '@angular/material';
import { SubStoreItemModelComponent } from './sub-store-item-model/sub-store-item-model.component';
import { InventoryService } from 'app/app-modules/inventory/shared/service/inventory.service';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-sub-store-indent-order-worklist',
  templateUrl: './sub-store-indent-order-worklist.component.html',
  styleUrls: ['./sub-store-indent-order-worklist.component.css']
})
export class SubStoreIndentOrderWorklistComponent implements OnInit {

  substoreOrderlist: any = [];
  orderReqObject: any;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    private inventoryService: InventoryService,
    private dialog: MdDialog,
    public http_service: LanguageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private dataStorageService: DataStorageService) { }
    
  ngOnInit() {
    
    this.orderReqObject = {
      "fromFacilityID": localStorage.getItem('facilityID')
    }
    this.showSubstoreOrderWorklist(this.orderReqObject);
    this.fetchLanguageResponse();
  }
  showSubstoreOrderWorklist(orderReqObject) {
    this.inventoryService.showSubStoreOrderWorklist(orderReqObject).subscribe((orderlistRes) => {
      this.substoreOrderlist = orderlistRes.data;
    })

  }
  cancelIndent(indentOrder) {
    console.log(indentOrder);

    this.inventoryService.cancelIndentRequest(indentOrder).subscribe((cancelResponse) => {
      if (cancelResponse.statusCode == 200) {
        this.confirmationService.alert((cancelResponse.data.response), 'success');
        this.showSubstoreOrderWorklist(this.orderReqObject);
      } else {
        this.confirmationService.alert(cancelResponse.errorMessage);
      }
    })
  }

  viewItemListDetails(orderlist) {
    this.dialog.open(SubStoreItemModelComponent, {
      width: "80%",
      panelClass: 'fit-screen',
      data: {
        itemListDetails: orderlist
      }
    })
  }
  routeToRaiseRequest() {
    this.router.navigate(['/inventory/indentRequest'])
  }
  receiveIndent(acceptorder) {
    console.log("acceptorder", acceptorder);
    this.inventoryService.receiveIndentOrder(acceptorder).subscribe((acceptOrderResponse) => {
      if (acceptOrderResponse.statusCode == 200) {
        this.confirmationService.alert(( acceptOrderResponse.data.response),'success');
        this.showSubstoreOrderWorklist(this.orderReqObject);
      } else {
        this.confirmationService.alert(acceptOrderResponse.errorMessage);
      }
    })

  }
  goToUpdateIndentRequest(indentDetails) {
    console.log("indentDetails", indentDetails);
    this.dataStorageService.indentDetails = indentDetails;
    this.router.navigate(['inventory/indentRequest/']);

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
