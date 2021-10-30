import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DeletemodalComponent } from 'src/app/views/components/common/deletemodal/deletemodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AttributeSetSpecificationService } from 'src/app/services/attributeSetSpecification/attribute-set-specification.service';
import { AddEditAttributeSetSpecificationComponent } from '../add-edit-attribute-set-specification/add-edit-attribute-set-specification.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-attribute-set',
  templateUrl: './detail-attribute-set.component.html',
  styleUrls: ['./detail-attribute-set.component.scss']
})
export class DetailAttributeSetComponent implements OnInit,AfterViewInit {
  service: any = {
    page: 1,
    pageSize: 4,
    maxSize: 5,
  };
  public attributeSetSpecificationData;
  public isUp: boolean = false;
  public attributeSetSpecifications: any;
  attributeSetSpecificationList: any = [];
  collectionSize: any;
  public sortOrder: boolean = false;
  public sortDirection: any;

  public sortColumn: any;
  public ordersort: any; //get request all
  public attributeSetEncryptedId : any;
  public attributeSet : any;
  public attributeSetStatus : boolean = true;
  public isLoadedTable:boolean =true;

  constructor(
    private attributeSetSpecificationService: AttributeSetSpecificationService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // debugger
    if(history.state.data){
      this.attributeSetEncryptedId=history.state.data.encryptedId;
      this.attributeSet = history.state.data;
      this.attributeSetStatus = history.state.data.active;
      sessionStorage.setItem('attribute_Set', JSON.stringify(this.attributeSet));
    }else{
      this.attributeSet = JSON.parse(sessionStorage.getItem('attribute_Set'))
      this.attributeSetEncryptedId=this.attributeSet.encryptedId;
      this.attributeSetStatus = this.attributeSet.active;
    }
    this.getAttributeSetSpecifications(this.attributeSetEncryptedId);
  }

  getAttributeSetSpecifications(data?:any) {
    if (this.sortColumn) {
      this.ordersort = this.sortOrder ? `asc` : `desc`;
      let attrbuteId = this.attributeSetEncryptedId ? `&attributeSetId=${this.attributeSetEncryptedId}`:``;
      let sortoptions = (this.sortColumn && this.ordersort) ? `sortColumn=${this.sortColumn}&sortOrder=${this.ordersort}`:`sortColumn=createdDate&sortOrder=desc`
      let pageparameters = `&page=${this.service.page}${attrbuteId}${sortoptions}`;
      this.attributeSetSpecificationService.getAttributeSetSpecifications(pageparameters).subscribe(
        (res: any) => {
          this.attributeSetSpecificationList = res.data;
          console.log(this.attributeSetSpecificationList);
          this.collectionSize = res.totalCount ==0 ? 1 : res.totalCount;
          this.isLoadedTable = false;
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      let pageparameters = `page=${this.service.page}&attributeSetId=${this.attributeSetEncryptedId}`;
      this.attributeSetSpecificationService.getAttributeSetSpecifications(pageparameters).subscribe(
        (res: any) => {
          this.attributeSetSpecificationList = res.data;
          console.log(this.attributeSetSpecificationList);
          this.collectionSize = res.totalCount ==0 ? 1 : res.totalCount;
          this.isLoadedTable = false;
          
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  ngAfterViewInit() { }

  // refreshAttributeSetSpecifications() {
  //   let sortingoptions =
  //     this.sortColumn || this.ordersort
  //       ? `sortColumn=${this.sortColumn}&sortOrder=${this.ordersort}`
  //       : '';
  //   let pageparameters = `${sortingoptions}&page=${this.service.page}&attributeSetId=${this.attributeSetEncryptedId}`;

  //   // this.attributeSetSpecificationService.getAttributeSetSpecifications(pageparameters).subscribe(
  //   //   (res: any) => {
  //   //     this.attributeSetSpecificationList = res.data;
  //   //   },
  //   //   (err: any) => {
  //   //     console.log(err);
  //   //   }
  //   // );
  // }



  sort(data: any) {
    this.sortOrder = !this.sortOrder;
    this.sortDirection = this.sortOrder ? `asc` : `desc`;
    this.sortColumn = data;
    this.getAttributeSetSpecifications(history.state.id);
  }

  opendialog(data: any) {

    const modalRef = this.modalService.open(AddEditAttributeSetSpecificationComponent);
    modalRef.componentInstance.props = {
      title: 'Add Attribute Label',
      type: 'add',
      data: this.attributeSetEncryptedId,
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.getAttributeSetSpecifications();
      console.log(res);
    });
  }

  editAttributeSetSpecification(res: any) {
    const modalRef = this.modalService.open(AddEditAttributeSetSpecificationComponent);
    modalRef.componentInstance.props = {
      title: 'Edit Attribute Label',
      type: 'edit',
      data: res,
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.getAttributeSetSpecifications();
      console.log(res);
    });
  }

  deleteAttributeSetSpecification(res: any) {

    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deleteAttributeSetSpecification',
      data: res,
      page: `page=${this.service.page}`,
      categoryName: 'Attribute Label'
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.getAttributeSetSpecifications();
      console.log(res);
    });

  }
  changeStatusAttributeSetSpecifications(res: any) {
    const modalRef = this.modalService.open(DeletemodalComponent, { centered: true, size: 'sm', windowClass: 'alert-popup' });
    modalRef.componentInstance.props = {
        title: '',
        fullTitle: `Want to ${res.active ? 'deactivate' : 'activate'} Attribute Label`,
        type: 'changeStatusAttributeSetSpecification',
        page: `page=${this.service.page}`,
        data: res,
        categoryName: 'AttributeSetSpecifications',
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
        this.getAttributeSetSpecifications();
    });
}
}


