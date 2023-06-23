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
  ViewPhysicalStockDetailsComponent
} from './view-physical-stock-details/view-physical-stock-details.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Location } from '@angular/common';
import { InventoryService } from '../../shared/service/inventory.service';
import { DataStorageService } from './../../shared/service/data-storage.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-view-physical-stock',
  templateUrl: './view-physical-stock.component.html',
  styleUrls: ['./view-physical-stock.component.css']
})
export class ViewPhysicalStockComponent implements OnInit {


  _minDate: any;
  _today: any;

  _dateRange: Date[] = [];
  _dateRangePrevious: Date[] = [];

  _stockEntryList = [];
  _filteredStockEntryList = [];
  blankTable = [1, 2, 3, 4, 5];
  filterTerm;

  searched: Boolean = false;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;
  

  constructor(
    private location: Location,
    private http_service: LanguageService,
    private inventoryService: InventoryService,
    private dataStorageService: DataStorageService,
    private dialog: MdDialog,
    private router: Router
  ) {


  }


  ngOnInit() {
    this.setDateDefault();
    this.fetchLanguageResponse();
    this.getPastEntries();
  }





  setDateDefault() {
    this._today = new Date();
    this._minDate = new Date();
    this._minDate.setFullYear(this._today.getFullYear() - 1);
    this._dateRange[0] = this._today;
    this._dateRange[1] = this._today;

    // const date = new Date(); // Now
    // date.setDate(date.getDate() - 30);
    // this._dateRange = [date, new Date()]
    console.log(this._dateRange, 'dateRange')
  }


  getPastEntries() {
    const obj = this.getViewServiceObject();
    this.inventoryService.viewPhysicalStockEntry(obj)
      .subscribe((res) => {
        this.loadEntries(res);
        this.searched = true;
      })

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
    this.getPastEntries();

    // }
  }


  loadEntries(entriesObject) {
    console.log(entriesObject);
    // if (entriesObject) {
    //   entriesObject.forEach(element => {
    //     element.createdDate  = moment(element.createdDate).utc().format('DD/MM/YYYY HH:mm') || 'Not Available'

    //   });
    // }
    this._stockEntryList = entriesObject;
    this._filteredStockEntryList = entriesObject;
    this.filterTerm = '';
  }




  filterConsumptionList(searchTerm: string) {
    if (!searchTerm)
      this._filteredStockEntryList = this._stockEntryList;
    else {
      this._filteredStockEntryList = [];
      this._stockEntryList.forEach((item) => {
        for (let key in item) {
          if (key == 'phyEntryID' || key == 'refNo' || key == 'status' || key == 'createdBy') {
            let value: string = '' + item[key];
            if (value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
              this._filteredStockEntryList.push(item); break;
            }
          }
        }
      });
    }
  }


  loadEntryDetails(entry) {
    if (entry && entry.phyEntryID) {
      this.inventoryService.getParticularStockEntry(entry.phyEntryID)
        .subscribe(res => this.popOutEntryDetails(entry, res))
    }
  }

  popOutEntryDetails(entry, stockEntryResponse) {
    console.warn(entry, stockEntryResponse)
    if (stockEntryResponse) {
      const mdDialogRef:
        MdDialogRef<ViewPhysicalStockDetailsComponent>
        = this.dialog.open(ViewPhysicalStockDetailsComponent, {
          // height: '90%',
          width: '80%',
          panelClass: 'fit-screen',
          data: { stockEntry: entry, entryDetails: stockEntryResponse },
          disableClose: false
        });
      mdDialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (result.print != null && result.print == true) {
            if (result.print) {
              const printableData = this.createPrintableData(entry, stockEntryResponse);
              this.dataStorageService.physicalStock = printableData;
              let uRL = 'physicalStock'
              this.router.navigate(['/inventory/dynamicPrint/', uRL])
            }
          }
        }
      });
    }
  }
  createPrintableData(entry, stockEntryResponse) {
    let facilityDetail = JSON.parse(localStorage.getItem('facilityDetail'))
    let facilityName = facilityDetail.facilityName
    let printableData = []
    let i = 0;
    console.log('stockEntryResponse', JSON.stringify(stockEntryResponse, null, 4))
    stockEntryResponse.forEach((batch) => {
      i = i + 1;
      let consumedBatch = {
        'sNo': i,
        'itemName': batch.item.itemName,
        'batchNo': batch.batchNo,
        'expiryDate': moment(batch.expiryDate).format('DD-MM-YYYY'),
        'qod': batch.quantity
      }
      printableData.push(consumedBatch);
    })
    console.log('consumptionDetails', JSON.stringify(entry, null, 4));
    let entryDetails = Object.assign({ facilityName: facilityName, createDate: moment(entry.createdDate).format('DD-MM-YYYY') }, entry)
    console.log('consumptionResponse', JSON.stringify(printableData, null, 4));
    let stockEntered = Object.assign({}, { title: this.title }, { headerColumn: this.headerColumn }, { headerDetail: entryDetails }, { columns: this.columns }, { printableData: printableData });
    return stockEntered;
  }
  goBack() {
    this.location.back();
  }

  preventTyping(e: any) {
    if (e.keyCode === 9) {
      return true;
    } else {
      return false;
    }
  }

  title = {
    modalTitle:'',
    headerTitle: 'Stock Entry Detail',
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
      "columnName": "Quantity"
    },
  ]
  headerColumn = [
    {
      columnName: 'Stock Entry ID :',
      keyName: 'phyEntryID',
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
