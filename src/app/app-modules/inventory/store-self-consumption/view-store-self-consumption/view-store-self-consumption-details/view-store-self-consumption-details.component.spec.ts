import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoreSelfConsumptionDetailsComponent } from './view-store-self-consumption-details.component';

describe('ViewStoreSelfConsumptionDetailsComponent', () => {
  let component: ViewStoreSelfConsumptionDetailsComponent;
  let fixture: ComponentFixture<ViewStoreSelfConsumptionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStoreSelfConsumptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoreSelfConsumptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
