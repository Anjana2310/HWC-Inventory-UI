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
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  transactionId: any;
  constructor(
    private router: Router,
    private http: Http ) { }

  login(userName: string, password: string, doLogout: any) {
    return this.http.post(environment.loginUrl, { userName: userName, password: password, doLogout: doLogout })
      .map(res => res.json());
  }

  /* AN4085822 - Concurrent login issue*/
  userlogoutPreviousSession(userName: string) {
    console.log("environment.userlogoutPreviousSessionUrl", environment.userlogoutPreviousSessionUrl)
  return this.http.post(environment.userlogoutPreviousSessionUrl, { userName: userName })
    .map(res => res.json());
  }

  getUserSecurityQuestionsAnswer(uname: any): Observable<any> {
    return this.http.post(environment.getUserSecurityQuestionsAnswerUrl, { 'userName': uname.toLowerCase() })
      .map(res => res.json())
  };

  getSecurityQuestions() {
    return this.http.get(environment.getSecurityQuestionUrl)
    .map(res => res.json())
  }

  saveUserSecurityQuestionsAnswer(userQuestionAnswer) {
    console.log("save security", userQuestionAnswer);

    return this.http.post(environment.saveUserSecurityQuestionsAnswerUrl, userQuestionAnswer)
    .map(res => res.json())
  }

  setNewPassword(userName: string, password: string, transactionId) {
    console.log("update password", password);
    console.log("update username", userName);
    return this.http.post(environment.setNewPasswordUrl, { 'userName': userName, 'password': password, 'transactionId': transactionId })
    .map( res => res.json())
  };

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  getSessionExists() {
    return this.http.post(environment.getSessionExistsURL, {})
    .map(res => res.json());
  }

  getFacilityDetails(storeID) {
    return this.http.post(environment.getFacilityByID, {facilityID: storeID})
    .map(res => res.json());
  }
  validateSecurityQuestionAndAnswer(ans: any, uname: any): Observable<any> {
		return this.http.post(environment.validateSecurityQuestions, { 'SecurityQuesAns':ans,'userName': uname })
    .map((res) => res.json());
	};
	getTransactionIdForChangePassword(uname: any): Observable<any> {
		return this.http.post(environment.getTransacIDForPasswordChange, { 'userName': uname })
		.map((res) => res.json());
	};

}
