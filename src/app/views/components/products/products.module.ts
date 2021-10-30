import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';

import { ProductsRoutingModule } from './products-routing.module';
import { SearchProductsComponent } from './search-products/search-products.component';
import { SearchPriceComponent } from './price/search-price/search-price.component';
import { AddEditPriceComponent } from './price/add-edit-price/add-edit-price.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchOfferComponent } from './offer/search-offer/search-offer.component';
import { AddEditOfferComponent } from './offer/add-edit-offer/add-edit-offer.component';
import { SearchDealerComponent } from './dealer/search-dealer/search-dealer.component';
import { AddEditDealerComponent } from './dealer/add-edit-dealer/add-edit-dealer.component';
import { AddProductModalComponent } from './search-products/add-product-modal/add-product-modal.component';
import { AddProductComponent } from './search-products/add-product/add-product.component';
import { EditProductComponent } from './search-products/edit-product/edit-product.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [SearchProductsComponent,
    SearchPriceComponent,
    AddEditPriceComponent,
    SearchOfferComponent,
    AddEditOfferComponent,
    SearchDealerComponent,
    AddProductComponent,
    EditProductComponent,
    AddProductModalComponent,
    AddEditDealerComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    QCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class ProductsModule { }
