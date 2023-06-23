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
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-medicine-dispense-details',
  templateUrl: './view-medicine-dispense-details.component.html',
  styleUrls: ['./view-medicine-dispense-details.component.css']
})
export class ViewMedicineDispenseDetailsComponent implements OnInit, OnDestroy {

  _filterTerm = '';
  _detailedList = [];
  _filteredDetailedList = [];
  blankTable = [1, 2, 3, 4, 5];
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(public dialogRef: MdDialogRef<ViewMedicineDispenseDetailsComponent>,
    public http_service: LanguageService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.populateDispenseRecords(this.data);
    this.fetchLanguageResponse();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.data = '';

  }
  populateDispenseRecords(data) {
    if (data && data.dispenseItem && data.dispense) {
      this._detailedList = data.dispenseItem;
      this._filteredDetailedList = data.dispenseItem;
    }
  }


  filterDetails(filterTerm: string) {
    console.log(filterTerm)
    if (!filterTerm)
      this._filteredDetailedList = this._detailedList;
    else {
      this._filteredDetailedList = [];
      this._detailedList.forEach((item) => {
        for (let key in item) {
          if (key == 'batchNo' || key == 'itemName' || key == 'quantity') {
            let value: string = '' + item[key];
            if (value.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0) {
              this._filteredDetailedList.push(item); break;
            }
          }
        }
      });
    }
  }

  print() {
    const printableData = this.createPrintableData();
    console.log('printableData', JSON.stringify(printableData, null, 4));
    this.closeModal(printableData);
  }
  closeModal(printableData) {
    this.dialogRef.close(printableData);
  }

  createPrintableData() {
    let facilityDetail = JSON.parse(localStorage.getItem('facilityDetail'))
    let facilityName = facilityDetail.facilityName
    let printableData = []
    let i = 0;
    this.data.dispenseItem.forEach((dispenseItem) => {
      i = i + 1;
      let dispensedItem = {
        'sNo': i,
        'itemName': dispenseItem.itemName,
        'batchNo': dispenseItem.batchNo,
        'expiryDate': moment(dispenseItem.expiryDate).format('DD-MM-YYYY'),
        'qod': dispenseItem.quantity
      }
      printableData.push(dispensedItem);
    })

    let beneficiaryDetails = Object.assign({ facilityName: facilityName, visitedDate: moment(this.data.dispense.visitDate).format('DD-MM-YYYY') }, this.data.dispense, )
    let previousDispense = Object.assign({}, { title: this.title }, { headerColumn: this.headerColumn }, { headerDetail: beneficiaryDetails }, { columns: this.columns }, { printableData: printableData });
    return previousDispense;
  }

  title = {
    modalTitle: 'Previous Dispense',
    headerTitle: 'Dispense Detail',
    tableTitle: 'Dispensed Item'
  }

  columns = [
    {
      "keyName": "sNo",
      "columnName": "S No."
    },
    {
      "keyName": "itemName",
      "columnName": "Item Name"
    },
    {
      "keyName": "batchNo",
      "columnName": "Batch No"
    },
    {
      "keyName": "expiryDate",
      "columnName": "Expiry Date"
    },
    {
      "keyName": "qod",
      "columnName": "Qty dispensed"
    },
  ]

  headerColumn = [
    {
      columnName: 'Name :',
      keyName: 'patientName',
    },
    {
      columnName: 'Beneficiary ID :',
      keyName: 'beneficiaryID',
    },
    {
      columnName: 'Gender :',
      keyName: 'gender',
    },
    {
      columnName: 'Age :',
      keyName: 'age',
    },
    {
      columnName: 'Visit Code :',
      keyName: 'visitCode',
    },
    {
      columnName: 'Visit Date :',
      keyName: 'visitedDate',
    },
    {
      columnName: 'Doctor Name :',
      keyName: 'doctorName',
    },
    {
      columnName: 'Issued By :',
      keyName: 'createdBy',
    },
    {
      columnName: 'Reference :',
      keyName: 'reference',
    }
  ]

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
