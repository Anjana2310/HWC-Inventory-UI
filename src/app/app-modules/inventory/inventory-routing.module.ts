import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkareaComponent } from './workarea/workarea.component';
import { MedicineDispenseComponent } from './medicine-dispense/medicine-dispense.component';
import { StoreSelfConsumptionComponent } from './store-self-consumption/store-self-consumption.component';
import { PhysicalStockEntryComponent } from './physical-stock-entry/physical-stock-entry.component';
import { StoreStockTransferComponent } from './store-stock-transfer/store-stock-transfer.component';
import { ViewStoreSelfConsumptionComponent } from './store-self-consumption/view-store-self-consumption/view-store-self-consumption.component';
import { ViewPhysicalStockComponent } from './physical-stock-entry/view-physical-stock/view-physical-stock.component';
import { ViewMedicineDispenseComponent } from './medicine-dispense/view-medicine-dispense/view-medicine-dispense.component';
import { ViewStoreStockTransferComponent } from './store-stock-transfer/view-store-stock-transfer/view-store-stock-transfer.component';
import { DynamicPrintComponent } from './dynamic-print/dynamic-print.component';

import { StoreStockAdjustmentComponent } from './store-stock-adjustment/store-stock-adjustment.component';
import { ViewStoreStockAdjustmentComponent } from './store-stock-adjustment/view-store-stock-adjustment/view-store-stock-adjustment.component';
import { ViewStoreStockAdjustmentDraftComponent } from './store-stock-adjustment/view-store-stock-adjustment-draft/view-store-stock-adjustment-draft.component'
import { PatientReturnComponent } from './patient-return/patient-return.component';
import { IndentOrderWorklistComponent } from './indent/indent-order-worklist/indent-order-worklist.component';
import { IndentRequestComponent } from './indent/indent-order-worklist/sub-store-indent-order-worklist/indent-request/indent-request.component';
import { MainStoreIndentOrderWorklistComponent } from './indent/indent-order-worklist/main-store-indent-order-worklist/main-store-indent-order-worklist.component';
import { SubStoreIndentOrderWorklistComponent } from './indent/indent-order-worklist/sub-store-indent-order-worklist/sub-store-indent-order-worklist.component';
import { IndentDispensesComponent } from './indent/indent-order-worklist/main-store-indent-order-worklist/indent-dispenses/indent-dispenses.component';
import { InwardStockReportComponent } from './reports/inward-stock-report/inward-stock-report.component';
import { ConsumptionReportComponent } from './reports/consumption-report/consumption-report.component';
import { ExpiryReportComponent } from './reports/expiry-report/expiry-report.component';
import { BeneficiaryDrugIssueReportComponent } from './reports/beneficiary-drug-issue-report/beneficiary-drug-issue-report.component';
import { DailyStockDetailsReportComponent } from './reports/daily-stock-details-report/daily-stock-details-report.component';
import { DailyStockSummaryReportComponent } from './reports/daily-stock-summary-report/daily-stock-summary-report.component';
import { MonthlyReportComponent } from './reports/monthly-report/monthly-report.component';
import { YearlyReportComponent} from './reports/yearly-report/yearly-report.component';
import { TransitReportComponent } from './reports/transit-report/transit-report.component';
import { ShortExpiryReportComponent } from './reports/short-expiry-report/short-expiry-report.component'; 
import { PatientReturnPreviousRecordComponent } from './patient-return/patient-return-previous-record/patient-return-previous-record.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: WorkareaComponent
      },
      {
        path: 'medicineDispense',
        component: MedicineDispenseComponent
      },
      {
        path: 'medicineDispense/View',
        component: ViewMedicineDispenseComponent
      },
      {
        path: 'storeSelfConsumption',
        component: StoreSelfConsumptionComponent
      }, {
        path: 'storeSelfConsumption/View',
        component: ViewStoreSelfConsumptionComponent
      },
      {
        path: 'physicalStockEntry',
        component: PhysicalStockEntryComponent
      },
      {
        path: 'physicalStockEntry/View',
        component: ViewPhysicalStockComponent
      },
      {
        path: 'storeStockTransfer',
        component: StoreStockTransferComponent
      },
      {
        path: 'storeStockTransfer/View',
        component: ViewStoreStockTransferComponent
      },
      {
        path: 'storeStockAdjustment',
        component: StoreStockAdjustmentComponent
      },
      {
        path: 'storeStockAdjustment/update/:draftID',
        component: StoreStockAdjustmentComponent
      },
      {
        path: 'storeStockAdjustment/view',
        component: ViewStoreStockAdjustmentComponent
      },
      {
        path: 'storeStockAdjustmentDraft/view',
        component: ViewStoreStockAdjustmentDraftComponent
      },
      {
        path : 'patientReturn',
        component : PatientReturnComponent
      },
      {
        path : 'patientReturn/previousRecord',
        component : PatientReturnPreviousRecordComponent
      },
      {
        path : 'indentOrderWorklist',
        component : IndentOrderWorklistComponent
      },
      {
        path : 'mainStoreIndentOrderWorklist',
        component : MainStoreIndentOrderWorklistComponent
      },
      {
        path : 'subStoreIndentOrderWorklist',
        component : SubStoreIndentOrderWorklistComponent
      },
      {
        path : 'mainStoreIndentDispenses/:toFacilityID/:indentID',
        component : IndentDispensesComponent
      },
      {
        path:'indentRequest',
        component:IndentRequestComponent
      },
      {
        path:'indentRequest/:indentID/:fromFacilityID',
        component:IndentRequestComponent
      },
      
      {
        path:'inwardStockReport',
        component:InwardStockReportComponent
      },
      {
        path:'consumptionReport',
        component:ConsumptionReportComponent
      },
      {
        path:'expiryReport',
        component:ExpiryReportComponent
      },
      {
        path:'beneficiaryDrugIssueReport',
        component:BeneficiaryDrugIssueReportComponent
      },
      {
        path:'dailyStockReportDetails',
        component:DailyStockDetailsReportComponent
      },
      {
        path:'dailyStockReportSummary',
        component:DailyStockSummaryReportComponent
      },
      {
        path:'monthlyReport',
        component:MonthlyReportComponent
      },
      {
        path:'yearlyReport',
        component:YearlyReportComponent
      },
      {
        path:'shortExpiryReport',
        component:ShortExpiryReportComponent
      },
      {
        path:'transitReport',
        component:TransitReportComponent
      }
    ]
  },
  {
    path: 'dynamicPrint/:printablePage',
    component: DynamicPrintComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
