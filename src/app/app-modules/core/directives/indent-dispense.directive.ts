import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';

import { NgControl, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ItemDispenseComponent } from './../components/item-dispense/item-dispense.component';

@Directive({
  selector: '[indentDispense]'
})
export class IndentDispenseDirective {

  @Input('stockForm')
  stockForm: FormGroup;

  @Input('indentDispenseList')
  indentDispenseList: any;

  @HostListener('keyup.enter') onKeyDown() {
    this.openDialog();
  }

  @HostListener('click') onClick() {
    if (this.el.nativeElement.nodeName != "INPUT")
      this.openDialog();
  }

  constructor(
    private el: ElementRef,
    private dialog: MdDialog) { }

  openDialog(): void {
    let searchTerm = this.stockForm.value.itemName;

    console.log("indent dispense directive form", this.stockForm);

  //   let dialogRef = this.dialog.open(ItemDispenseComponent, {
  //     // width: '80%',
  //     // height: '90%',
  //     panelClass: 'fit-screen',
  //     data: { searchTerm: searchTerm, indentDispenseList: this.indentDispenseList }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.stockForm.controls['itemName'].setValue(result.item.itemName);
  //       this.stockForm.controls['requestedQty'].setValue(result.requestedQty);
  //     }
  //   });
   }

}
