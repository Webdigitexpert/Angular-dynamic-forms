import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAttributeSetsComponent } from './search-attribute-sets.component';

describe('AttributeSetsComponent', () => {
  let component: SearchAttributeSetsComponent;
  let fixture: ComponentFixture<SearchAttributeSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAttributeSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAttributeSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
