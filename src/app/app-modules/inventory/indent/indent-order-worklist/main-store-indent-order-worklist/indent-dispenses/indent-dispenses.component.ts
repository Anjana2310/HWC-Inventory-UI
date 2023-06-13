import { Component, OnInit, Input } from '@angular/core';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-indent-dispenses',
  templateUrl: './indent-dispenses.component.html',
  styleUrls: ['./indent-dispenses.component.css']
})
export class IndentDispensesComponent implements OnInit {

  issueType: Number = 0;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(public http_service:LanguageService) {
   }

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
