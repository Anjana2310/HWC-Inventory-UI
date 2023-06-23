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
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';

@Injectable()
export class InventoryService {

  constructor(private http: Http) { }

  getAvailableItemInStore() {
    let storeID = localStorage.getItem('facilityID');
    console.log('this.itemInStore', storeID)
    return this.http.post(environment.getAvailableItemInStoreUrl + storeID, {})
      .map(res => res.json());
  }
  getBeneficaryVisitDetail(beneficiaryID) {
    return this.http.post(environment.getBeneficaryVisitDetailsurl, beneficiaryID)
      .map(res => res.json());
  }

  saveStockExit(dispensingItem) {
    return this.http.post(environment.saveStockExitUrl, dispensingItem)
      .map(res => res.json());
  }

  allocateBatch(itemList) {
    return this.http.post(environment.allocateBatchStockUrl + localStorage.getItem('facilityID'), itemList)
      .map(res => res.json());
  }

  getItemBatchList(itemDetail) {
    return this.http.post(environment.getItemBatchListUrl, itemDetail)
      .map(res => res.json());
  }


  getStoreItemsCall(facID) {
    return this.http.post(environment.getStoreItems + facID, {}).map(res => res.json().data)
      .catch(this.handleError);
  }

  getItemBatchForStoreIDCall(itemID, facID) {
    return this.http.post(environment.getItemBatchForStoreID, {
      "facilityID": facID,
      "itemID": itemID
    }).map(res => res.json().data)
      .catch(this.handleError);
  }

  getItem(obj) {
    return this.http.post(environment.getItem_Url, obj
    ).map(res => res.json().data)
      .catch(this.handleError);
  }


  /**
   * Related To Store Consumption
   * */
  storeSelfConsumption(obj) {
    return this.http.post(environment.storeSelfConsumption, obj
    ).map(res => res.json())
      .catch(this.handleError);
  }
  viewSelfConsumption(obj) {
    return this.http.post(environment.viewSelfConsumption, obj)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getParticularConsumption(consumptionID) {
    return this.http.post(environment.getParticularConsumptionURL, { 'consumptionID': consumptionID })
      .map(res => res.json().data)
      .catch(this.handleError);
  }


  /**
   * Related To Store Consumption  -- ENDS
   * */


  /**
   * Related to Physical Stock Entry
   */
  savePhysicalStock(obj) {
    return this.http.post(environment.savePhysicalStock_Url, obj)
      .map(res => res.json())
      .catch(this.handleError);
  }

  viewPhysicalStockEntry(obj) {
    return this.http.post(environment.viewPhysicalStockURL, obj)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getParticularStockEntry(entryID) {
    return this.http.post(environment.getParticularStockURL, { 'phyEntryID': entryID })
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  /**
 * Related to Physical Stock Entry -- ENDS
 */


  /**
   * Related to Medicine Dispense
   */
  viewMedicineDispenseEntry(obj) {
    return this.http.post(environment.viewMedicineDispenceURL, obj)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getParticularMedicineDispenseEntry(patientIssueID) {
    return this.http.post(environment.getParticularMedicineDispenseURL, { 'patientIssueID': patientIssueID })
      .map(res => res.json().data)
      .catch(this.handleError);
  }
  /**
   * Related to Medicine Dispense -- ENDS
   */

  /**
   * Related to Stock Transfer
   */

  saveStockTransfer(obj) {
    return this.http.post(environment.saveStoreTransferUrl, obj)
      .map(res => res.json().data)
      .catch(this.handleError);

  }

  viewStockTransferEntry(obj) {
    return this.http.post(environment.viewStockTransferURL, obj)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getParticularStockTransferEntry(stockTransferID) {
    return this.http.post(environment.getParticularStockTransferURL, { 'stockTransferID': stockTransferID })
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  /**
  * Related to Stock Transfer -- ENDS
  */

  getAllStore(serviceProviderId) {
    return this.http.post(environment.getFacilityUrl + serviceProviderId, {}
    ).map(res => res.json().data)
      .catch(this.handleError);
  }


  saveStockAdjustmentDraft(stockAdjustment) {
    return this.http.post(environment.saveStockAdjustmentDraftUrl, stockAdjustment)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  saveStockAdjustment(stockAdjustment) {
    return this.http.post(environment.saveStockAdjustmentUrl, stockAdjustment)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getStockAdjustmentDraftList(fetchDetails) {
    return this.http.post(environment.getStockAjustmentDraftList, fetchDetails)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getStockAdjustmentList(fetchDetails) {
    return this.http.post(environment.getStockAjustmentList, fetchDetails)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getStockAdjustmentDraftDetails(stockAdjustmentDraftID) {
    return this.http.post(environment.getStockAjustmentDraftDetails, { stockAdjustmentDraftID })
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  getStockAdjustmentDetails(stockAdjustmentID) {
    return this.http.post(environment.getStockAjustmentDetails, { stockAdjustmentID })
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  /**
 * Related to Patient Return -- STARTS
 */

  getBeneficiaryByPhoneNumber(obj) {
    return this.http.post(environment.getBeneficiaryByPhoneNumberUrl, obj
    ).map(res => res.json())
      .catch(this.handleError);
  }

  getBeneficiaryByBeneficiaryID(obj) {
    return this.http.post(environment.getBeneficiaryByBeneficiaryIDUrl, obj
    ).map(res => res.json())
      .catch(this.handleError);
  }

  getItemList(obj) {
    return this.http.post(environment.getItemListUrl, obj
    ).map(res => res.json())
      .catch(this.handleError);
  }

  getBatchDetails(obj) {
    return this.http.post(environment.getBatchListUrl, obj
    ).map(res => res.json())
      .catch(this.handleError);
  }

  updateQuantityReturned(obj) {
    return this.http.post(environment.getUpdateQuantityReturnedUrl, obj
    ).map(res => res.json())
      .catch(this.handleError);
  }

  getPatientReturnList(obj) {
    return this.http.post(environment.getPatientReturnListUrl, obj
      ).map(res => res.json())
        .catch(this.handleError);
  }
  /**
   *
   * Errrrorororororoor
   *
   */
  handleError(error: Response | any) {
    return Observable.throw(error.json());
  }

  /*
  * Related to Indent Request
  */
  saveIndentRequest(tempObj) {
    return this.http.post(environment.saveIndentRequestUrl, tempObj)
      .map(res => res.json())
      .catch(this.handleError);
  }
  showMainstoreOrderWorklist(facilityID) {
    return this.http.post(environment.showMainStoreIndentRequestUrl, facilityID)
      .map(res => res.json())
      .catch(this.handleError);
  }

  viewItemListForMainStore(itemList) {
    return this.http.post(environment.viewItemListForMainStoreUrl, itemList)
      .map(res => res.json())
      .catch(this.handleError);
  }
  viewBatchlistForIndentItem(batchlistObj) {
    return this.http.post(environment.getItemBatchListUrl, batchlistObj)
      .map(res => res.json())
      .catch(this.handleError);
  }
  rejectIndentOrder(rejectIndent) {
    return this.http.post(environment.getSaveDispenseListUrl, rejectIndent)
    .map(res => res.json())
    .catch(this.handleError);
  }
  /**
   * Related to indent dispense
   */
  saveDispenseList(itemListObj) {
    return this.http.post(environment.getSaveDispenseListUrl, itemListObj)
      .map(res => res.json())
      .catch(this.handleError);
  }
  /*
 * Related to sub store
 */
  showSubStoreOrderWorklist(facilityID) {
    return this.http.post(environment.showSubStoreIndentRequestUrl, facilityID)
      .map(res => res.json())
      .catch(this.handleError);
  }
  cancelIndentRequest(cancelIndent) {
    return this.http.post(environment.cancelIndentRequestUrl, cancelIndent)
      .map(res => res.json())
      .catch(this.handleError);
  }
  viewItemListForSubStore(itemList) {
    return this.http.post(environment.viewItemListForSubStoreUrl, itemList)
      .map(res => res.json())
      .catch(this.handleError);
  }
  receiveIndentOrder(acceptOrderObj) {
    return this.http.post(environment.receiveIndentOrderUrl, acceptOrderObj)
      .map(res => res.json())
      .catch(this.handleError);
  }
  updateIndentRequest(updateTempObj) {
    return this.http.post(environment.updateIndentOrderUrl, updateTempObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  /**
   * Reports
   */
  getInwardStockReports(inwardStockReportObj) {
    return this.http.post(environment.inwardStockReportUrl, inwardStockReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getConsumptionReports(consumptionReportObj) {
    return this.http.post(environment.consumptionReportUrl, consumptionReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getExpiryReports(expiryReportObj) {
    return this.http.post(environment.expiryReportUrl, expiryReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getBeneficiaryDrugIssueReports(beneficiaryDrugIssueReportObj) {
    return this.http.post(environment.beneficiaryDrugIssueReportUrl, beneficiaryDrugIssueReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getDailyStockDetailsReports(dailyStockDetailsReportObj) {
    return this.http.post(environment.dailyStockDetailsReportUrl, dailyStockDetailsReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getDailyStockSummaryReports(dailyStockSummaryReportObj) {
    return this.http.post(environment.dailyStockSummaryReportUrl, dailyStockSummaryReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getMonthlyReports(monthlyReportObj) {
    return this.http.post(environment.monthlyReportUrl, monthlyReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getYearlyReports(yearlyReportObj) {
    return this.http.post(environment.yearlyReportUrl, yearlyReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getShortExpiryReports(shortExpiryReportObj) {
    return this.http.post(environment.shortExpiryReportUrl, shortExpiryReportObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  getTransitReports(transitReportReqObj) {
    return this.http.post(environment.transitReportUrl, transitReportReqObj)
    .map(res => res.json())
    .catch(this.handleError);
  }

  addEAushadhiItemsToAmrit(facilityID) {
    return this.http.post(environment.eAushadhiStockAdditionUrl, facilityID)
    .map(res => res.json());
  }

  showLastUpdatedStockLogs(facilityID) {
    return this.http.post(environment.lastUpdatedStockLogUrl, facilityID)
    .map((res) => res.json());
  }
}
