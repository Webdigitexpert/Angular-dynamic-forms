import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { SearchCategoriesComponent } from './search-categories/search-categories.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';


@NgModule({
  declarations: [SearchCategoriesComponent, AddEditCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    QCommonModule,
    NgbModule,
    FormsModule,ReactiveFormsModule,
    NgxTrimDirectiveModule
  ]
})
export class CategoriesModule { }
