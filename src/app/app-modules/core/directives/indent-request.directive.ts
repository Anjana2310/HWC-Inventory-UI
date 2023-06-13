import { Directive, HostListener, Inject, Input, ElementRef } from '@angular/core';

import { NgControl } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { IndentItemListComponent } from '../components/indent-item-list/indent-item-list.component';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Directive({
    selector: '[appIndentRequest]'
})
export class IndentRequestDirective {

    @Input('previousSelected')
    addedIndent: any;

    @Input('itemListForm')
    itemListForm: FormGroup;

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
        let searchTerm = this.itemListForm.value.itemNameView;
        let dialogRef = this.dialog.open(IndentItemListComponent, {
             width: '80%',
    //   height: '90%',
            panelClass: 'fit-screen',
            data: { searchTerm: searchTerm, addedIndent: this.addedIndent }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let formArray = this.itemListForm.parent as FormArray;
                let len = formArray.length;
                for (let i = len - 1, j = 0; i < len + result.length - 1; i++ , j++) {
                    (<FormGroup>formArray.at(i)).controls['itemID'].setValue(result[j].itemID);
                    (<FormGroup>formArray.at(i)).controls['itemName'].setValue(result[j].itemName);
                    (<FormGroup>formArray.at(i)).controls['qOH'].setValue(result[j].qoh);
                    (<FormGroup>formArray.at(i)).controls['itemNameView'].setValue(result[j].itemName);
                    (<FormGroup>formArray.at(i)).controls['itemNameView'].disable();
                    (<FormGroup>formArray.at(i)).markAsDirty();

                    if (formArray.length < len + result.length - 1)
                        formArray.push(this.initIndentRequestList());
                }
            }
        });

    }
    initIndentRequestList() {
        return this.fb.group({
            itemID: null,
            itemName: null,
            itemNameView: null,
            qOH: null,
            requiredQty:null,
            remarks: null,
            deleted: false
        });
    }
}