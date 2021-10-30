import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';
import { SelectCategoriesComponent } from './selectCategories/select-categories.component';


import { SortableDirective } from "./../../../services/directives/sortable.directive";
import { TrimInputDirective } from './../../../services/directives/trimdirective.directive';

import { FilterPipe } from "../../../services/pipes/filter.pipe";
import { MultiselectdropdownComponent } from './multiselectdropdown/multiselectdropdown.component'


import { TreeviewModule } from 'ngx-treeview';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [LoaderComponent,
    HeaderComponent,
    SidebarComponent,
    PaginationComponent,
    TrimInputDirective,
    DeletemodalComponent,
    SelectCategoriesComponent,
    SortableDirective,FilterPipe, MultiselectdropdownComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    TreeviewModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    SidebarComponent,
    PaginationComponent,
    SortableDirective,FilterPipe,
    DeletemodalComponent,
    SelectCategoriesComponent,
    TrimInputDirective,
    MultiselectdropdownComponent
    
]
})
export class QCommonModule { }
