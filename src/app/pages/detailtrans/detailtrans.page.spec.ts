import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailtransPage } from './detailtrans.page';

describe('DetailtransPage', () => {
  let component: DetailtransPage;
  let fixture: ComponentFixture<DetailtransPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailtransPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailtransPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
