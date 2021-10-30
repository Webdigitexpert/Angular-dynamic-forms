import { Component, OnInit } from '@angular/core';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { DeletemodalComponent } from '../../../common/deletemodal/deletemodal.component';
import { SortableDirective,SortEvent } from 'src/app/services/directives/sortable.directive';
import { SortingService } from 'src/app/services/sorting.service';
import { AddEditDealerComponent } from '../add-edit-dealer/add-edit-dealer.component';

@Component({
  selector: 'app-search-dealer',
  templateUrl: './search-dealer.component.html',
  styleUrls: ['./search-dealer.component.scss']
})
export class SearchDealerComponent implements OnInit {
  service: any = {
    page: 1,
    pageSize: 4,
  };
  public dealers: any;
  public dealerList: any = [
    {
      sno: 1,
      productId: 1,
      address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      city:'Noida',
      PINCode: 201309,
      isActive: 'Yes',
      testDriveAvailable: 'Yes',
      email: 'abc@abc.com',
      showroomContact: 12345,
      serviceContact: 12345,
      testDriveContact: 12345,
    },
    {
      sno: 2,
      productId: 2,
      address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      city:'Noida',
      PINCode: 201309,
      isActive: 'Yes',
      testDriveAvailable: 'Yes',
      email: 'abc@abc.com',
      showroomContact: 12345,
      serviceContact: 12345,
      testDriveContact: 12345,
    },
    {
      sno: 3,
      productId: 3,
      address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      city:'Noida',
      PINCode: 201309,
      isActive: 'Yes',
      testDriveAvailable: 'Yes',
      email: 'abc@abc.com',
      showroomContact: 12345,
      serviceContact: 12345,
      testDriveContact: 12345,
    },
    {
      sno: 4,
      productId: 4,
      address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      city:'Noida',
      PINCode: 201309,
      isActive: 'Yes',
      testDriveAvailable: 'Yes',
      email: 'abc@abc.com',
      showroomContact: 12345,
      serviceContact: 12345,
      testDriveContact: 12345,
    },
    {
      sno: 5,
      productId: 5,
      address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      city:'Noida',
      PINCode: 201309,
      isActive: 'Yes',
      testDriveAvailable: 'Yes',
      email: 'abc@abc.com',
      showroomContact: 12345,
      serviceContact: 12345,
      testDriveContact: 12345,
    },
    {
      sno: 6,
      productId: 6,
      address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      city:'Noida',
      PINCode: 201309,
      isActive: 'Yes',
      testDriveAvailable: 'Yes',
      email: 'abc@abc.com',
      showroomContact: 12345,
      serviceContact: 12345,
      testDriveContact: 12345,
    }
  ];
  collectionSize = this.dealerList.length;
  constructor(private dialogService: DialogServiceService,private sortingService:SortingService) {}

  refreshDealers() {
    this.dealers = this.dealerList
      .map((dealer, i) => ({ id: i + 1, ...dealer }))
      .slice(
        (this.service.page - 1) * this.service.pageSize,
        (this.service.page - 1) * this.service.pageSize + this.service.pageSize
      );
  }

  onSort({column,direction}:SortEvent){
    console.log(column,direction);
    this.sortingService.sortColumn = column;
    this.sortingService.sortDirection = direction;
    this.sortingService.sort(this.dealerList,column,direction);
    this.refreshDealers();
  }

  ngOnInit() {
    this.refreshDealers();
  }

  addDealer(data: any) {
    console.log(data);
    this.dialogService
      .openDialog(
        { title: 'Add Dealer', type: 'add' },
        AddEditDealerComponent,
        'md'
      )
      .then((res: any) => {
        console.log(res);
      });
  }

  editDealer(res: any) {
    console.log(res)
    this.dialogService
      .openDialog(
        { title: 'Edit Dealer', type: 'edit', data: res },
        AddEditDealerComponent,
        'md'
      )
      .then((res: any) => {
        console.log(res);
      });
  }
  deleteDealer(data: any) {
    this.dialogService.openDialog({title:'Delete Dealer',type:'deletedealer',res:data},DeletemodalComponent,'md')
    .then((res:any) =>{
      console.log(res);
    })
  }
}

