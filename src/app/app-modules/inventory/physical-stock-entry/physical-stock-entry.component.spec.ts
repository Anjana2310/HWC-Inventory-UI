import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalStockEntryComponent } from './physical-stock-entry.component';

describe('PhysicalStockEntryComponent', () => {
  let component: PhysicalStockEntryComponent;
  let fixture: ComponentFixture<PhysicalStockEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalStockEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalStockEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
