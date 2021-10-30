import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDealerComponent } from './search-dealer.component';

describe('SearchDealerComponent', () => {
  let component: SearchDealerComponent;
  let fixture: ComponentFixture<SearchDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
