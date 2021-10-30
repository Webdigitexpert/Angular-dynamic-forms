import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';

import { AttributeSetsRoutingModule } from './attribute-sets-routing.module';
import { SearchAttributeSetsComponent } from './search-attribute-sets/search-attribute-sets.component';
import { AddEditAttributeSetsComponent } from './add-edit-attribute-sets/add-edit-attribute-sets.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailAttributeSetComponent } from './detail-attribute-set/detail-attribute-set.component';
import { AddEditAttributeSetSpecificationComponent } from './add-edit-attribute-set-specification/add-edit-attribute-set-specification.component';




@NgModule({
  declarations: [SearchAttributeSetsComponent, AddEditAttributeSetsComponent, DetailAttributeSetComponent, AddEditAttributeSetSpecificationComponent],
  imports: [
    CommonModule,
    AttributeSetsRoutingModule,
    QCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AttributeSetsModule { }
