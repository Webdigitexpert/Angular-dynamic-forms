import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { SearchStatesComponent } from './states/search-states/search-states.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditStatesComponent } from './states/add-edit-states/add-edit-states.component';
import { SearchCitysComponent } from './citys/search-citys/search-citys.component';
import { AddEditCitysComponent } from './citys/add-edit-citys/add-edit-citys.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';



@NgModule({
  declarations: [
    SearchStatesComponent,
    AddEditStatesComponent,
    SearchCitysComponent,
    AddEditCitysComponent
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    QCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule
  ]
})
export class MasterDataModule { }
