import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesPage } from './listes.page';

describe('ListesPage', () => {
  let component: ListesPage;
  let fixture: ComponentFixture<ListesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
