import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';

import { NgControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { TransferSearchComponent } from '../components/transfer-search/transfer-search.component';

@Directive({
  selector: '[appItemTransfer]'
})
export class ItemTransferDirective {
  @Input('previousSelected')
  addedStock: any;

  @Input('stockForm')
  stockForm: FormGroup;

  @HostListener('keydown.enter') onKeyDown() {
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
    const transferTo = this.stockForm.parent.parent.value.transferTo.facilityID;

    const dialogRef = this.dialog.open(TransferSearchComponent, {
      // width: '80%',
      // height: '90%',
      panelClass: 'fit-screen',
      data: { searchTerm: searchTerm, transferTo: transferTo, addedStock: this.addedStock }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let formArray = this.stockForm.parent as FormArray;
        let len = formArray.length;
        for (let i = len - 1, j = 0; i < len + result.length - 1; i++ , j++) {
          (<FormGroup>formArray.at(i)).controls['itemStockEntryID'].setValue(result[j].itemStockEntryID);
          (<FormGroup>formArray.at(i)).controls['batchNo'].setValue(result[j].batchNo);
          (<FormGroup>formArray.at(i)).controls['qoh'].setValue(result[j].quantityInHand);
          
          (<FormGroup>formArray.at(i)).controls['itemName'].setValue(result[j].item.itemName);
          (<FormGroup>formArray.at(i)).controls['itemName'].disable();
          (<FormGroup>formArray.at(i)).controls['quantity'].enable();
          (<FormGroup>formArray.at(i)).markAsDirty();

          if (formArray.length < len + result.length - 1)
            formArray.push(this.createItem());
        }
      }
    });
  }

  createItem() {
    return this.fb.group({
      batchNo: [null, Validators.required],
      itemStockEntryID: [null, Validators.required],
      itemName: [null, Validators.required],
      qoh: [null, Validators.required],
      quantity: [null, Validators.required]
    })
  }

}
