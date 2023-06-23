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
