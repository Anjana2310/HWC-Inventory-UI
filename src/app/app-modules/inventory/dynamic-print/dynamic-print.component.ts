import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './../shared/service/data-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { LanguageService } from 'app/app-modules/core/services/language.service';

@Component({
  selector: 'app-dynamic-print',
  templateUrl: './dynamic-print.component.html',
  styleUrls: ['./dynamic-print.component.css']
})
export class DynamicPrintComponent implements OnInit {
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    private dataStorageService: DataStorageService, 
    private router: Router,
    private http_service: LanguageService,
    private route: ActivatedRoute, 
    private location: Location) { }

  printableData: any;
  columnList = [];
  fieldData = [];
  headerColumn = [];
  headerDetail: any;
  facilityDetail: any;
  title: any;
  today: Date;

  ngOnInit() {
    this.today = new Date();
    this.fetchLanguageResponse();
    let dataStore = this.route.snapshot.params['printablePage'];
    console.log('dataStore', dataStore);

    this.printableData = this.dataStorageService[dataStore];
    console.log('printableData', JSON.stringify(this.printableData, null, 4));
    this.title = this.printableData.title;
    this.headerDetail = this.printableData.headerDetail
    this.columnList = this.printableData.columns
    this.fieldData = this.printableData.printableData
    this.headerColumn = this.printableData.headerColumn
  }

  goBack() {
    this.location.back();
  }

  downloadList() {
    window.print();
  }

  goToTop() {
    window.scrollTo(0, 0);
  }

  //AN40085822 29/9/2021 Integrating Multilingual Functionality --Start--
  ngDoCheck(){
    this.fetchLanguageResponse();
  }

  fetchLanguageResponse() {
    this.languageComponent = new SetLanguageComponent(this.http_service);
    this.languageComponent.setLanguage();
    this.currentLanguageSet = this.languageComponent.currentLanguageObject; 
  }
  //--End--
}
