import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { LanguageService } from '../../services/language.service';
import { SetLanguageComponent } from '../set-language.component';

@Component({
  selector: 'app-textarea-dialog',
  templateUrl: './textarea-dialog.component.html',
  styleUrls: ['./textarea-dialog.component.css']
})
export class TextareaDialogComponent implements OnInit {
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    public dialogRef: MdDialogRef<TextareaDialogComponent>,
    public http_service: LanguageService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(result => {
      this.dialogRef.close(this.data.observations); 
    })
    this.fetchLanguageResponse();
  }

  // AV40085804 29/09/2021 Integrating Multilingual Functionality -----Start-----
  ngDoCheck() {
    this.fetchLanguageResponse();
  }

  fetchLanguageResponse() {
    this.languageComponent = new SetLanguageComponent(this.http_service);
    this.languageComponent.setLanguage();
    this.currentLanguageSet = this.languageComponent.currentLanguageObject;
  }
  // -----End------

}
