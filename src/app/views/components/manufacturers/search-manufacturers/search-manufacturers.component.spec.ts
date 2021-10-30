import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchManufacturersComponent } from './search-manufacturers.component';

describe('ManufacturersComponent', () => {
  let component: SearchManufacturersComponent;
  let fixture: ComponentFixture<SearchManufacturersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchManufacturersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
