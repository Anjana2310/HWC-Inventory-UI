import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  servicesList: any;

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.servicesList = JSON.parse(localStorage.getItem('services'));
  }

  selectService(service) {
      localStorage.setItem('providerServiceID', service.providerServiceID);
      sessionStorage.setItem('apimanClientKey', service.apimanClientKey);
      this.router.navigate(["/facility"]);
  }

}
