import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

import { InventoryService } from './../../../inventory/shared/service/inventory.service';

@Component({
  selector: 'app-benificiary-details',
  templateUrl: './benificiary-details.component.html',
  styleUrls: ['./benificiary-details.component.css']
})
export class BenificiaryDetailsComponent implements OnInit {

  beneficiaryDetailsList = [];
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(private inventoryService: InventoryService,
    private http_service: LanguageService,
    public dialogRef: MdDialogRef<BenificiaryDetailsComponent>,
    @Inject(MD_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
    console.log("Data", this.data)
    this.beneficiaryDetailsList = this.data.beneficiaryDetailsList;
    this.fetchLanguageResponse();
    console.log("this.ben", this.beneficiaryDetailsList)
  }

  loadbeneficiaryDetails(beneficiary) {
    this.dialogRef.close(beneficiary);
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
