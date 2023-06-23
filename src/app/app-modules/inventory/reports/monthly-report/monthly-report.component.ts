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
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';

import { InventoryService } from '../../shared/service/inventory.service';
import { ConfirmationService } from '../../../core/services/confirmation.service';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  monthlyForm: FormGroup;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private http_service: LanguageService,
    private confirmationService: ConfirmationService) { }

  today: Date;
  minEndDate: Date;
  maxDate: any;
  maxEndDate: Date;
  consumptionList = [];
  dateOffset: any;
  mm: any;
  years = [];
  yy: number;
  selectedFacilityName = JSON.parse(localStorage.getItem('facilityDetail')).facilityName;
  facilities = [this.selectedFacilityName, 'All'];
  //BU40088124 27/7/2022 Added Facility Name dropdown in reports 
  months = [
    { val: '0', name: 'Jan' },
    { val: '1', name: 'Feb' },
    { val: '2', name: 'Mar' },
    { val: '3', name: 'Apr' },
    { val: '4', name: 'May' },
    { val: '5', name: 'Jun' },
    { val: '6', name: 'Jul' },
    { val: '7', name: 'Aug' },
    { val: '8', name: 'Sep' },
    { val: '9', name: 'Oct' },
    { val: '10', name: 'Nov' },
    { val: '11', name: 'Dec' }
  ];
  ngOnInit() {
    this.createMonthlyForm();
    this.getMonth();
    this.getYear();
    this.fetchLanguageResponse();
    this.setSelectedFacility();
  }

  createMonthlyForm() {
    this.monthlyForm = this.formBuilder.group({
      month: [null, Validators.required],
      year: [null, Validators.required],
      facilityName:[null, Validators.required]
    })
  }

  getYear() {
    var today = new Date();
    this.yy = today.getFullYear();
    for (var i = this.yy; i >= (this.yy - 100); i--) {
      this.years.push(i);
    }
  }

  getMonth() {
    var today = new Date();
    this.mm = today.getMonth() + 1;
    if (this.mm < 10) {
      this.mm = '0' + this.mm
    }
  }

  get month() {
    return this.monthlyForm.controls['month'].value;
  }

  get year() {
    return this.monthlyForm.controls['year'].value;
  }

  searchReport() {

    console.log("Data form value...", JSON.stringify(this.monthlyForm.value));
    let reqObjForMonthlyReport = {
      "month": this.monthlyForm.value.month.val,
      "monthName": this.monthlyForm.value.month.name,
      "year": this.monthlyForm.value.year,
      "facilityID": this.monthlyForm.value.facilityName === 'All' ? null : localStorage.getItem('facilityID')
    }
    console.log("Data form data", JSON.stringify(reqObjForMonthlyReport, null, 4));

    this.inventoryService.getMonthlyReports(reqObjForMonthlyReport).subscribe((response) => {
      console.log("Json data of response: ", JSON.stringify(response, null, 4));
      if (response.statusCode == 200) {
        this.consumptionList = response.data;
        this.getResponseOfSearchThenDo();
      }
    })
  }
  setSelectedFacility() {
    this.monthlyForm.patchValue({ facilityName: this.selectedFacilityName });
  }

  downloadReport(downloadFlag) {
    if (downloadFlag == true) {
      this.searchReport();
    }
  }

  getResponseOfSearchThenDo() {
    let criteria: any = [];
    criteria.push({ 'Filter_Name': 'Month', 'value': this.month.name });
    criteria.push({ 'Filter_Name': 'Year', 'value': this.year });
    this.exportToxlsx(criteria);
  }
  exportToxlsx(criteria: any) {
    if (this.consumptionList.length > 0) {
      let headers = ['slNo', 'month', 'year', 'facilityName', 'itemName', 'itemCategory', 'batchNo', 'unitCostPrice', 'expiryDate', 'openingStock', 'quantityReceived', 'dispensedQuantity', 'adjustmentReceipt', 'adjustmentIssue', 'closingStock'];
      let array = this.consumptionList.filter(function (obj) {
        for (var key in obj) {
          if (obj[key] == null) {
            obj[key] = "";
          }
        }
        return obj;
      });
      if (array.length != 0) {
        // var head = Object.keys(array[0]);
        console.log(" head", headers);
        let wb_name = "Monthly Report";
        const criteria_worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(criteria);
        const report_worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.consumptionList, { header: (headers) });

        // below code added to modify the headers

        let i = 65;    // starting from 65 since it is the ASCII code of 'A'.
        let count = 0;
        while (i < headers.length + 65) {
          let j;
          if (count > 0) {
            j = i - (26 * count);
          }
          else {
            j = i;
          }
          let cellPosition = String.fromCharCode(j);
          let finalCellName: any;
          if (count == 0) {
            finalCellName = cellPosition + "1";
            console.log(finalCellName);
          }
          else {
            let newcellPosition = String.fromCharCode(64 + count);
            finalCellName = newcellPosition + cellPosition + "1";
            console.log(finalCellName);
          }
          let newName = this.modifyHeader(headers, i);
          delete report_worksheet[finalCellName].w; report_worksheet[finalCellName].v = newName;
          i++;
          if (i == 91 + (count * 26)) {
            // i = 65;
            count++;
          }
        }
        // --------end--------

        const workbook: XLSX.WorkBook = { Sheets: { 'Report': report_worksheet, 'Criteria': criteria_worksheet }, SheetNames: ['Criteria', 'Report'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: "array" });
        let blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, wb_name);
        }
        else {
          var link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute('visibility', 'hidden');
          link.download = wb_name.replace(/ /g, "_") + ".xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
      this.confirmationService.alert(this.currentLanguageSet.inventory.monthlyReportdownloaded, 'success');
    } else {
      this.confirmationService.alert(this.currentLanguageSet.inventory.norecordfound);
    }
  }

  modifyHeader(headers, i) {
    let modifiedHeader: String;
    modifiedHeader = headers[i - 65].toString().replace(/([A-Z])/g, ' $1').trim();
    modifiedHeader = modifiedHeader.charAt(0).toUpperCase() + modifiedHeader.substr(1);
    //console.log(modifiedHeader);
    return modifiedHeader.replace(/I D/g, "ID");
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
