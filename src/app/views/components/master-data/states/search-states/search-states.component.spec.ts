import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatesComponent } from './search-states.component';

describe('StatesComponent', () => {
  let component: SearchStatesComponent;
  let fixture: ComponentFixture<SearchStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
