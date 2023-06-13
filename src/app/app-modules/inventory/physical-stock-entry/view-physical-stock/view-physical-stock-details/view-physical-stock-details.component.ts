import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-physical-stock-details',
  templateUrl: './view-physical-stock-details.component.html',
  styleUrls: ['./view-physical-stock-details.component.css']
})
export class ViewPhysicalStockDetailsComponent implements OnInit, OnDestroy {


  _filterTerm = '';
  _detailedList = [];
  _filteredDetailedList = [];
  blankTable = [1, 2, 3, 4, 5];
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;
  

  constructor(
    private http_service: LanguageService,
    public dialogRef: MdDialogRef<ViewPhysicalStockDetailsComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.populateStockEntryItems(this.data);
    this.fetchLanguageResponse();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.data = '';

  }
  populateStockEntryItems(data) {
    console.log(data);
    if (data && data.entryDetails && data.stockEntry) {
      const entries = data.entryDetails;
      // entries.forEach(element => {
      //   element.createdDate  = moment(element.createdDate).format('DD-MM-YYYY HH:mm A') || 'Not Available'
      // });
      this._detailedList = entries;
      this._filteredDetailedList = entries;
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
          if (key != 'item') {
            if (key == 'batchNo' || key == 'quantity') {
              let value: string = '' + item[key];
              if (value.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0) {
                this._filteredDetailedList.push(item); break;
              }
            }
          }

          if (key == 'item') {
            let value: string = '' + item.item.itemName;
            if (value.toLowerCase().indexOf(filterTerm.toLowerCase()) >= 0) {
              this._filteredDetailedList.push(item); break;
            }
          }
        }
      });
    }
  }

  print() {
    this.closeViewModal();
  }

  closeViewModal(){
    const modalresult = Object.assign({print : true});
    this.dialogRef.close(modalresult);
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

