import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-show-indent-batch-details',
  templateUrl: './show-indent-batch-details.component.html',
  styleUrls: ['./show-indent-batch-details.component.css']
})
export class ShowIndentBatchDetailsComponent implements OnInit {

  issuedBatchList = [];
  itemDetails: any;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;
  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public http_service: LanguageService,
    public mdDialogRef: MdDialogRef<ShowIndentBatchDetailsComponent>) { }

  ngOnInit() {
    if(this.data){
      this.issuedBatchList = this.data.batchList;
      this.itemDetails = this.data.itemDetails;
      console.log('itemDetails', this.itemDetails);
      console.log('issuedBatchList', this.issuedBatchList);
    }
    this.fetchLanguageResponse();
  }

  saveAndUpdateItem() {
    let finalValue = {
      issuedBatchList: this.data.batchList,
      itemDetails: this.data.itemDetails
    }
    this.mdDialogRef.close(finalValue);
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
