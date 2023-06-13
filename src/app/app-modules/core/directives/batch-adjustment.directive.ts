import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';

import { NgControl } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { BatchAdjustmentComponent } from '../components/batch-adjustment/batch-adjustment.component';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appBatchAdjustment]'
})
export class BatchAdjustmentDirective {

  @Input('previousSelected')
  addedStock: any;

  @Input('stockForm')
  stockForm: FormGroup;

  @HostListener('keyup.enter') onKeyDown() {
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

    let dialogRef = this.dialog.open(BatchAdjustmentComponent, {
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
          (<FormGroup>formArray.at(i)).controls['batchID'].setValue(result[j].batchNo);
          (<FormGroup>formArray.at(i)).controls['itemID'].setValue(result[j].item.itemID);
          (<FormGroup>formArray.at(i)).controls['itemName'].setValue(result[j].item.itemName);
          (<FormGroup>formArray.at(i)).controls['quantityInHand'].setValue(result[j].quantityInHand);
          (<FormGroup>formArray.at(i)).controls['itemName'].disable();
          // (<FormGroup>formArray.at(i)).controls['quantity'].enable();
          (<FormGroup>formArray.at(i)).markAsDirty();

          if (formArray.length < len + result.length - 1)
            formArray.push(this.initStockAdjustmentList());
        }
      }
    });
  }

  initStockAdjustmentList() {
    return this.fb.group({
      itemStockEntryID: null,
      itemID: null,
      itemName: null,
      batchID: null,
      quantityInHand: null,
      adjustmentType: null,
      adjustedQuantity: null,
      qohAfterAdjustment: null,
      reason: null,
      deleted: false
    });
  }


}
