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
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm, FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

import { InventoryService } from '../../../inventory/shared/service/inventory.service';
import { ConfirmationService } from '../../../core/services/confirmation.service';
import { SearchComponent } from '../../../core/components/search/search.component';
import { PatientReturnBatchDetailsComponent } from '../../../inventory/patient-return/patient-return-batch-details/patient-return-batch-details.component';
import { Router } from '@angular/router';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-item-batch-details-for-patient-return',
  templateUrl: './item-batch-details-for-patient-return.component.html',
  styleUrls: ['./item-batch-details-for-patient-return.component.css']
})
export class ItemBatchDetailsForPatientReturnComponent implements OnInit {

  @Input('itemMasterList')
  itemMasterList: any;

  @Input('benRegId')
  benRegId: any;

  @Output() 
  resetBenDetails: EventEmitter<any> = new EventEmitter();

  itemReturnForm: FormGroup;

  batchList: any;
  selectedItemList = [];
  filterItemList = [];

  selectedBatchList = [];
  patientReturnList = [];

  searched: Boolean = false;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;
  hide: Boolean = false;
  constructor(private fb: FormBuilder,
    private dialog: MdDialog,
    private http_service: LanguageService,
    private inventoryService: InventoryService,
    private confirmationService: ConfirmationService, 
    private router: Router) { }

  ngOnInit() {
    this.itemReturnForm = this.createItemReturnForm();
    this.fetchLanguageResponse();
    if(this.itemMasterList.length > 0) {
      this.filterItemList = this.itemMasterList;
    }else {
      this.confirmationService.alert(this.currentLanguageSet.inventory.itemnotIssuedforthebeneficiary);
    }
    console.log("itemListttttt......", this.itemMasterList, this.benRegId);
  }

  createItemReturnForm() {
    return this.fb.group({
      itemName: null,
      batchList: new FormArray([])
    })
  }

  get itemName() {
    return this.itemReturnForm.controls['itemName'].value;
  }


  getBatchDetail(formvalue, editIndex: any) {
    let batchReq;
    let data;
    if (editIndex == null) {
      batchReq = {
        "benRegID": this.benRegId,
        "itemID": formvalue.itemID,
        "facilityID": localStorage.getItem('facilityID')

      }
      data = this.itemReturnForm.value
      console.log("Data if editIndex is null", data);
    } else {
      batchReq = {
        "benRegID": this.benRegId,
        "itemID": formvalue.itemName.itemID,
        "facilityID": localStorage.getItem('facilityID')
      }
      data = formvalue;
      console.log("Data if editIndex is not null", data);
    }
    this.inventoryService.getBatchDetails(batchReq).subscribe((response) => {
      console.log("Response of item batch list", response);
      if (response.statusCode == 200) {
        this.batchList = response.data;
        this.popOutBenAndItemDetails(this.batchList, data, editIndex);
      }
      console.log("Batchlist::", JSON.stringify(this.batchList, null, 4))
    })
  }

  popOutBenAndItemDetails(batchList: any, formvalue: any, editIndex: any) {
    console.warn(batchList);
    let itemName = formvalue.itemName;
    console.log("Itemmmmm", itemName);
    const mdDialogRef:
      MdDialogRef<PatientReturnBatchDetailsComponent>
      = this.dialog.open(PatientReturnBatchDetailsComponent, {
        // height: '90%',
        // width: '80%',
        panelClass: 'fit-screen',
        data: {
          batchList: batchList,
          editIndex: editIndex,
          editBatch: formvalue,
        },
        disableClose: false
      });
    mdDialogRef.afterClosed().subscribe((selectedBatchList) => {
      if (selectedBatchList) {
        if (editIndex != null) {
          this.selectedBatchList.splice(editIndex, 1);
          this.selectedBatchList.push(selectedBatchList.value);
          this.itemReturnForm.patchValue({
            itemName: null
          })
        } else {
          this.selectedBatchList.push(selectedBatchList.value);
          this.itemReturnForm.patchValue({
            itemName: null
          })
          const filterItemMasterList = this.filterItemList
          this.filterItem(itemName, filterItemMasterList);
        }
      } else {
        this.itemReturnForm.patchValue({
          itemName: null
        })
      }
    });
  }

  removeAddedItem(i) {

    let removedItem = this.selectedBatchList[i];
    this.filterItemList.push(removedItem.itemName);
    this.selectedBatchList.splice(i, 1);
  }

  filterItem(itemName, filterItemMasterList) {
    this.selectedItemList.push(itemName);
    console.log('selectedItemList', this.selectedItemList);
    this.filterItemList = [];
    this.filterItemList = filterItemMasterList.filter((item) => {
      if (itemName && itemName.itemName && itemName.itemName != null) {
        return itemName.itemName != item.itemName;
      }
    })
  }
  openSearchDialog() {
    const mdDialogRef: MdDialogRef<SearchComponent> = this.dialog.open(SearchComponent, {
      // height: '80%',
      // width: '80%',
      panelClass: 'fit-screen',
      disableClose: false
    });
  }
  editItem(item, i) {
    this.getBatchDetail(item, i)
  }

  manipulateFinalData() {
    let finalData = [];
    this.selectedBatchList.forEach((item) => {
      item.batchList.forEach((batch) => {
        let returnQuantity = batch.returnQuantity
        let createdBy = localStorage.getItem('userName')
        const batchNo = Object.assign(batch.batchNo, { returnQuantity, createdBy })
        finalData.push(batchNo)
      })
    })
    console.log('finalData',finalData);
    this.savePatientReturnBatch(finalData)
  }

  savePatientReturnBatch(finalData) {
    this.inventoryService.updateQuantityReturned(finalData).subscribe((response) => {
      if (response.statusCode == 200) {
        this.confirmationService.alert(response.data.response, 'success');
        this.resetFieldsAfterSubmit();
        this.resetBenDetails.emit(false);
      }
    })
  }

  resetFieldsAfterSubmit() {
    this.itemReturnForm.reset();
    this.selectedBatchList = [];
  }
  resetOnClear() {
    this.resetFieldsAfterSubmit();
    this.resetBenDetails.emit(false);
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
