import { Component, OnInit } from '@angular/core';
import { DeletemodalComponent } from '../../common/deletemodal/deletemodal.component';
import { AddEditManufacturersComponent } from '../add-edit-manufacturers/add-edit-manufacturers.component';
// import { CategoriesService } from 'src/app/services/categories/categories.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomainService } from 'src/app/services/domain/domain.service';
import { ManufacturerService } from 'src/app/services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-search-manufacturers',
  templateUrl: './search-manufacturers.component.html',
  styleUrls: ['./search-manufacturers.component.scss'],
})
export class SearchManufacturersComponent implements OnInit {
  service: any = {
    page: 1,
    pageSize: 4,
  };

  public sortColumnDefault: any = 'createdDate';
  public sortColumn: any;
  public sortOrderDefault: any = 'desc';
  public collectionSize: any; // to get the collection size
  public searchNamefilter: any; //filter to search name
  public sortDirection: boolean;
  public sortOrder: any;

  public manufacturers: any;
  public manufacturersList: any = [];

  public domains: any; //for dropdown

  public categories: any; //for dropdown
  // public categoriesFilter: any // for dropdown categories;
  public categoriesParentChild: any; // for dropdown categories;

  public parentCategory: any = ''; //filter with parent category
  public domainFilter: any = ''; //filter with domain

  public isLoadedTable: boolean = true;

  constructor(
    private manufacturerService: ManufacturerService,
    private domainService: DomainService,
    // private categoryService: CategoriesService,
    private modalService: NgbModal
  ) {}

  refreshManufacturers(isFilter?: any) {
    if (isFilter) {
      let searchManufacturersName = this.searchNamefilter
        ? `&manufacturerName=${this.searchNamefilter}`
        : '';
      let domainFilter = this.domainFilter
        ? `&domainId=${this.domainFilter}`
        : '';
      let filterParentCategory;
      if (this.parentCategory) {
        if (Array.isArray(this.parentCategory)) {
          if (this.parentCategory.length > 0) {
            filterParentCategory = `&parentCategory=${this.parentCategory}`;
          } else {
            filterParentCategory = '';
          }
        } else {
          filterParentCategory = `&parentCategory=${this.parentCategory}`;
        }
      } else {
        filterParentCategory = ``;
      }

      let sortingOptions =
        this.sortColumn && this.sortOrder
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortOrder}`
          : `&sortColumn=${this.sortColumnDefault}&sortOrder=${this.sortOrderDefault}`;

      let totalparameters = `page=${this.service.page}${searchManufacturersName}${domainFilter}${filterParentCategory}${sortingOptions}`;
      this.manufacturerService
        .getallManufacturer(totalparameters)
        .subscribe((manufacturers) => {
          this.manufacturersList = manufacturers.data;
          this.collectionSize = manufacturers.totalCount;
          this.isLoadedTable = false;
        });
    } else {
      let searchManufacturersName = this.searchNamefilter
        ? `&manufacturerName=${this.searchNamefilter}`
        : '';
      let domainFilter = this.domainFilter
        ? `&domainId=${this.domainFilter}`
        : '';
      let filterParentCategory;
      if (this.parentCategory) {
        if (Array.isArray(this.parentCategory)) {
          if (this.parentCategory.length > 0) {
            filterParentCategory = `&parentCategory=${this.parentCategory}`;
          } else {
            filterParentCategory = '';
          }
        } else {
          filterParentCategory = `&parentCategory=${this.parentCategory}`;
        }
      } else {
        filterParentCategory = ``;
      }

      let sortingOptions =
        this.sortColumn && this.sortOrder
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortOrder}`
          : `&sortColumn=${this.sortColumnDefault}&sortOrder=${this.sortOrderDefault}`;

      let totalparameters = `page=${this.service.page}${searchManufacturersName}${domainFilter}${filterParentCategory}${sortingOptions}`;

      this.manufacturerService
        .getallManufacturer(totalparameters)
        .subscribe((manufacturers) => {
          this.manufacturersList = manufacturers.data;
          this.collectionSize = manufacturers.totalCount;
          this.isLoadedTable = false;
        });
    }
  }

  // getManufacturersByFilter(id) {
  //   if (this.domains) {
  //     return this.domains.find((x) => x.id === id);
  //   } else {
  //     return '';
  //   }
  // }

  //filter the categories
  searchManufacturers() {
    this.sortOrder = this.sortDirection ? `asc` : `desc`;
    let searchManufacturersName = this.searchNamefilter
      ? `&manufacturerName=${this.searchNamefilter}`
      : '';
    let domainFilter = this.domainFilter
      ? `&domainId=${this.domainFilter}`
      : '';
    let filterParentCategory;
    if (this.parentCategory) {
      if (Array.isArray(this.parentCategory)) {
        if (this.parentCategory.length > 0) {
          filterParentCategory = `&parentCategory=${this.parentCategory}`;
        } else {
          filterParentCategory = '';
        }
      } else {
        filterParentCategory = `&parentCategory=${this.parentCategory}`;
      }
    }
    let filtersortColumn = this.sortColumn
      ? `&sortColumn=${this.sortColumn}`
      : '';
    let parameters = `page=${this.service.page}${searchManufacturersName}${domainFilter}${filterParentCategory}${filtersortColumn}&sortOrder=${this.sortOrder}`;
    this.refreshManufacturers(parameters);
  }

  sort(data: any) {
    this.sortColumn = data;
    this.sortDirection = !this.sortDirection;
    this.sortOrder = this.sortDirection ? `asc` : `desc`;

    let searchManufacturersName = this.searchNamefilter
      ? `&manufacturerName=${this.searchNamefilter}`
      : '';
    let domainFilter = this.domainFilter
      ? `&domainId=${this.domainFilter}`
      : '';
    let filterParentCategory = this.parentCategory
      ? `&parentCategory=${this.parentCategory}`
      : '';
    let filtersortColumn = this.sortColumn
      ? `&sortColumn=${this.sortColumn}`
      : '';
    let sortparameters = `page=${this.service.page}${searchManufacturersName}${domainFilter}${filterParentCategory}${filtersortColumn}&sortOrder=${this.sortOrder}`;
    this.refreshManufacturers(sortparameters);
  }

  ngOnInit() {
    this.domainService.getallDomains().subscribe((domain) => {
      this.domains = domain.data;
    });

    // this.categoryService.getallCategories().subscribe((categories) => {
    //     this.categoriesFilter = categories.data;
    // })

    this.refreshManufacturers();
  }

  addManufacturers(data: any) {
    const modalRef = this.modalService.open(AddEditManufacturersComponent);
    modalRef.componentInstance.props = {
      title: 'Add Manufacturers',
      type: 'add',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshManufacturers();
    });
  }

  editManufacturers(data: any) {
    const modalRef = this.modalService.open(AddEditManufacturersComponent);
    modalRef.componentInstance.props = {
      title: 'Edit Manufacturers',
      type: 'edit',
      page: `page=${this.service.page}`,
      data: data,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshManufacturers();
      // if (
      //   this.searchNamefilter ||
      //   this.domainFilter ||
      //   this.parentCategory ||
      //   this.sortColumn
      // ) {
      //   this.sortOrder = this.sortDirection ? `asc` : `desc`;
      //   let searchManufacturersName = this.searchNamefilter
      //     ? `&manufacturerName=${this.searchNamefilter}`
      //     : '';
      //   let domainFilter = this.domainFilter
      //     ? `&domainId=${this.domainFilter}`
      //     : '';
      //   let filterParentCategory;
      //   if (this.parentCategory) {
      //     if (Array.isArray(this.parentCategory)) {
      //       if (this.parentCategory.length > 0) {
      //         filterParentCategory = `&parentCategory=${this.parentCategory}`;
      //       } else {
      //         filterParentCategory = '';
      //       }
      //     } else {
      //       filterParentCategory = `&parentCategory=${this.parentCategory}`;
      //     }
      //   }
      //   let filtersortColumn = this.sortColumn
      //     ? `&sortColumn=${this.sortColumn}`
      //     : '';
      //   let parameters = `page=${this.service.page}${searchManufacturersName}${domainFilter}${filterParentCategory}${filtersortColumn}&sortOrder=${this.sortOrder}`;
      //   this.refreshManufacturers(parameters);
      // } else {
      //   this.refreshManufacturers();
      // }
    });
  }

  // deleteManufacturers(data: any) {
  //     const modalRef = this.modalService.open(DeletemodalComponent, { centered: true, size: 'sm', windowClass: 'alert-popup' });
  //     modalRef.componentInstance.props = {
  //         title: '',
  //         fullTitle: 'Are you sure you want to delete manufacturer',
  //         type: 'deleteManufacturers',
  //         page: `page=${this.service.page}`,
  //         data: data,
  //         categoryName: 'Manufacturers',
  //     };
  //     modalRef.componentInstance.passEntry.subscribe((res: any) => {
  //         this.refreshManufacturers();
  //         console.log(res);
  //     });
  // }

  changeStatusManufacturers(res: any) {
    const modalRef = this.modalService.open(DeletemodalComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'alert-popup',
    });
    modalRef.componentInstance.props = {
      title: '',
      fullTitle: `Want to ${
        res.active ? 'deactivate' : 'activate'
      } manufacturer`,
      type: 'changeStatusManufacturers',
      page: `page=${this.service.page}`,
      data: res,
      categoryName: 'Manufacturers',
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshManufacturers();
    });
  }



  getselectedCategory(event: any) {
    this.parentCategory = event;
  }
}
