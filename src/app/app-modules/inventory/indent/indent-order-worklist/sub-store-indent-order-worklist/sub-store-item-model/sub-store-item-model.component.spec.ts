import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStoreItemModelComponent } from './sub-store-item-model.component';

describe('SubStoreItemModelComponent', () => {
  let component: SubStoreItemModelComponent;
  let fixture: ComponentFixture<SubStoreItemModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubStoreItemModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubStoreItemModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
