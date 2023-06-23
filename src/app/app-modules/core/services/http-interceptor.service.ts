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
import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers, Request } from '@angular/http';

import { SpinnerService } from './spinner.service';
import { ConfirmationService } from './confirmation.service';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SetLanguageComponent } from '../components/set-language.component';
import { LanguageService } from './language.service';

@Injectable()
export class HttpInterceptor extends Http {

  timerRef: any;
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private router: Router,
    private spinnerService: SpinnerService,
    private confirmationService: ConfirmationService,
    public http_service:LanguageService) {

    super(backend, defaultOptions);
  }

  ngOnInit() {
    this.fetchLanguageResponse();
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    url = this.beforeRequest(url);
    return super.get(url, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(url,res);
      }, (error: any) => {
        this.onError(error);
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    url = this.beforeRequest(url);
    return super.post(url, body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(url,res);
      }, (error: any) => {
        this.onError(error);
      });
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('key')
      });
    }
    return options;
  }

  private beforeRequest(url, body?: any): string {
    console.log("loading............");
    this.spinnerService.show();
    if (sessionStorage.getItem('apimanClientKey'))
      return url + `?apiKey=${sessionStorage.getItem('apimanClientKey')}`;
    return url;
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    console.log("API error", error);
    return Observable.throw(new Error("API not available"));
  }

  private onSuccess(url,res: Response): void {
    console.log("success............");
    let data = res.json();
    console.log("here", Date());

    setTimeout(() => this.spinnerService.hide(), 500);

    if (this.timerRef)
      clearTimeout(this.timerRef);
    if (sessionStorage.getItem('isExternal') && !localStorage.getItem('facilityDetail')) {
      this.spinnerService.clear();
    } else if (data.statusCode == 5002 && url.indexOf("user/userAuthenticate") < 0) {
      sessionStorage.clear();
      this.spinnerService.clear();
      setTimeout(() => this.router.navigate(["/login"]), 0);
      this.confirmationService.alert(data.errorMessage, "error");
    } else {
      this.startTimer();
    }
  }

  private onError(error: any): void {
    console.log("error", error);
    this.spinnerService.clear();
  }

  startTimer() {
    this.timerRef = setTimeout(() => {
      console.log("there", Date());

      if (sessionStorage.getItem('key') && sessionStorage.getItem('isAuthenticated')) {
        this.confirmationService.startTimer("Want to continue your session ?", "Your session is going to expire", 120)
          .subscribe(result => {
            const external = sessionStorage.getItem('isExternal');
            const parentLogin = sessionStorage.getItem('parentLogin');

            if (result.action == 'continue') {
              this.get(environment.extendSessionUrl).subscribe(res => { }, err => { });
            } else if (result.action == 'timeout') {
              clearTimeout(this.timerRef);
              sessionStorage.clear();
              this.confirmationService.alert(this.currentLanguageSet.inventory.sessionexpired, "error");
              // sessionStorage.getItem('parentLogin')
              if (external && external == 'true') {
                // this.router.navigate(["/login"]);
                window.location.href = parentLogin;
              } else {
                this.router.navigate(["/login"]);
              }
            } else if (result.action == 'cancel') {
              setTimeout(() => {
                clearTimeout(this.timerRef);
                sessionStorage.clear();
                this.confirmationService.alert(this.currentLanguageSet.inventory.sessionexpired, "error");
                if (external && external == 'true') {
                  // this.router.navigate(["/login"]);
                  window.location.href = parentLogin;
                } else {
                  this.router.navigate(["/login"]);
                }
              }, result.remainingTime * 1000);
            }
          })
      }
    }, 27 * 60 * 1000);
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
