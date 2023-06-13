import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectItemFromMainstoreModelComponent } from './reject-item-from-mainstore-model.component';

describe('RejectItemFromMainstoreModelComponent', () => {
  let component: RejectItemFromMainstoreModelComponent;
  let fixture: ComponentFixture<RejectItemFromMainstoreModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectItemFromMainstoreModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectItemFromMainstoreModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
