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
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import {
  ViewStoreSelfConsumptionDetailsComponent
} from './view-store-self-consumption-details/view-store-self-consumption-details.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

import { Location } from '@angular/common';
import { InventoryService } from '../../shared/service/inventory.service';
import { DataStorageService } from './../../shared/service/data-storage.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-view-store-self-consumption',
  templateUrl: './view-store-self-consumption.component.html',
  styleUrls: ['./view-store-self-consumption.component.css']
})
export class ViewStoreSelfConsumptionComponent implements OnInit {



  _minDate: any;
  _today: any;

  _dateRange: Date[] = [];
  _dateRangePrevious: Date[] = [];

  _consumptionList = [];
  _filteredConsumptionList = [];
  blankTable = [1, 2, 3, 4, 5];
  filterTerm;
  searched: Boolean = false;
  currentLanguageSet: any;
  languageComponent: SetLanguageComponent;

  constructor(
    private location: Location,
    private inventoryService: InventoryService,
    private dataStorageService: DataStorageService,
    private http_service: LanguageService,
    private dialog: MdDialog,
    private router: Router
  ) {


  }


  ngOnInit() {
    this.setDateDefault();
    this.fetchLanguageResponse();
    this.getPastConsumptions();
  }



  setDateDefault() {
    this._today = new Date();
    this._minDate = new Date();
    this._minDate.setFullYear(this._today.getFullYear() - 1);
    this._dateRange[0] = this._today;
    this._dateRange[1] = this._today;

    // const dateFrom = new Date();
    // dateFrom.setDate(dateFrom.getDate() - 30);

    // const dateTo = new Date();
    // dateTo.setDate(dateTo.getDate() + 1);

    // this._dateRange = [dateFrom, dateTo];
    console.log(this._dateRange, 'dateRange')
  }

  getPastConsumptions() {
    const obj = this.getViewServiceObject();
    this.inventoryService.viewSelfConsumption(obj)
      .subscribe((res) => {
        this.searched = true;
        this.loadConsumption(res);
      })
  }
  preventTyping(e: any) {
    if (e.keyCode === 9) {
      return true;
    } else {
      return false;
    }
  }

  getViewServiceObject() {
    let startDate: Date = new Date(this._dateRange[0]);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0)

    let endDate: Date = new Date(this._dateRange[1]);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(0);

    return {
      facilityID: localStorage.getItem('facilityID'),
      fromDate: new Date(startDate.valueOf() - 1 * startDate.getTimezoneOffset() * 60 * 1000),
      toDate: new Date(endDate.valueOf() - 1 * endDate.getTimezoneOffset() * 60 * 1000)
    }
  }

  updateDate() {
    // if (this._dateRange !== this._dateRangePrevious) {
    // this._dateRangePrevious = this._dateRange;
    // console.log(JSON.stringify(this._dateRange, null, 4), 'callservice');
    this.getPastConsumptions();

    // }
  }


  loadConsumption(consumptionObject) {
    console.log(consumptionObject);
    // if (consumptionObject) {
    //   consumptionObject.forEach(element => {
    //     element.createdDate = moment(element.createdDate).format('DD-MM-YYYY HH:mm A ') || 'Not Available'

    //   });
    // }
    this._consumptionList = consumptionObject;
    this._filteredConsumptionList = consumptionObject;
    this.filterTerm = '';
  }

  filterConsumptionList(searchTerm: string) {
    if (!searchTerm)
      this._filteredConsumptionList = this._consumptionList;
    else {
      this._filteredConsumptionList = [];
      this._consumptionList.forEach((item) => {
        for (let key in item) {
          if (key == 'consumptionID' || key == 'refNo' || key == 'reason' || key == 'createdBy') {
            let value: string = '' + item[key];
            if (value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
              this._filteredConsumptionList.push(item); break;
            }
          }
        }
      });
    }
  }


  loadConsumptionDetails(consumption) {
    if (consumption && consumption.consumptionID) {
      this.inventoryService.getParticularConsumption(consumption.consumptionID)
        .subscribe(res => this.popOutConsumption(consumption, res))
    }
  }

  popOutConsumption(consumptionDetails, consumptionResponse) {
    if (consumptionResponse) {
      const mdDialogRef:
        MdDialogRef<ViewStoreSelfConsumptionDetailsComponent>
        = this.dialog.open(ViewStoreSelfConsumptionDetailsComponent, {
          // height: '90%',
          width: '80%',
          panelClass: 'fit-screen',
          data: { consumptionDetails: consumptionDetails, consumptionItem: consumptionResponse },
          disableClose: false
        });
      mdDialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (result.print != null && result.print == true) {
            if (result.print) {
              const printableData = this.createPrintableData(consumptionDetails, consumptionResponse);
              this.dataStorageService.selfConsumption = printableData;
              let uRL = 'selfConsumption'
              this.router.navigate(['/inventory/dynamicPrint/', uRL])
            }
          }
        }
      });
    }
  }

  createPrintableData(consumptionDetails, consumptionResponse) {
    let facilityDetail = JSON.parse(localStorage.getItem('facilityDetail'))
    let facilityName = facilityDetail.facilityName
    let printableData = []
    let i = 0;
    consumptionResponse.forEach((batch) => {
      i = i + 1;
      let consumedBatch = {
        'sNo': i,
        'itemName': batch.itemName,
        'batchNo': batch.batchNo,
        'expiryDate': moment(batch.expiryDate).format('DD-MM-YYYY'),
        'qod': batch.quantity
      }
      printableData.push(consumedBatch);
    })
    console.log('consumptionDetails', JSON.stringify(consumptionDetails, null, 4));
    let consumptionDetail = Object.assign({ facilityName: facilityName, createDate: moment(consumptionDetails.createdDate).format('DD-MM-YYYY') }, consumptionDetails)
    console.log('consumptionResponse', JSON.stringify(printableData, null, 4));
    let consumedItem = Object.assign({}, { title: this.title }, { headerColumn: this.headerColumn }, { headerDetail: consumptionDetail }, { columns: this.columns }, { printableData: printableData });
    return consumedItem;
  }

  goBack() {
    this.location.back();
  }
  title = {
    modalTitle: '',
    headerTitle: 'Consumed Detail',
    tableTitle: ''
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
      columnName: 'Consumption ID :',
      keyName: 'consumptionID',
    },
    {
      columnName: 'Facility ID :',
      keyName: 'facilityID',
    },
    {
      columnName: 'Reference No :',
      keyName: 'refNo',
    },
    {
      columnName: 'Reason :',
      keyName: 'reason',
    },
    {
      columnName: 'Created By :',
      keyName: 'createdBy',
    },
    {
      columnName: 'Created Date :',
      keyName: 'createDate',
    }
  ]

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
