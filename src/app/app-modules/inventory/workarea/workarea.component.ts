import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.css']
})
export class WorkareaComponent implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

}
