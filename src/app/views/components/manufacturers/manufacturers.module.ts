import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';

import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { SearchManufacturersComponent } from './search-manufacturers/search-manufacturers.component';
import { AddEditManufacturersComponent } from './add-edit-manufacturers/add-edit-manufacturers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [SearchManufacturersComponent, AddEditManufacturersComponent],
  imports: [
    CommonModule,
    ManufacturersRoutingModule,
    QCommonModule,
    FormsModule,ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ]
})
export class ManufacturersModule { }
