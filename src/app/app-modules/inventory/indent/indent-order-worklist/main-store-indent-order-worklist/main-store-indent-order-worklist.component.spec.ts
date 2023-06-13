import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStoreIndentOrderWorklistComponent } from './main-store-indent-order-worklist.component';

describe('MainStoreIndentOrderWorklistComponent', () => {
  let component: MainStoreIndentOrderWorklistComponent;
  let fixture: ComponentFixture<MainStoreIndentOrderWorklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainStoreIndentOrderWorklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainStoreIndentOrderWorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
