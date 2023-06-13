import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStoreIndentOrderWorklistComponent } from './sub-store-indent-order-worklist.component';

describe('SubStoreIndentOrderWorklistComponent', () => {
  let component: SubStoreIndentOrderWorklistComponent;
  let fixture: ComponentFixture<SubStoreIndentOrderWorklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubStoreIndentOrderWorklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubStoreIndentOrderWorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
