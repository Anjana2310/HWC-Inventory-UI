import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'app/app-modules/core/services';
import { InventoryService } from 'app/app-modules/inventory/shared/service/inventory.service';

@Component({
  selector: 'app-indent-order-worklist',
  templateUrl: './indent-order-worklist.component.html',
  styleUrls: ['./indent-order-worklist.component.css']
})
export class IndentOrderWorklistComponent implements OnInit {

  isMainStore: Boolean = false;
  mainFacilityID: any;

  constructor(
    private router: Router,
    private inventoryService: InventoryService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.showOrderWorklistBasedOnID();
  }

  showOrderWorklistBasedOnID() {
    this.isMainStore = JSON.parse(localStorage.getItem('facilityDetail')).isMainFacility;
    this.mainFacilityID = JSON.parse(localStorage.getItem('facilityDetail')).mainFacilityID;
    if (!this.isMainStore && (this.mainFacilityID != null || this.mainFacilityID != undefined)) {
      this.router.navigate(['inventory/subStoreIndentOrderWorklist']);
    }
    else if (this.isMainStore || (this.mainFacilityID != null || this.mainFacilityID != undefined)) {
      this.router.navigate(['/inventory/mainStoreIndentOrderWorklist']);
    }


  }
}
