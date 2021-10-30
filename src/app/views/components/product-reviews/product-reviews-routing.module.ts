import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QCommonModule } from '../common/common.module';

import { SearchProductReviewsComponent } from './search-product-reviews/search-product-reviews.component';
import { AuthGuardsService } from "../../../services/guards/auth-guards.service"

const routes: Routes = [{ path: '', component: SearchProductReviewsComponent ,canActivate:[AuthGuardsService]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReviewsRoutingModule { }
