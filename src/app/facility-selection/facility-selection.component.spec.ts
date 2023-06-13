import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySelectionComponent } from './facility-selection.component';

describe('FacilitySelectionComponent', () => {
  let component: FacilitySelectionComponent;
  let fixture: ComponentFixture<FacilitySelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitySelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
