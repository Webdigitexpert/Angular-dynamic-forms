import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DeletemodalComponent } from '../../common/deletemodal/deletemodal.component';
import { AddEditAttributeSetsComponent } from '../add-edit-attribute-sets/add-edit-attribute-sets.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AttributeSetService } from 'src/app/services/attributeSet/attribute-set.service';
import { DomainService } from 'src/app/services/domain/domain.service';
import { FilterPipe } from 'src/app/services/pipes/filter.pipe';
import { CategoriesService } from 'src/app/services/categories/categories.service';
@Component({
  selector: 'app-search-attribute-sets',
  templateUrl: './search-attribute-sets.component.html',
  styleUrls: ['./search-attribute-sets.component.scss'],
})
export class SearchAttributeSetsComponent implements OnInit, AfterViewInit {
  trimOPtion: '' | 'blur' | false = '';
  public searchKey: any;
  public isActive: any = '';
  service: any = {
    page: 1,
    pageSize: 4,
    maxSize: 5,
  };
  public editid: any;
  public isPagination: boolean = true;
  public attributeSetData;
  public attributeSets: any;
  public sortOrder: boolean = false;
  public sortDirection: any = '';
  public sortColumn: any;
  public ordersort: any;

  public isactiveUrl: any;

  public parameters: any; //passing parameters
  public parentCategory: any = ''; //filter with parent category
  public isLoadedTable:boolean = true;

  attributeSetList: any;
  public domainList: any;
  collectionSize: any;
  constructor(
    private attributeSetService: AttributeSetService,
    private modalService: NgbModal,
    private domainService: DomainService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.domainService.getallDomains().subscribe((domain) => {
      this.domainList = domain.data;
      console.log(this.domainList);
    });
    this.refreshAttributeSets();
  }
  sort(data: any) {
    // debugger
    this.sortOrder = !this.sortOrder;
    this.sortDirection = this.sortOrder ? `asc` : `desc`;
    this.sortColumn = data;

    let sortparameters = `&sortColumn=${data}&sortOrder=${this.sortDirection}`;
    this.refreshAttributeSets(sortparameters);
  }

  ngAfterViewInit() {}

  refreshAttributeSets(active?: any) {
    // debugger
    //pagination active inactive
    if (active) {
      let sortingoptions =
        (this.sortColumn && this.sortDirection)
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortDirection}`
          : `&sortColumn=createdDate&sortOrder=desc`;
          let searchkeyName = this.searchKey
          ? `&attributeSetName=${this.searchKey}`
          : ``;
        let selectedcategory =
          this.parentCategory.length > 0
            ? `&categoryDescriptionIds=${this.parentCategory}`
            : ``;
      this.attributeSetService
        .getAttributeSets(`page=${this.service.page}${sortingoptions}${searchkeyName}${selectedcategory}`)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.attributeSetList = res.data;
            this.collectionSize = res.totalCount;
            this.isLoadedTable = false;
            console.log(this.attributeSetList);
          },
          (err: any) => {
            console.log(err);
          }
        );
    }
    //without active inactive filter
    else {
      let sortingoptions =
        (this.sortColumn && this.sortDirection)
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortDirection}`
          : `&sortColumn=createdDate&sortOrder=desc`;
      let isActive = this.isActive ? `&active=${this.isActive}` : ``;
      let isSearchname = this.searchKey
        ? `&attributeSetName=${this.searchKey}`
        : ``;
      let selectedParentcategory =
        this.parentCategory.length > 0
          ? `&categoryDescriptionIds=${this.parentCategory}`
          : ``;

      this.attributeSetService
        .getAttributeSets(
          `page=${this.service.page}${isActive}${isSearchname}${sortingoptions}${selectedParentcategory}`
        )
        .subscribe(
          (res: any) => {
            this.attributeSetList = res.data;
            this.collectionSize = res.totalCount;
            console.log(this.attributeSetList);
            this.isLoadedTable = false;
          },
          (err: any) => {
            console.log(err);
          }
        );
    }
  }

  opendialog(data: any) {
    const modalRef = this.modalService.open(AddEditAttributeSetsComponent);
    modalRef.componentInstance.props = {
      title: 'Add AttributeSet',
      type: 'add',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshAttributeSets();
    });
  }

  changeStatusAttributeSet(res: any) {
    const modalRef = this.modalService.open(DeletemodalComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'alert-popup',
    });
    modalRef.componentInstance.props = {
      title: '',
      fullTitle: `Want to ${
        res.active ? 'deactivate' : 'activate'
      } Attribute Set`,
      type: 'changeStatusAttributeSet',
      page: `page=${this.service.page}`,
      data: res,
      categoryName: 'AttributeSet',
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshAttributeSets();
    });
  }

  editAttributeSet(res: any) {
    const modalRef = this.modalService.open(AddEditAttributeSetsComponent);
    modalRef.componentInstance.props = {
      title: 'Edit AttributeSet',
      type: 'edit',
      data: res,
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshAttributeSets();
      console.log(res);
    });
  }

  deleteAttributeSet(res: any) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deleteAttributeSet',
      data: res,
      categoryName: 'AttributeSet',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshAttributeSets();
      console.log(res);
    });
  }

  getData(data) {
    if (data.target.value === '') {
      this.isPagination = true;
      console.log(data.target.value);
      // this.refreshAttributeSets();
    }
    console.log(data.target.value);
  }

  attributeSetSearch() {
    // debugger
    this.sortDirection = '';
    let searchkeyName = this.searchKey
      ? `&attributeSetName=${this.searchKey}`
      : ``;
    let selectedcategory =
      this.parentCategory.length > 0
        ? `&categoryDescriptionIds=${this.parentCategory}`
        : ``;
    let totalparameters = `${searchkeyName}${selectedcategory}`;
    this.refreshAttributeSets(totalparameters);
  }
  getselectedCategory(event: any) {
    this.parentCategory = event;
    console.log(this.parentCategory);
  }
}
