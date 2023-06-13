import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-load-store-details',
  templateUrl: './load-store-details.component.html',
  styleUrls: ['./load-store-details.component.css']
})
export class LoadStoreDetailsComponent implements OnInit {

  constructor(private router: Router) { }
  showProgressBar: Boolean = true;
  ngOnInit() {
    this.router.navigate(['/inventory']);
  }

}
