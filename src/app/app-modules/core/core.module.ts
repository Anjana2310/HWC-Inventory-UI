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
import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { MaterialModule } from './material.module';
import { Md2Module } from 'md2';

import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { TextareaDialogComponent } from './components/textarea-dialog/textarea-dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { BeneficiaryDetailsComponent } from './components/beneficiary-details/beneficiary-details.component';

import { HttpInterceptor } from './services/http-interceptor.service';
import { SpinnerService } from './services/spinner.service';
import { ConfirmationService } from './services/confirmation.service';
import { BatchViewService } from './services/rx-batchview.service';
import { AuthGuard } from './services/auth-guard.service';
import { TextareaDialog } from './components/textarea-dialog/textarea-dialog.service';
import { CommonService } from './services/common-services.service';
import { GlobalErrorHandler } from './services/global-error-handler.service';

import { myEmail } from './directives/email/myEmail.directive';
import { myMobileNumber } from './directives/MobileNumber/myMobileNumber.directive';
import { myName } from './directives/name/myName.directive';
import { myPassword } from './directives/password/myPassword.directive';
import { StringValidator } from './directives/stringValidator.directive';
import { NumberValidator } from './directives/numberValidator.directive';
import { MinNumberValidator } from './directives/minNumberValidator.directive';
import { DisableFormControlDirective } from './directives/disableFormControl.directive';
import { NullDefaultValueDirective } from './directives/null-default-value.directive';

import { ItemSearchComponent } from './components/item-search/item-search.component';
import { ItemSearchDirective } from './directives/item-search.directive';
import { ItemTransferDirective } from './directives/item-transfer.directive';
import { ItemDispenseDirective } from './directives/item-dispense.directive';
import { TransferSearchComponent } from './components/transfer-search/transfer-search.component';
import { ItemDispenseComponent } from './components/item-dispense/item-dispense.component';
import { ItemSearchService } from './services/item-search.service';


import { BatchSearchComponent } from './components/batch-search/batch-search.component';
import { BatchSearchDirective } from './directives/batch-search.directive';
import { BatchSearchService } from './services/batch-search.service';
import { SearchComponent } from './components/search/search.component';
import { RxBatchViewComponent } from './components/rx-batch-view/rx-batch-view.component';
import { BeneficiaryDetailsService } from './services/beneficiary-details.service';

import { ISTDatePipe } from './pipes/ist-date.pipe';
import { BatchAdjustmentDirective } from './directives/batch-adjustment.directive';
import { BatchAdjustmentComponent } from './components/batch-adjustment/batch-adjustment.component';
import { IndentRequestDirective } from './directives/indent-request.directive';
import { IndentItemListComponent } from './components/indent-item-list/indent-item-list.component';
import { IndentDispenseDirective } from './directives/indent-dispense.directive';
import { ShowCommitAndVersionDetailsComponent } from './components/show-commit-and-version-details/show-commit-and-version-details.component'
import { HttpClientModule } from '@angular/common/http';
import { SetLanguageComponent } from './components/set-language.component';



import { LanguageService } from './services/language.service';



@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    Md2Module,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [
    CommonDialogComponent,
    TextareaDialogComponent,
    SpinnerComponent,
    AppFooterComponent,
    AppHeaderComponent,
    myEmail,
    myMobileNumber,
    SetLanguageComponent,
    myName,
    myPassword,
    StringValidator,
    NullDefaultValueDirective,
    NumberValidator,
    DisableFormControlDirective,
    ItemSearchComponent,
    ItemSearchDirective,
    MinNumberValidator,
    TransferSearchComponent,
    ItemTransferDirective,
    BatchSearchComponent,
    BatchSearchDirective,
    ItemDispenseDirective,
    ItemDispenseComponent,
    SearchComponent,
    SetLanguageComponent,
    ISTDatePipe,
    BatchAdjustmentDirective,
    BatchAdjustmentComponent,
    BeneficiaryDetailsComponent,
    RxBatchViewComponent,
    IndentRequestDirective,
    IndentItemListComponent,
    IndentDispenseDirective,
    ShowCommitAndVersionDetailsComponent
  ],
  exports: [
    MaterialModule,
    Md2Module,
    CommonDialogComponent,
    TextareaDialogComponent,
    SpinnerComponent,
    SetLanguageComponent,
    ReactiveFormsModule,
    AppFooterComponent,
    AppHeaderComponent,
    Ng2GoogleChartsModule,
    myEmail,
    SetLanguageComponent,
    myMobileNumber,
    myName,
    myPassword,
    DisableFormControlDirective,
    StringValidator,
    NumberValidator,
    MinNumberValidator,
    NullDefaultValueDirective,
    ItemSearchComponent,
    ItemSearchDirective,
    TransferSearchComponent,
    ItemTransferDirective,
    ItemDispenseDirective,
    BatchSearchComponent,
    BatchSearchDirective,
    ISTDatePipe,
    BatchAdjustmentComponent,
    BatchAdjustmentDirective,
    BeneficiaryDetailsComponent,
    IndentRequestDirective,
    IndentItemListComponent,
    IndentDispenseDirective,
    ShowCommitAndVersionDetailsComponent
  ],
  entryComponents: [
    CommonDialogComponent,
    ItemSearchComponent,
    TransferSearchComponent,
    BatchSearchComponent,
    BatchAdjustmentComponent,
    TextareaDialogComponent,
    ItemDispenseComponent,
    SpinnerComponent,
    SearchComponent,
    RxBatchViewComponent,
    IndentItemListComponent,
    ShowCommitAndVersionDetailsComponent
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ConfirmationService,
        BatchViewService,
        TextareaDialog,
        AuthGuard,
        SpinnerService,
        CommonService,
        ItemSearchService,
        BatchSearchService,
        BeneficiaryDetailsService,
        {
          provide: Http,
          useFactory: HttpInterceptorFactory,
          deps: [XHRBackend, RequestOptions, Router, SpinnerService, ConfirmationService]
        }
      ]
    };
  }

}

export function HttpInterceptorFactory(backend: XHRBackend, options: RequestOptions, router: Router, spinner: SpinnerService, confirmation: ConfirmationService, http_service: LanguageService) {
  return new HttpInterceptor(backend, options, router, spinner, confirmation, http_service);
}
