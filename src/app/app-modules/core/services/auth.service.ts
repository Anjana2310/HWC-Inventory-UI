import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';


@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  logoutUser() {
    return this.http.post(environment.logoutUrl, '').map((res) => res.json());
  }
  getUIVersionAndCommitDetails(url) {
    return this.http.get(url)
      .map((res) => res.json());
  }
  getAPIVersionAndCommitDetails() {
    return this.http.get(environment.apiVersionUrl)
      .map((res) => res.json());
  }

}
