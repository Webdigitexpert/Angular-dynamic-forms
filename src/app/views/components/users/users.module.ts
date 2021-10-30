import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

// import * as $ from 'jquery';
import { UsersRoutingModule } from './users-routing.module';
import { SearchUserComponent } from './search-users/search-user.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

@NgModule({
  declarations: [SearchUserComponent, AddEditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    QCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
  ],
  entryComponents: [AddEditUserComponent],
  exports: [NgxTrimDirectiveModule],
})
export class UsersModule {}
