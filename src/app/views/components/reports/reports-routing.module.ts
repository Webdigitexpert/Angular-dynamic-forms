import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkUploadReportComponent } from './bulk-upload-report/bulk-upload-report.component';

const routes: Routes = [{ path:'', children: [ 
  { path: 'bulkUploadReport', component: BulkUploadReportComponent },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
