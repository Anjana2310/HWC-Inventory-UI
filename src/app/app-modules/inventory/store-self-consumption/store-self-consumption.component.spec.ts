import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSelfConsumptionComponent } from './store-self-consumption.component';

describe('StoreSelfConsumptionComponent', () => {
  let component: StoreSelfConsumptionComponent;
  let fixture: ComponentFixture<StoreSelfConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreSelfConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSelfConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
