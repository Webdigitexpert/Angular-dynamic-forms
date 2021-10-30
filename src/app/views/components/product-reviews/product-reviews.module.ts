import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';

import { ProductReviewsRoutingModule } from './product-reviews-routing.module';
import { SearchProductReviewsComponent } from './search-product-reviews/search-product-reviews.component';
import { AddEditProductReviewComponent } from './add-edit-product-review/add-edit-product-review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [SearchProductReviewsComponent, AddEditProductReviewComponent],
  imports: [
    CommonModule,
    ProductReviewsRoutingModule,
    QCommonModule,
    NgbModule,ReactiveFormsModule,FormsModule,
    TagInputModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class ProductReviewsModule { }
