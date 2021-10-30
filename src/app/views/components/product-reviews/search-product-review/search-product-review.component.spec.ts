import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchProductReviewsComponent } from './search-product-reviews.component';

describe('ProductReviewComponent', () => {
  let component: SearchProductReviewsComponent;
  let fixture: ComponentFixture<SearchProductReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
