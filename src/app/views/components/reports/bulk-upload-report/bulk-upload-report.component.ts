import { Component, OnInit, AfterViewInit,QueryList, ViewChildren } from '@angular/core';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { DeletemodalComponent } from 'src/app/views/components/common/deletemodal/deletemodal.component';
import { SortableDirective,SortEvent } from "src/app/services/directives/sortable.directive";
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'app-bulk-upload-report',
  templateUrl: './bulk-upload-report.component.html',
  styleUrls: ['./bulk-upload-report.component.scss']
})
export class BulkUploadReportComponent implements OnInit,AfterViewInit {

  service: any = {
    page: 1,
    pageSize: 4,
  };
  public reportData;
  public isUp: boolean = false;
  public reports: any;
  reportList: any = [
    {
      sno: 1,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 2,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 3,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 4,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 5,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 6,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 7,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 8,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 9,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 10,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 11,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 12,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
    {
      sno: 13,
      date: '01/01/2020',
      UploadedBy: 'United States',
      result:'Lorem ipsum dolor sit amet',
    },
  ];

  

  total: any = this.reportList.length;

  collectionSize = this.reportList.length;

  @ViewChildren(SortableDirective) headers:QueryList<SortableDirective>;

  constructor(private dialogService: DialogServiceService,private sortingService:SortingService) {
    
  }

  ngOnInit() {
    this.refreshReports();
  
  }

  ngAfterViewInit() {}

  refreshReports() {
    this.reports = this.reportList
      .map((report, i) => ({ id: i + 1, ...report }))
      .slice(
        (this.service.page - 1) * this.service.pageSize,
        (this.service.page - 1) * this.service.pageSize + this.service.pageSize
      );
  }

  

  onSort({ column, direction }: SortEvent) {
    console.log(direction);
    this.headers.forEach((header) => {
      if(header.sortable !== column){
        header.direction =''
      }
    });
    
    this.sortingService.sortColumn = column;
    this.sortingService.sortDirection = direction;
    this.sortingService.sort(this.reportList,column,direction);
   
    this.refreshReports();

  }

  download(res: any) {
    console.log(res);
    this.dialogService
      .openDialog(
        { title: 'Download Report', type: 'download', data: res },
        DeletemodalComponent,
        'md'
      )
      .then((res: any) => {
        console.log(res);
      });
  }
}
