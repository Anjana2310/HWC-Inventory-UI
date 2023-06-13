import { Component, OnInit, Inject } from '@angular/core';
import { InventoryService } from 'app/app-modules/inventory/shared/service/inventory.service';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-sub-store-item-model',
  templateUrl: './sub-store-item-model.component.html',
  styleUrls: ['./sub-store-item-model.component.css']
})
export class SubStoreItemModelComponent implements OnInit {

  batchWiseItemList: any = [];
  indentDetails: any;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public input: any,
    public http_service: LanguageService,
    public dialogRef: MdDialogRef<SubStoreItemModelComponent>,
    private inventoryService: InventoryService) { }

  ngOnInit() {
    if (this.input) {
      this.getItemListDetailsForIndentID(this.input.itemListDetails);
    }
    this.fetchLanguageResponse();
  }
  getItemListDetailsForIndentID(input) {
    this.indentDetails = input;
    let viewItemReqObj = {
      "indentID": input.indentID,
      "fromFacilityID": input.fromFacilityID
    }
    this.inventoryService.viewItemListForSubStore(viewItemReqObj).subscribe((viewItemResponse) => {
      this.batchWiseItemList = viewItemResponse.data
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
