import { Component, OnInit } from '@angular/core';
import { DeletemodalComponent } from '../../common/deletemodal/deletemodal.component';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomainService } from 'src/app/services/domain/domain.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-categories',
  templateUrl: './search-categories.component.html',
  styleUrls: ['./search-categories.component.scss'],
})
export class SearchCategoriesComponent implements OnInit {
  service: any = {
    page: 1,
    pageSize: 4,
  };

  public sortColumnDefault: any = 'createdDate';
  public sortOrderDefault: any = 'desc';
  public categories: any;
  public domains: any; //for dropdown
  public categoriesFilter: any; // for dropdown categories;
  public categoryList: any = [];

  public collectionSize: any; // to get the collection size
  public searchNamefilter: any; //filter to search name
  public parentCategory: any = ''; //filter with parent category
  public categoriesParentChild: any; // for dropdown categories;

  public domainFilter: any = ''; //filter with domain

  public searchFilterForm: FormGroup;

  public sortDirection: boolean;
  public sortOrder: any;

  public parentChildCategory: any;
  public sortColumn: any;
  public sortingOrder: any;
  public isLoadedTable:boolean = true;

  constructor(
    private categoryService: CategoriesService,
    private modalService: NgbModal,
    private domainService: DomainService,
    private router: Router
  ) {}

  refreshCategories(isFilter?: any) {
    // debugger
    if (isFilter) {
      let sortparameters =
        this.sortColumn && this.sortOrder
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortOrder}`
          : `&sortColumn=${this.sortColumnDefault}&sortOrder=${this.sortOrderDefault}`;
      let searchCategoryName = this.searchNamefilter
        ? `&categoryName=${this.searchNamefilter}`
        : ``;
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
      }else {
        filterParentCategory = ``;
      }

      let totlaparameters = `&page=${this.service.page}${searchCategoryName}${domainFilter}${filterParentCategory}${sortparameters}`;
      this.categoryService
        .getCategories(totlaparameters)
        .subscribe((categories) => {
          this.categoryList = categories.data;
          this.collectionSize = categories.totalCount;
          this.isLoadedTable = false;
        });
    } else {
      let sortOptions =
        this.sortColumn && this.sortingOrder
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortingOrder}`
          : `&sortColumn=${this.sortColumnDefault}&sortOrder=${this.sortOrderDefault}`;

      let searchCategoryName = this.searchNamefilter
        ? `&categoryName=${this.searchNamefilter}`
        : ``;
      let domainFilter = this.domainFilter
        ? `&domainId=${this.domainFilter}`
        : '';
      let filterParentCategory;
      if (this.parentCategory) {
        if (Array.isArray(this.parentCategory)) {
          if (this.parentCategory.length > 0) {
            filterParentCategory = `&parentCategory=${this.parentCategory}`;
          } else {
            filterParentCategory = ``;
            console.log(filterParentCategory);
          }
        } else {
          filterParentCategory = `&parentCategory=${this.parentCategory}`;
        }
      } else {
        filterParentCategory = ``;
      }
      let filterparameters = `${searchCategoryName}${domainFilter}${filterParentCategory}`;
      let parameters =
        searchCategoryName || domainFilter || filterParentCategory
          ? `page=${this.service.page}${filterparameters}`
          : `page=${this.service.page}${sortOptions}${filterparameters}`;
      this.categoryService.getCategories(parameters).subscribe((categories) => {
        this.categoryList = categories.data;
        this.collectionSize = categories.totalCount;
        this.isLoadedTable = false;
      });
    }
  }

  getdrodownData(event: any) {
    console.log(event);
  }

  getselectedCategory(data: any) {
    this.parentCategory = data;
    console.log(this.parentCategory)
  }

  //filter the categories
  searchCategory() {
    this.sortOrder = '';
    let searchCategoryName = this.searchNamefilter
      ? `&categoryName=${this.searchNamefilter}`
      : ``;
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

    let parameters = `${searchCategoryName}${domainFilter}${filterParentCategory}`;
    this.refreshCategories(parameters);
  }

  sort(data: any) {
    // debugger
    this.sortDirection = !this.sortDirection;
    this.sortOrder = this.sortDirection ? `asc` : `desc`;
    this.sortColumn = data;
    this.sortingOrder = this.sortDirection ? `asc` : `desc`;
    let sortparameters = `&sortColumn=${data}&sortOrder=${this.sortOrder}`;
    this.refreshCategories(sortparameters);
  }

  ngOnInit() {
    this.domainService.getallDomains().subscribe((domain) => {
      this.domains = domain.data;
      console.log(this.domains);
    });

    this.refreshCategories();
  }

  addCategory(data: any) {
    const modalRef = this.modalService.open(AddEditCategoryComponent);
    modalRef.componentInstance.props = {
      title: 'Add Category',
      type: 'add',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCategories();
      console.log(res);
    });
  }
  editCategory(data: any) {
    const modalRef = this.modalService.open(AddEditCategoryComponent);
    modalRef.componentInstance.props = {
      title: 'Edit Category',
      type: 'edit',
      page: `page=${this.service.page}`,
      data: data,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCategories();
      console.log(res);
    });
  }

  deleteCategory(data: any) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deleteCategory',
      page: `page=${this.service.page}`,
      data: data,
      categoryName: 'Category',
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCategories();
      console.log(res);
    });
  }

  activateDeactivate(res) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deactivateCategory',
      page: `page=${this.service.page}`,
      data: res,
      categoryName: 'Category',
      fullTitle: `Want to ${res.active ? 'deactivate' : 'activate'} Category`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCategories();
      console.log(res);
    });
  }

  productReview(data: any) {
    const modalRef = this.modalService.open(AddEditCategoryComponent);
    modalRef.componentInstance.props = {
      title: 'Product Review Settings',
      type: 'productreview',
      page: `page=${this.service.page}`,
      data: data,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCategories();
      console.log(res);
    });
  }
}
