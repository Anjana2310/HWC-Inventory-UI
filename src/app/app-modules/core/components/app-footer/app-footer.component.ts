import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { SetLanguageComponent } from '../set-language.component';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css']
})
export class AppFooterComponent implements OnInit {

  today:Date;
  year:any;
  status: boolean;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(public http_service:LanguageService) { }

  ngOnInit() {
    this.today = new Date();
    this.year = this.today.getFullYear();
    setInterval(() => {
      this.status = navigator.onLine;
    }, 1000);
    this.fetchLanguageResponse();
    // const languageSubscription = this.http_service.currentLangugae$.subscribe(response=>this.currentLanguageSet=response);
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
