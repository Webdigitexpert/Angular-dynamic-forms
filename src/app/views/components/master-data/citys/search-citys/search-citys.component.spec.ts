import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCitysComponent } from './search-citys.component';

describe('SearchCitysComponent', () => {
  let component: SearchCitysComponent;
  let fixture: ComponentFixture<SearchCitysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCitysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
