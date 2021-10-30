import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DeletemodalComponent } from '../../common/deletemodal/deletemodal.component';
import { AddEditDomainComponent } from '../add-edit-domain/add-edit-domain.component';
import { DomainService } from '../../../../services/domain/domain.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-domain',
  templateUrl: './search-domain.component.html',
  styleUrls: ['./search-domain.component.scss'],
})
export class SearchDomainComponent implements OnInit, AfterViewInit {
  service: any = {
    page: 1,
    pageSize: 4,
    maxSize: 5,
  };
  public domainData;
  public isUp: boolean = false;
  public domains: any;
  domainList: any = [];
  collectionSize: any;
  public sortOrder: boolean = false;
  public sortDirection: any;

  public sortColumn: any;
  public ordersort: any; //get request all
  public isLoadedTable: boolean = true;

  constructor(
    private domainService: DomainService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.refreshDomains();
  }

  ngAfterViewInit() {}

  refreshDomains(isSort?: any) {
    if (isSort) {
      let sortOption = (this.sortColumn && this.sortDirection ) ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortDirection}`:`&sortColumn=createdDate&sortOrder=desc`
      let parameters = `page=${this.service.page}${sortOption}`;
      this.domainService.getDomains(parameters).subscribe(
        (res: any) => {
          this.domainList = res.data;
          this.collectionSize = res.totalCount;
          this.isLoadedTable = false;
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      // debugger
      let defaultsort =
        this.sortColumn && this.sortDirection
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortDirection}`
          : `&sortColumn=createdDate&sortOrder=desc`;
      let pageparameters = `page=${this.service.page}${defaultsort}`;

      this.domainService.getDomains(pageparameters).subscribe(
        (res: any) => {
          this.domainList = res.data;
          this.isLoadedTable = false;
          this.collectionSize = res.totalCount;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  sort(data: any) {
    this.sortOrder = !this.sortOrder;
    this.sortDirection = this.sortOrder ? `asc` : `desc`;
    this.sortColumn = data;

    let sortDirection = this.sortOrder ? `asc` : `desc`;
    let sortColumn = data;
    this.refreshDomains(`&sortColumn=${sortColumn}&sortOrder=${sortDirection}`);
  }

  opendialog(data: any) {
    const modalRef = this.modalService.open(AddEditDomainComponent);
    modalRef.componentInstance.props = {
      title: 'Add Domain',
      type: 'add',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshDomains();
      console.log(res);
    });
  }

  editDomain(res: any) {
    const modalRef = this.modalService.open(AddEditDomainComponent);
    modalRef.componentInstance.props = {
      title: 'Edit Domain',
      type: 'edit',
      data: res,
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshDomains();
      console.log(res);
    });
  }

  deleteDomain(res: any) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deleteDomain',
      data: res,
      page: `page=${this.service.page}`,
      categoryName: 'Domain',
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshDomains();
      console.log(res);
    });
  }

  activateDeactivate(res) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deactivateDomain',
      page: `page=${this.service.page}`,
      data: res,
      categoryName: 'Domain',
      fullTitle: `Want to ${res.active ? 'deactivate' : 'activate'} Domain`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshDomains();
      console.log(res);
    });
  }
}
