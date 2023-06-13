import { Observable } from 'rxjs/Rx';
import { RxBatchViewComponent } from '../components/rx-batch-view/rx-batch-view.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class BatchViewService {

    constructor(private dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    }

    public batches(prescribed, items, selection): Observable<any> {
        let dialogRef: MdDialogRef<RxBatchViewComponent>;
        // const config = new MdDialogConfig();
        dialogRef = this.dialog.open(RxBatchViewComponent, {
            width: '80%',
            disableClose: false
        });
        dialogRef.componentInstance.prescribed = prescribed;
        dialogRef.componentInstance.items = items;
        dialogRef.componentInstance.editSelection = selection;

        return dialogRef.afterClosed();
    }


}
