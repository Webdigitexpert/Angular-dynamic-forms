import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchProductsComponent } from './search-products/search-products.component';
import { SearchPriceComponent } from './price/search-price/search-price.component';
import { SearchOfferComponent } from './offer/search-offer/search-offer.component';
import { SearchDealerComponent } from './dealer/search-dealer/search-dealer.component';
import { AddProductComponent } from './search-products/add-product/add-product.component';
import { EditProductComponent } from './search-products/edit-product/edit-product.component';

const routes: Routes = [{
    path: '', children: [
        { path: '', component: SearchProductsComponent },
        { path: 'prices', component: SearchPriceComponent },
        { path: 'offer', component: SearchOfferComponent },
        { path: 'dealer', component: SearchDealerComponent },
        { path: 'edit-product', component: EditProductComponent },
        { path: 'add-product', component: AddProductComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
