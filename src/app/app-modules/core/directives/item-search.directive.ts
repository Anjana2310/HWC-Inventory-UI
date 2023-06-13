import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ItemSearchComponent } from '../components/item-search/item-search.component';

@Directive({
  selector: '[appItemSearch]'
})
export class ItemSearchDirective {

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
    private dialog: MdDialog) { }

  openDialog(): void {
    let searchTerm = this.stockForm.value.itemName;
    let dialogRef = this.dialog.open(ItemSearchComponent, {
      // width: '80%',
      // height: '90%',
      panelClass: 'fit-screen',
      data: { searchTerm: searchTerm }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('result', result)
        this.stockForm.controls['itemName'].setValue(result.itemName);
        this.stockForm.controls['itemName'].disable();
        this.stockForm.controls['itemID'].setValue(result.itemID);

        if (this.stockForm.controls['isMedical'])
          this.stockForm.controls['isMedical'].setValue(result.isMedical);
        this.stockForm.markAsDirty();
      } else {
        // this.stockForm.control.parent.reset();
      }
    });
  }

}