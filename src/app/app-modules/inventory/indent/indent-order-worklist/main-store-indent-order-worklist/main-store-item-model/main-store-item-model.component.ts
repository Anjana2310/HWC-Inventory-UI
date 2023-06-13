import { Component, OnInit, Inject} from '@angular/core';
import { InventoryService } from 'app/app-modules/inventory/shared/service/inventory.service';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-main-store-item-model',
  templateUrl: './main-store-item-model.component.html',
  styleUrls: ['./main-store-item-model.component.css']
})
export class MainStoreItemModelComponent implements OnInit {

  mainStoreIndentDetails: any;
  mainStoreBatchWiseItemList: any = [];
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public input: any,
    public dialogRef: MdDialogRef<MainStoreItemModelComponent>,
    public http_service: LanguageService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    if (this.input) {
      this.getMainStoreItemListDetailsForIndentID(this.input.itemListDetails);
    }
    this.fetchLanguageResponse();
  }
  getMainStoreItemListDetailsForIndentID(input) {
    this.mainStoreIndentDetails = input;
    console.log("input", input);
    let viewItemReqObj = {
      "indentID": input.indentID,
      "fromFacilityID": input.fromFacilityID
    }
    // let viewItemReqObj = {
    //   "indentID": 3,
    //   "vanID": 97
    // }
    this.inventoryService.viewItemListForMainStore(viewItemReqObj).subscribe((viewItemResponse) => {
      this.mainStoreBatchWiseItemList = viewItemResponse.data
    })
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
