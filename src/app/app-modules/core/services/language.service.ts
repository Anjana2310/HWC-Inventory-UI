import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LanguageService {

  constructor(private http : Http,private _http: HttpClient) { }

  language: any;
  appCurrentLanguge = new BehaviorSubject(this.language);
  currentLangugae$ = this.appCurrentLanguge.asObservable();

  fetchLanguageSet() {
      return this.http.get(environment.getLanguageList).map(res => res.json().data);
  }
  getLanguage(url: string){
    return this._http.get(url);
    
  }
  getCurrentLanguage(response){
    this.language = response;
    this.appCurrentLanguge.next(response) ;
  }
}
