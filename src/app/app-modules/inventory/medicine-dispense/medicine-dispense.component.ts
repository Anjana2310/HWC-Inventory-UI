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
import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { InventoryService } from './../shared/service/inventory.service';
import { ConfirmationService } from './../../core/services/confirmation.service';
import { SearchComponent } from './../../core/components/search/search.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-medicine-dispense',
  templateUrl: './medicine-dispense.component.html',
  styleUrls: ['./medicine-dispense.component.css']
})
export class MedicineDispenseComponent implements OnInit, OnDestroy {
  beneficiaryDetailForm: FormGroup;
  beneficaryDetail: any;

  parentBenID: any;
  parentVisitID: any;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;
  constructor(private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private inventoryService: InventoryService,
    public http_service: LanguageService,
    private dialog: MdDialog,
  ) {
  }


  ngOnInit() {
    this.beneficiaryDetailForm = this.createBeneficiaryForm();
   //Parent App Calling
    this.checkParentVisits();
    this.fetchLanguageResponse();
  }

  ngOnDestroy() {
    sessionStorage.removeItem('parentBen')
    sessionStorage.removeItem('parentBenVisit')
  }

  createBeneficiaryForm() {
    return this.fb.group({
      medicineDispenseType: null,
      beneficiaryID: null,
      visitCode: null,
      visitID: null,
      beneficiaryName: null,
      beneficiaryAge: null,
      genderName: null,
      doctorName: null,
      reference: null,
      visitDate: null
    })
  }

  checkParentVisits() {
    this.parentBenID = sessionStorage.getItem('parentBen') === 'undefined' ? undefined : sessionStorage.getItem('parentBen');
    this.parentVisitID = sessionStorage.getItem('parentBenVisit') === 'undefined' ? undefined : sessionStorage.getItem('parentBenVisit');
    console.log(this.parentBenID, this.parentVisitID);

    if (this.parentBenID) { this.getParentBenVisits(); }

  }

  getParentBenVisits() {
    this.beneficiaryDetailForm.patchValue({
      beneficiaryID: this.parentBenID,
      medicineDispenseType: 'System'
    })

    this.inventoryService.getBeneficaryVisitDetail({
      'providerServiceMapID': localStorage.getItem('providerServiceID'),
      'beneficiaryID': this.beneficiaryID
    })
      .subscribe((response) => {
        console.log('response', response);
        if (response.statusCode == 200) {
          if (response.data.beneficiaryFlowStatus.length > 0) {
            this.beneficiaryVisitDetailList = response.data;
            console.log(this.beneficiaryVisitDetailList, 'lissss')
            this.beneficiaryDetail = response.data.beneficiaryFlowStatus;
            this.loadCurrentVisit(response.data.beneficiaryFlowStatus)
          } else {
            this.confirmationService.alert(this.currentLanguageSet.inventory.norecentvisitavailable);
          }
        } else {
          this.confirmationService.alert(response.errorMessage, 'error');
        }
      }, err => {
        this.confirmationService.alert(err, 'error');
      });


  }

  loadCurrentVisit(resp) {
    if (this.parentVisitID) {
    resp.forEach(element => {
      if (element.benVisitID == this.parentVisitID) {
        this.beneficiaryDetailForm.patchValue({
          visitCode: element
        })
        this.getVisitDetail();

      }
    });
  }

  }

  beneficiaryDetail: any;
  beneficiaryVisitDetailList: any;
  recentBeneficaryVisit: any;
  checkBeneficiary() {
    if (this.beneficiaryID == null) {
      this.nullifyBeneficiaryDetails();
    }

    if (this.beneficiaryID != null) {
      if (this.beneficiaryID.length != 12) {
        this.nullifyBeneficiaryDetails();
      }
      if (this.beneficiaryID.length == 12) {
        this.inventoryService.getBeneficaryVisitDetail({ "providerServiceMapID": localStorage.getItem('providerServiceID'), "beneficiaryID": this.beneficiaryID }).subscribe((response) => {
          console.log('response', response);
          if (response.statusCode == 200) {
            if (response.data.benVisitDetail.length > 0) {
              this.beneficiaryVisitDetailList = response.data
              this.beneficiaryDetail = response.data.beneficiaryFlowStatus;
            } else {
              this.confirmationService.alert(this.currentLanguageSet.inventory.norecentvisitavailable);
            }
          } else {
            this.confirmationService.alert(response.errorMessage, 'error');
          }
        }, err => {
          this.confirmationService.alert(err, 'error');
        });
      }
    }
    // 720088175112
  }
  openSearchDialog() {
    const mdDialogRef: MdDialogRef<SearchComponent> = this.dialog.open(SearchComponent, {
      // height: '80%',
      // width: '80%',
      panelClass: 'fit-screen',
      disableClose: false
    });

    mdDialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('something fishy happening here', result);
        this.beneficiaryDetailForm.patchValue({
          beneficiaryID: result
        })
        this.checkBeneficiary();
      }
    });
  }

  getVisitDetail() {
    console.log('this.visitCode', this.visitCode);
    if (this.visitCode != undefined || this.visitCode != null) {

      this.beneficiaryDetailForm.patchValue({
        beneficiaryName: this.visitCode.benName,
        beneficiaryAge: this.visitCode.ben_age_val,
        genderName: this.visitCode.genderName,
        doctorName: this.visitCode.agentId,
        visitDate: this.visitCode.visitDate,
        visitID: this.visitCode.benVisitID,
        reference: null,
        medicineDispenseType : 'System'
      })
      this.getBeneficiaryDetail();
    } else {
      this.nullifyBeneficiaryDetails();
    }
  }
  nullifyBeneficiaryDetails() {
    this.beneficiaryDetailForm.patchValue({
      medicineDispenseType: null,
      visitCode: null,
      visitDate: null,
      beneficiaryName: null,
      beneficiaryAge: null,
      genderName: null,
      doctorName: null,
      reference: null,
    })
  }

  getBeneficiaryDetail() {
    let facilityDetail = JSON.parse(localStorage.getItem('facilityDetail'))
    let facilityName = facilityDetail.facilityName
    console.log(' this.visitCode', this.visitCode);
    this.beneficaryDetail = {
      "age": this.visitCode.ben_age_val,
      "beneficiaryID": this.beneficiaryID,
      "benRegID": this.beneficiaryVisitDetailList.beneficiaryRegID,
      "createdBy": localStorage.getItem('username'),
      "providerServiceMapID": localStorage.getItem('providerServiceID'),
      "doctorName": this.visitCode.agentId,
      "facilityID": localStorage.getItem('facilityID'),
      "gender": this.visitCode.genderName,
      "issueType": this.medicineDispenseType,
      "patientName": this.visitCode.benName,
      "prescriptionID": null,
      "reference": this.reference,
      "visitID": this.visitCode.benVisitID,
      'visitCode': this.visitCode.benVisitCode,
      "facilityName": facilityName,
      "visitDate": this.visitCode.visitDate,
    }
  }

  get reference() {
    return this.beneficiaryDetailForm.controls['reference'].value;
  }
  get medicineDispenseType() {
    return this.beneficiaryDetailForm.controls['medicineDispenseType'].value;
  }

  get beneficiaryID() {
    return this.beneficiaryDetailForm.controls['beneficiaryID'].value;
  }

  get beneficiaryName() {
    return this.beneficiaryDetailForm.controls['beneficiaryName'].value;
  }

  get beneficiaryAge() {
    return this.beneficiaryDetailForm.controls['beneficiaryAge'].value;
  }

  get visitDate() {
    return this.beneficiaryDetailForm.controls['visitDate'].value;
  }

  get visitCode() {
    return this.beneficiaryDetailForm.controls['visitCode'].value;
  }

  resetBeneficiaryDetails(event) {
    console.log('event', event);
    this.beneficiaryDetailForm.reset();
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
