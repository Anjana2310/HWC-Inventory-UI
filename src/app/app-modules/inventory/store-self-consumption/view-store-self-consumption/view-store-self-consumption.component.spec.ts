import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoreSelfConsumptionComponent } from './view-store-self-consumption.component';

describe('ViewStoreSelfConsumptionComponent', () => {
  let component: ViewStoreSelfConsumptionComponent;
  let fixture: ComponentFixture<ViewStoreSelfConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStoreSelfConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStoreSelfConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
