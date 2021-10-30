import { Component, OnInit } from '@angular/core';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { DeletemodalComponent } from '../../../common/deletemodal/deletemodal.component';
import { AddEditOfferComponent } from '../add-edit-offer/add-edit-offer.component';
import { ManufacturerService } from '../../../../../services/manufacturer/manufacturer.service';
import { OfferService } from '../../../../../services/product/offer/offer-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-offer',
  templateUrl: './search-offer.component.html',
  styleUrls: ['./search-offer.component.scss'],
})
export class SearchOfferComponent implements OnInit {
  service: any = {
    page: 1,
    pageSize: 4,
  };
  public offers: any;

  public collectionSize: any;
  public sortColumn: any;
  public sortOrder: boolean = false; // true or false
  public sortDirection: any; // asc or desc
  public manufacturer: any;

  constructor(
    private dialogService: DialogServiceService,
    private manufacturerService: ManufacturerService,
    private offerService: OfferService,
    private modalService: NgbModal
  ) {}

  refreshOffers() {
    let sortOption =
      this.sortColumn && this.sortDirection
        ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortDirection}`
        : `&sortColumn=createdDate&sortOrder=desc`;
    let totalparameters = `page=${this.service.page}${sortOption}`;
    this.offerService.offerListing(totalparameters).subscribe((res: any) => {
      this.offers = res.data;
      this.collectionSize = res.totalCount;
    });
  }

  sort(data: any) {
    this.sortOrder = !this.sortOrder;
    this.sortColumn = data;
    this.sortDirection = this.sortOrder ? `asc` : `desc`;
  }

  ngOnInit() {
    this.manufacturerService
      .getallManufacturerWithId()
      .subscribe((manufacturers) => {
        this.manufacturer = manufacturers.data;
        console.log(this.manufacturer);
      });
    this.refreshOffers();
  }

  addOffer() {
    const modalRef = this.modalService.open(AddEditOfferComponent);
    modalRef.componentInstance.props = {
      title: 'Add Offer',
      type: 'add',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshOffers();
    })
  }

  editOffer(res: any) {

    const modalRef = this.modalService.open(AddEditOfferComponent);
    modalRef.componentInstance.props={
      title:'Edit Offer',
      type:'edit',
      page: `page=${this.service.page}`,
      data:res
    }
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshOffers()
    })
  }

  deleteOffer(data: any) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props={
      title:'Delete Offer',
      type:'deleteoffer',
      page: `page=${this.service.page}`,
      res:data
    }
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshOffers();
    })
    // this.dialogService
    //   .openDialog(
    //     { title: 'Delete Offer', type: 'deleteoffer', res: data },
    //     DeletemodalComponent,
    //     'md'
    //   )
    //   .then((res: any) => {
    //     console.log(res);
    //   });
  }
}
