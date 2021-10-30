import { Component, OnInit } from '@angular/core';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { DeletemodalComponent } from '../../../common/deletemodal/deletemodal.component';
import { SortableDirective,SortEvent } from 'src/app/services/directives/sortable.directive';
import { SortingService } from 'src/app/services/sorting.service';
import { AddEditPriceComponent } from '../add-edit-price/add-edit-price.component';

@Component({
  selector: 'app-search-price',
  templateUrl: './search-price.component.html',
  styleUrls: ['./search-price.component.scss']
})
export class SearchPriceComponent implements OnInit {
  service: any = {
    page: 1,
    pageSize: 4,
  };
  public prices: any;
  public priceList: any = [
    {
      sno: 1,
      productId: 1,
      exShowroomPrice: 100,
      RTO:'A',
      insurance: 'B',
      fastTag: 'C',
      extendedWarrantyCharges: 10,
      amcCharges: 2,
      accessoriesCharges: 5,
      city:'Noida',
    },
    {
      sno: 2,
      productId: 2,
      exShowroomPrice: 200,
      RTO:'A',
      insurance: 'B',
      fastTag: 'C',
      extendedWarrantyCharges: 100,
      amcCharges: 20,
      accessoriesCharges: 50,
      city:'Noida',
    },
    {
      sno: 3,
      productId: 3,
      exShowroomPrice: 300,
      RTO:'A',
      insurance: 'B',
      fastTag: 'C',
      extendedWarrantyCharges: 300,
      amcCharges: 30,
      accessoriesCharges: 30,
      city:'Noida',
    },
    {
      sno: 4,
      productId: 4,
      exShowroomPrice: 400,
      RTO:'A',
      insurance: 'B',
      fastTag: 'C',
      extendedWarrantyCharges: 400,
      amcCharges: 40,
      accessoriesCharges: 40,
      city:'Noida',
    },
    {
      sno: 5,
      productId: 5,
      exShowroomPrice: 500,
      RTO:'A',
      insurance: 'B',
      fastTag: 'C',
      extendedWarrantyCharges: 500,
      amcCharges: 50,
      accessoriesCharges: 50,
      city:'Noida',
    },
    {
      sno: 6,
      productId: 6,
      exShowroomPrice: 600,
      RTO:'A',
      insurance: 'B',
      fastTag: 'C',
      extendedWarrantyCharges: 600,
      amcCharges: 60,
      accessoriesCharges: 60,
      city:'Noida',
    }
  ];
  collectionSize = this.priceList.length;
  constructor(private dialogService: DialogServiceService,private sortingService:SortingService) {}

  refreshPrices() {
    this.prices = this.priceList
      .map((price, i) => ({ id: i + 1, ...price }))
      .slice(
        (this.service.page - 1) * this.service.pageSize,
        (this.service.page - 1) * this.service.pageSize + this.service.pageSize
      );
  }

  onSort({column,direction}:SortEvent){
    console.log(column,direction);
    this.sortingService.sortColumn = column;
    this.sortingService.sortDirection = direction;
    this.sortingService.sort(this.priceList,column,direction);
    this.refreshPrices();
  }

  ngOnInit() {
    this.refreshPrices();
  }

  addPrice(data: any) {
    console.log(data);
    this.dialogService
      .openDialog(
        { title: 'Add Price', type: 'add' },
        AddEditPriceComponent,
        'md'
      )
      .then((res: any) => {
        console.log(res);
      });
  }

  editPrice(res: any) {
    console.log(res)
    this.dialogService
      .openDialog(
        { title: 'Edit Price', type: 'edit', data: res },
        AddEditPriceComponent,
        'md'
      )
      .then((res: any) => {
        console.log(res);
      });
  }
  deletePrice(data: any) {
    this.dialogService.openDialog({title:'Delete Price',type:'deleteprice',res:data},DeletemodalComponent,'md')
    .then((res:any) =>{
      console.log(res);
    })
  }
}
