// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// @Injectable()
// export class IndentDispenseService {

//     private mainStoreRequest = new Subject<string>();
//     private indentDispenseAllocation = new Subject<string>();

//     mainStoreRequest$ = this.mainStoreRequest.asObservable();
//     indentDispenseAllocation$ = this.indentDispenseAllocation.asObservable();

//     // Service message commands
//     mainStoreIndentRequest(indentRequest: string) {
//         this.mainStoreRequest.next(indentRequest);
//     }

//     indentAllocateBasedOnBatch(indentAllocate: string) {
//         this.indentDispenseAllocation.next(indentAllocate);
//     }
// }