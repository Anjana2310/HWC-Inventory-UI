import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';

import { NgControl } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { BatchSearchComponent } from '../components/batch-search/batch-search.component';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appBatchSearch]'
})
export class BatchSearchDirective {

  @Input('previousSelected')
  addedStock: any;

  @Input('stockForm')
  stockForm: FormGroup;

  @HostListener('keyup.enter') onKeyDown() {
    let searchTerm = this.stockForm.value.itemName;

    if (searchTerm.length >= 2)
      this.openDialog();
  }

  @HostListener('click') onClick() {
    if (this.el.nativeElement.nodeName != "INPUT")
      this.openDialog();
  }

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private dialog: MdDialog) { }

  openDialog(): void {
    let searchTerm = this.stockForm.value.itemName;

    let dialogRef = this.dialog.open(BatchSearchComponent, {
      // width: '80%',
      // height: '90%',
      panelClass: 'fit-screen',
      data: { searchTerm: searchTerm, addedStock: this.addedStock }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let formArray = this.stockForm.parent as FormArray;
        let len = formArray.length;

        console.log(formArray + " " + len);

        for (let i = len - 1, j = 0; i < len + result.length - 1; i++ , j++) {
          (<FormGroup>formArray.at(i)).controls['itemStockEntryID'].setValue(result[j].itemStockEntryID);
          (<FormGroup>formArray.at(i)).controls['batchNo'].setValue(result[j].batchNo);
          (<FormGroup>formArray.at(i)).controls['itemID'].setValue(result[j].item.itemID);
          (<FormGroup>formArray.at(i)).controls['itemName'].setValue(result[j].item.itemName);
          (<FormGroup>formArray.at(i)).controls['quantityInHand'].setValue(result[j].quantityInHand);
          (<FormGroup>formArray.at(i)).controls['itemName'].disable();
          (<FormGroup>formArray.at(i)).controls['quantity'].enable();
          (<FormGroup>formArray.at(i)).markAsDirty();

          if (formArray.length < len + result.length - 1)
            formArray.push(this.initDispensedStock());
        }
      }
    });
  }

  initDispensedStock() {
    return this.fb.group({
      itemStockEntryID: null,
      batchNo: [null, Validators.required],
      itemID: null,
      itemName: [null, Validators.required],
      quantityInHand: null,
      quantity: [null, Validators.required],
    });
  }

}