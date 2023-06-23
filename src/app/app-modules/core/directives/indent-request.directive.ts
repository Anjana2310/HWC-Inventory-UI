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