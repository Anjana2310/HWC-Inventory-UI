import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { LanguageService } from '../../services/language.service';
import { SetLanguageComponent } from '../set-language.component';

@Component({
  selector: 'app-show-commit-and-version-details',
  templateUrl: './show-commit-and-version-details.component.html',
  styleUrls: ['./show-commit-and-version-details.component.css']
})
export class ShowCommitAndVersionDetailsComponent implements OnInit {
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(@Inject(MD_DIALOG_DATA) public input: any,
    public http_service: LanguageService,
    public dialogRef: MdDialogRef<ShowCommitAndVersionDetailsComponent>,) { }

  ngOnInit() {
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
