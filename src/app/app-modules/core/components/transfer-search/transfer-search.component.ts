import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ItemSearchService } from '../../services/item-search.service';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { SetLanguageComponent } from '../set-language.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-transfer-search',
  templateUrl: './transfer-search.component.html',
  styleUrls: ['./transfer-search.component.css']
})
export class TransferSearchComponent implements OnInit {
  private searchTerms: string;
  items$: Observable<any>;
  selectedBatchList = [];
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public input: any,
    public dialogRef: MdDialogRef<TransferSearchComponent>,
    public http_service: LanguageService,
    private itemSearchService: ItemSearchService) { }

  ngOnInit() {
    this.search(this.input.searchTerm);
    this.fetchLanguageResponse();
  }

  search(term: string): void {
    this.items$ = this.itemSearchService.searchDrugItemforTransfer(term, this.input.transferTo);
  }

  selectBatch(event, batch) {
    if (event.checked) {
      this.selectedBatchList.push(batch);
      batch.selected = true;
    } else {
      let index = this.selectedBatchList.indexOf(batch);
      this.selectedBatchList.splice(index, 1);
      batch.selected = false;
    }
  }

  disableSelection(batch) {
    let addedStock = this.input.addedStock;
    let temp = addedStock.filter(stock => stock.itemStockEntryID == batch.itemStockEntryID);
    if (temp.length > 0)
      return true;
    else
      return false;
  }

  submitBatch() {
    this.dialogRef.close(this.selectedBatchList);
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
