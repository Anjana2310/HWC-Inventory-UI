import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStoreItemModelComponent } from './main-store-item-model.component';

describe('MainStoreItemModelComponent', () => {
  let component: MainStoreItemModelComponent;
  let fixture: ComponentFixture<MainStoreItemModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainStoreItemModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainStoreItemModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
