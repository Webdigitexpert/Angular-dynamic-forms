import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductReviewComponent } from './add-edit-product-review.component';

describe('AddEditProductReviewComponent', () => {
  let component: AddEditProductReviewComponent;
  let fixture: ComponentFixture<AddEditProductReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProductReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
