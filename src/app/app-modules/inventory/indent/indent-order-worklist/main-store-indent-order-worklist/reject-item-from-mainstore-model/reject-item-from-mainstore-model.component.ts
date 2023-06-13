import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { ConfirmationService } from 'app/app-modules/core/services';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { InventoryService } from 'app/app-modules/inventory/shared/service/inventory.service';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-reject-item-from-mainstore-model',
  templateUrl: './reject-item-from-mainstore-model.component.html',
  styleUrls: ['./reject-item-from-mainstore-model.component.css']
})
export class RejectItemFromMainstoreModelComponent implements OnInit {

  rejectRequestForm: FormGroup;
  inputObj: any;
  rejectOrderList: any = [];
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public input: any,
    public dialogRef: MdDialogRef<RejectItemFromMainstoreModelComponent>,
    public http_service: LanguageService,
    private inventoryService: InventoryService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.rejectRequestForm = this.createRejectRequestForm();
    console.log("input", this.input);
    this.fetchLanguageResponse();
  }
  createRejectRequestForm() {
    return this.fb.group({
      rejectReason: [null, Validators.required],
    })
  }
  get rejectReason() {
    return this.rejectRequestForm.controls['rejectReason'].value;
  }

  rejectIndentRequest() {
    this.inputObj = this.input.rejectItem;
    let rejectOrderObj =
      {
        "indentID": this.inputObj.indentID,
        "fromFacilityID": this.inputObj.toFacilityID,
        "fromFacilityName": this.inputObj.fromFacilityName,
        "toFacilityID": this.inputObj.fromFacilityID,
        "refNo": this.inputObj.refNo,
        "orderDate": this.inputObj.orderDate,
        "reason": this.inputObj.reason,
        "userID": this.inputObj.userID,
        "providerServiceMapID": this.inputObj.providerServiceMapID,
        "status": this.inputObj.status,
        "deleted": this.inputObj.deleted,
        "processed": this.inputObj.processed,
        "createdBy": this.inputObj.createdBy,
        "createdDate": this.inputObj.createdDate,
        "lastModDate": this.inputObj.lastModDate,
        "vanID": this.inputObj.vanID,
        "parkingPlaceID": this.inputObj.parkingPlaceID,
        "vanSerialNo": this.inputObj.vanSerialNo,
        "action": "Rejected",
        "rejectedReason": this.rejectReason
      }
    this.rejectOrderList.push(rejectOrderObj);

    this.inventoryService.rejectIndentOrder(this.rejectOrderList).subscribe((rejectIndentResponse) => {
      if (rejectIndentResponse.statusCode == 200) {
        this.confirmationService.alert((rejectIndentResponse.data.response), 'success');
        this.dialogRef.close(true);
      }
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
