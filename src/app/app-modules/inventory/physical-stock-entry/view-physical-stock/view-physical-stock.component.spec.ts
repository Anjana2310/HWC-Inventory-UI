import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhysicalStockComponent } from './view-physical-stock.component';

describe('ViewPhysicalStockComponent', () => {
  let component: ViewPhysicalStockComponent;
  let fixture: ComponentFixture<ViewPhysicalStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhysicalStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhysicalStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
