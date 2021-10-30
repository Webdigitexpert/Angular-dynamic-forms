import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';

import { DomainRoutingModule } from './domain-routing.module';
import { SearchDomainComponent } from './search-domain/search-domain.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditDomainComponent } from './add-edit-domain/add-edit-domain.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';


@NgModule({
  declarations: [SearchDomainComponent, AddEditDomainComponent],
  imports: [
    CommonModule,
    DomainRoutingModule,
    QCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule
  ]
})
export class DomainModule { }
