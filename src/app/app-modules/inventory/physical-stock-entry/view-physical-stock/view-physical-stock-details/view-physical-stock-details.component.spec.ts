import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhysicalStockDetailsComponent } from './view-physical-stock-details.component';

describe('ViewPhysicalStockDetailsComponent', () => {
  let component: ViewPhysicalStockDetailsComponent;
  let fixture: ComponentFixture<ViewPhysicalStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhysicalStockDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhysicalStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
