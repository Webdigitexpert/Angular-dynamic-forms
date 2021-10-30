import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QCommonModule } from '../common/common.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { BulkUploadReportComponent } from './bulk-upload-report/bulk-upload-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BulkUploadReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    QCommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
