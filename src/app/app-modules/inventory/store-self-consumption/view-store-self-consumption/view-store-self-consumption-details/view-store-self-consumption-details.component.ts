import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-view-store-self-consumption-details',
  templateUrl: './view-store-self-consumption-details.component.html',
  styleUrls: ['./view-store-self-consumption-details.component.css']
})
export class ViewStoreSelfConsumptionDetailsComponent implements OnInit, OnDestroy {


  _filterTerm = '';
  _detailedList = [];
  _filteredDetailedList = [];
  blankTable = [1, 2, 3, 4, 5];
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    private http_service: LanguageService,
    public dialogRef: MdDialogRef<ViewStoreSelfConsumptionDetailsComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.populateConsumedItems(this.data);
    this.fetchLanguageResponse();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.data = '';

  }
  populateConsumedItems(data) {
    if (data && data.consumptionItem && data.consumptionDetails) {
      this._detailedList = data.consumptionItem;
      this._filteredDetailedList = data.consumptionItem;
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
          if (key == 'batchNo' || key == 'itemName' || key == 'quantity') {
            let value: string = '' + item[key];
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
