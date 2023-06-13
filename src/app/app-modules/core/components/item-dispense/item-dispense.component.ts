import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ItemSearchService } from '../../services/item-search.service';
import { ConfirmationService } from '../../services/confirmation.service';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SetLanguageComponent } from '../set-language.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-item-dispense',
  templateUrl: './item-dispense.component.html',
  styleUrls: ['./item-dispense.component.css']
})
export class ItemDispenseComponent implements OnInit {

  searchTerms: string;
  items$: Observable<any>;
  selectedItem = null;

  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public input: any,
    private itemSearchService: ItemSearchService,
    public http_service:LanguageService,
    public dialogRef: MdDialogRef<ItemDispenseComponent>,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.search(this.input.searchTerm);
    this.fetchLanguageResponse();
  }

  search(term: string): void {
    this.items$ = this.itemSearchService.getItemDetailsByName(term);
  }

  selectSelectedItem(selectedItem) {
    let dispenseItemList = this.input.dispenseItemList;

    let temp = dispenseItemList.filter((item) =>
      item.itemID == selectedItem.item.itemID);

    if (temp.length <= 0)
      this.dialogRef.close(selectedItem);
    else
      this.confirmationService.alert(this.currentLanguageSet.inventory.itemAdded);
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
