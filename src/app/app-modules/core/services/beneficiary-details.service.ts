import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from 'environments/environment';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class BeneficiaryDetailsService {

  beneficiaryDetails = new BehaviorSubject<any>(null);
  beneficiaryDetails$ = this.beneficiaryDetails.asObservable();

  constructor(private http: Http) { }

  getBeneficiaryDetails(beneficiaryRegID: string, benFlowID: string) {
    let url = localStorage.getItem('parentAPI') + environment.getBeneficiaryDetail;
    console.log('url',url);
    this.http.post(url, { beneficiaryRegID: beneficiaryRegID, benFlowID: benFlowID })
      .subscribe(res => {
        if (res.json().data) {
          this.beneficiaryDetails.next(res.json().data);
        }
      }, err => {
        this.beneficiaryDetails.next(null);
      });
  }

  getBeneficiaryImage(beneficiaryRegID: string) {
    let url = localStorage.getItem('parentAPI') + environment.getBeneficiaryImage;
    return this.http.post(url, { beneficiaryRegID: beneficiaryRegID })
      .map(res => res.json().data);
  }

  reset() {
    this.beneficiaryDetails.next(null);
  }

  // getCheck() {
  //   return this.http.get('http://localhost:3000/profile')
  //   .map(res => res.json());
  // }

}
