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
  selector: 'app-beneficiary-drug-issue-report',
  templateUrl: './beneficiary-drug-issue-report.component.html',
  styleUrls: ['./beneficiary-drug-issue-report.component.css']
})
export class BeneficiaryDrugIssueReportComponent implements OnInit {

  beneficiaryDrugIssueForm: FormGroup;
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
  beneficiaryDrugIssueList = [];
  dateOffset: any;

  ngOnInit() {
    this.createBeneficiaryDrugIssueForm();
    this.today = new Date();
    this.fetchLanguageResponse();

    this.dateOffset = (24 * 60 * 60 * 1000);
    // this.maxEndDate = new Date(this.today.setTime(this.today.getTime()));
    this.maxEndDate = new Date();
    this.maxEndDate.setDate(this.today.getDate() -1 );
  }

  createBeneficiaryDrugIssueForm() {
    this.beneficiaryDrugIssueForm = this.formBuilder.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    })
  }

  get startDate() {
    return this.beneficiaryDrugIssueForm.controls['startDate'].value;
  }

  get endDate() {
    return this.beneficiaryDrugIssueForm.controls['endDate'].value;
  }

  checkEndDate() {
    console.log('', this.startDate);

    if (this.endDate == null) {
      this.minEndDate = new Date(this.startDate);
      console.log("new Date(this.today.getDate() - 1);", new Date(this.today));
    } else {
      this.beneficiaryDrugIssueForm.patchValue({
        endDate: null
      })
      this.minEndDate = new Date(this.startDate);
    }
  }

  searchReport() {
    let startDate: Date = new Date(this.beneficiaryDrugIssueForm.value.startDate);
    let endDate: Date = new Date(this.beneficiaryDrugIssueForm.value.endDate);

    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(0);

    console.log("Data form value...", JSON.stringify(this.beneficiaryDrugIssueForm.value));
    let reqObjForBeneficiaryDrugIssueReport = {
      "startDate": new Date(startDate.valueOf() - 1 * startDate.getTimezoneOffset() * 60 * 1000),
      "endDate": new Date(endDate.valueOf() - 1 * endDate.getTimezoneOffset() * 60 * 1000),
    }
    console.log("Data form data", JSON.stringify(reqObjForBeneficiaryDrugIssueReport, null, 4));

    this.inventoryService.getBeneficiaryDrugIssueReports(reqObjForBeneficiaryDrugIssueReport).subscribe((response) => {
      console.log("Json data of response: ", JSON.stringify(response, null, 4));
      if (response.statusCode == 200) {
        this.beneficiaryDrugIssueList = response.data;
        this.getResponseOfSearchThenDo();
      }
    })
  }

  downloadReport(downloadFlag) {
    if (downloadFlag == true) {
      this.searchReport();
    }
  }

  getResponseOfSearchThenDo() {
    let criteria: any = [];
    criteria.push({ 'Filter_Name': 'Start_Date', 'value': this.startDate });
    criteria.push({ 'Filter_Name': 'End_Date', 'value': this.endDate });
    this.exportToxlsx(criteria);
  }
  exportToxlsx(criteria: any) {
    if (this.beneficiaryDrugIssueList.length > 0) {
      let array = this.beneficiaryDrugIssueList.filter(function (obj) {
        for (var key in obj) {
          if (obj[key] == null) {
            obj[key] = "";
          }
        }
        return obj;
      });
      if (array.length != 0) {
        var head = Object.keys(array[0]);
        console.log(" head", head);
        let wb_name = "Beneficiary Drug Issue Report";
        const criteria_worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(criteria);
        const report_worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.beneficiaryDrugIssueList, { header: (head) });

        // below code added to modify the headers

        let i = 65;    // starting from 65 since it is the ASCII code of 'A'.
        let count = 0;
        while (i < head.length + 65) {
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
          let newName = this.modifyHeader(head, i);
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
      this.confirmationService.alert(this.currentLanguageSet.inventory.beneficiaryDrugIssueReportdownloaded, 'success');
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
