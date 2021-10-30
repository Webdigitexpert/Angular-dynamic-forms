import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./views/components/login/login.module').then(m => m.LoginModule) },
  { path: 'users', loadChildren: () => import('./views/components/users/users.module').then(m => m.UsersModule) },
  { path: 'domain', loadChildren: () => import('./views/components/domain/domain.module').then(m => m.DomainModule) },
  { path: 'categories', loadChildren: () => import('./views/components/categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'manufacturers', loadChildren: () => import('./views/components/manufacturers/manufacturers.module').then(m => m.ManufacturersModule) },
  { path: 'attributeSets', loadChildren: () => import('./views/components/attribute-sets/attribute-sets.module').then(m => m.AttributeSetsModule) },
  { path: 'products', loadChildren: () => import('./views/components/products/products.module').then(m => m.ProductsModule) },
  { path: 'productReviews', loadChildren: () => import('./views/components/product-reviews/product-reviews.module').then(m => m.ProductReviewsModule) },
  { path: 'masterData', loadChildren: () => import('./views/components/master-data/master-data.module').then(m => m.MasterDataModule) },
  { path: 'reports', loadChildren: () => import('./views/components/reports/reports.module').then(m => m.ReportsModule) },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
