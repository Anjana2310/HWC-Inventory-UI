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
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiaryDetailsService } from '../../core/services/beneficiary-details.service';
import { PrescribedDrugService } from './../shared/service/prescribed-drug.service';
import { ConfirmationService } from '../../core/services/confirmation.service';
import 'rxjs/Rx';
import { LanguageService } from '../../core/services/language.service';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';

@Component({
  selector: 'app-rx-dashboard',
  templateUrl: './rx-dashboard.component.html',
  styleUrls: ['./rx-dashboard.component.css']
})
export class RxDashboardComponent implements OnInit {

  @ViewChild('prescribedList') public prescribedList;

  visitCode: any;
  today: any;
  beneficiaryDetailsSubscription: any;
  prescription: any;
  dispensed: any;
  issueType: Number = 1;
  beneficiary: any;
  username: any;
  // issueType 0 means Manual and 1 means System
  benRegID: any;
  parent_url: any;
  languageComponent: SetLanguageComponent;

  currentLanguageSet: any;
  constructor(
    private route: ActivatedRoute,
    private beneficiaryDetailsService: BeneficiaryDetailsService,
    private prescribedDrugService: PrescribedDrugService,
    private confirmationService: ConfirmationService,
    private http_service : LanguageService,
  ) { }

  ngOnInit() {
    this.fetchLanguageResponse();
    this.parent_url = sessionStorage.getItem('return');
    this.username = localStorage.getItem('username');
    this.getBenDetails();
    this.getPrescriptionDetails();
  }

  getBenDetails() {
    this.visitCode = sessionStorage.getItem('parentBenVisit');
    this.today = new Date();
    this.route.params.subscribe(param => {
      this.benRegID = param['beneficiaryRegID'];
      this.beneficiaryDetailsService.getBeneficiaryDetails(this.benRegID, localStorage.getItem('benFlowID'));
      this.beneficiaryDetailsSubscription = this.beneficiaryDetailsService.beneficiaryDetails$
        .subscribe(res => {
          if (res != null) {
            if (res.serviceDate) {
              this.beneficiary = res;
              this.today = res.serviceDate;
            }
          }
        });
    });
  }

  sideNavModeChange(sidenav) {
    const deviceHeight = window.screen.height;
    const deviceWidth = window.screen.width;

    if (deviceWidth < 700) {
      sidenav.mode = 'over';
    } else {
      sidenav.mode = 'side';
    }
    sidenav.toggle();
  }

  getPrescriptionDetails() {
    const visitCode = sessionStorage.getItem('parentBenVisit');
    const facilityID = localStorage.getItem('facilityID');
    const beneficiaryRegID = this.benRegID;
    this.prescribedDrugService.getPrescription({ visitCode, facilityID, beneficiaryRegID })
      .subscribe((res) => {
        if (res.data && res.statusCode == 200) {
          console.log(res);
          this.prescription = res.data || undefined;
        } else {
          this.confirmationService.alert(this.currentLanguageSet.inventory.errorinFetchingData, 'warn');
        }
      }, (err) => {

      })

  }


  submitForm(prescriptionForm): void {
    this.confirmationService.confirm('Confirmation', this.currentLanguageSet.alerts.confirmtoProceedFurther)
      .subscribe(res => {
        if (res) {

          this.saveDispense(prescriptionForm);
        }

        // console.log(JSON.stringify(prescription, null, 4));
      });
  }

  saveDispense(prescriptionForm) {
    const prescription = prescriptionForm.value;
    const reqObj = this.getSubmitObject(prescription);
    return this.prescribedDrugService.saveStockExit(reqObj)
    .subscribe((res) => {
      if (res.statusCode == 200) {
          // this.confirmationService.confirm('info', 'Items Dispensed').subscribe(
            // () => {
              let language = localStorage.getItem('currentLanguage');
              window.location.href = `${this.parent_url}?resolve=Y&currentLanguage=${language}`;
            // }
          // );
      } else {
        this.confirmationService.alert(res.errorMessage, 'warn');

      }
    })
  }

  getSubmitObject(prescription) {
    const facilityID = JSON.parse(localStorage.getItem('facilityDetail')).facilityID;
    const facilityName = JSON.parse(localStorage.getItem('facilityDetail')).facilityName;
    const visitCode = this.visitCode;
    const beneficiary = this.beneficiary;
    const issuedBy = sessionStorage.getItem('host') ? sessionStorage.getItem('host') : 'STORE';
    const itemStockExit = this.getBatchObj(prescription.itemList);
    const reqObj = {
      issuedBy,
      itemStockExit,
      visitCode,
      facilityID,
      facilityName,
      age: beneficiary.ageVal,
      beneficiaryID: beneficiary.beneficiaryID,
      benRegID: beneficiary.beneficiaryRegID,
      createdBy: this.username,
      providerServiceMapID: localStorage.getItem('providerServiceID'),
      doctorName: prescription.consultantName,
      gender:  beneficiary.genderName,
      issueType: this.issueType == 0 ? 'Manual' : 'System',
      patientName: beneficiary.beneficiaryName,
      prescriptionID: prescription.prescriptionID,
      reference: `Prescribed by  ${prescription.consultantName} from ${sessionStorage.getItem('host')}`,
      visitID: beneficiary.benVisitID,
      visitDate: beneficiary.serviceDate
    }
    return reqObj;
  }

  getBatchObj(itemList) {
    const items = [];
    itemList.forEach(item => {
      item.batchList.forEach(batch => {
        items.push({
          itemID: item.drugID,
          itemStockEntryID: batch.itemStockEntryID,
          quantity: batch.quantity,
          createdBy: this.username
        })
      })
    })
    return items;
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
