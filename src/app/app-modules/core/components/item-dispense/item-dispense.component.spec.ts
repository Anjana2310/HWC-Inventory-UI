import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDispenseComponent } from './item-dispense.component';

describe('ItemDispenseComponent', () => {
  let component: ItemDispenseComponent;
  let fixture: ComponentFixture<ItemDispenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDispenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDispenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
