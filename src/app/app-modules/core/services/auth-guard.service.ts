import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { SetLanguageComponent } from '../components/set-language.component';
import { LanguageService } from './language.service';

@Injectable()
export class AuthGuard implements CanActivate {
  languageComponent: SetLanguageComponent;
  currentLanguageSet: any;

  constructor(
    private router: Router,
    public http_service: LanguageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchLanguageResponse();
  }

  canActivate(route, state) {
    if (sessionStorage.getItem('isAuthenticated')) {
      return true;
    }
    else {
      alert(this.currentLanguageSet.inventory.youAreNotAuthorised);
      this.router.navigate(['/login']);
      return false;
    }
  }

  // canActivateChild() {
  //   if (sessionStorage.getItem('isAuthenticated'))
  //     return true;
  //   else {
  //     this.router.navigate(['/login']);
  //   }
  // }

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