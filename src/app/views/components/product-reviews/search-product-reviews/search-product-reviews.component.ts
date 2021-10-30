import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review/review.service';
import { DomainService } from 'src/app/services/domain/domain.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletemodalComponent } from '../../common/deletemodal/deletemodal.component';
import { AddEditProductReviewComponent } from '../add-edit-product-review/add-edit-product-review.component';


@Component({
    selector: 'app-search-product-reviews',
    templateUrl: './search-product-reviews.component.html',
    styleUrls: ['./search-product-reviews.component.scss'],
})
export class SearchProductReviewsComponent implements OnInit {
    service: any = {
        page: 1,
        pageSize: 4
    };

    public sortColumnDefault: any = 'createdDate';
    public sortColumn: any;
    public sortOrderDefault: any = 'desc';
    public collectionSize: any; // to get the collection size
    public searchNamefilter: any; //filter to search name
    public sortDirection: boolean;
    public sortOrder: any;

    public reviewsList: any = [];

    public domains: any; //for dropdown
    public categories: any; //for dropdown

    public categoryFilter: any = ""; //filter with parent category
    public domainFilter: any = ""; //filter with domain
    public statusFilter: any = ""; //filter with domain
    public ratingFilter: any = ""; //filter with domain

    public isLoadedTable: boolean = true;

    constructor(
        private reviewservice: ReviewService,
        private domainService: DomainService,
        private categoryService: CategoriesService,
        private modalService: NgbModal
    ) { }
    refreshReviews(isFilter?: any) {
        debugger
        if (isFilter) {
            let searchName = this.searchNamefilter ? `&productId=${this.searchNamefilter}`:``;
            let sortingOptions = (this.sortColumn && this.sortOrder) ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortOrder}` : `&sortColumn=createdDate&sortOrder=desc`;
            let domainFilter = this.domainFilter ? `&domainId=${this.domainFilter}` : '';
            let statusFilter = this.statusFilter ? `&status=${this.statusFilter}` : '';
            let ratingFilter = this.ratingFilter ? `&rating=${this.ratingFilter}` : '';
    
            let filterParentCategory = '';
            if (this.categoryFilter) {
                if (Array.isArray(this.categoryFilter)) {
                    if (this.categoryFilter.length > 0) {
                        filterParentCategory = `&parentCategory=${this.categoryFilter}`;
                    } else {
                        filterParentCategory = '';
                    }
                } else {
                    filterParentCategory = `&parentCategory=${this.categoryFilter}`;
                }
            }
            let totalparameters = `page=${this.service.page}${sortingOptions}${domainFilter}${statusFilter}${ratingFilter}${filterParentCategory}${searchName}`
            this.reviewservice.getallReviews(totalparameters).subscribe((reviews) => {
                this.reviewsList = reviews.data;
                this.collectionSize = reviews.totalCount;
                this.isLoadedTable = false;
            });
        } else {
            let searchName = this.searchNamefilter ? `&productId=${this.searchNamefilter}`:``;
            let sortingOptions = (this.sortColumn && this.sortOrder) ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortOrder}` : `&sortColumn=createdDate&sortOrder=desc`;
            let domainFilter = this.domainFilter ? `&domainId=${this.domainFilter}` : '';
            let statusFilter = this.statusFilter ? `&status=${this.statusFilter}` : '';
            let ratingFilter = this.ratingFilter ? `&rating=${this.ratingFilter}` : '';
    
            let filterParentCategory = '';
            if (this.categoryFilter) {
                if (Array.isArray(this.categoryFilter)) {
                    if (this.categoryFilter.length > 0) {
                        filterParentCategory = `&parentCategory=${this.categoryFilter}`;
                    } else {
                        filterParentCategory = '';
                    }
                } else {
                    filterParentCategory = `&parentCategory=${this.categoryFilter}`;
                }
            }
            let totalparameters = `page=${this.service.page}${sortingOptions}${domainFilter}${statusFilter}${ratingFilter}${filterParentCategory}${searchName}`
            this.reviewservice.getallReviews(totalparameters).subscribe((reviews) => {
                this.reviewsList = reviews.data;
                this.collectionSize = reviews.totalCount;
                this.isLoadedTable = false;
            });
        }
    }
    //filter the categories
    searchReviews() {
        this.sortOrder = this.sortDirection ? `asc` : `desc`;
        let searchReviewsName = this.searchNamefilter ? `&reviewName=${this.searchNamefilter}` : '';

        let domainFilter = this.domainFilter ? `&domainId=${this.domainFilter}` : '';
        let statusFilter = this.statusFilter ? `&status=${this.statusFilter}` : '';
        let ratingFilter = this.ratingFilter ? `&rating=${this.ratingFilter}` : '';

        let filterParentCategory = '';
        if (this.categoryFilter) {
            if (Array.isArray(this.categoryFilter)) {
                if (this.categoryFilter.length > 0) {
                    filterParentCategory = `&parentCategory=${this.categoryFilter}`;
                } else {
                    filterParentCategory = '';
                }
            } else {
                filterParentCategory = `&parentCategory=${this.categoryFilter}`;
            }
        }
        let filtersortColumn = this.sortColumn ? `&sortColumn=${this.sortColumn}` : '';
        let parameters = `page=${this.service.page}${searchReviewsName}${domainFilter}${filterParentCategory}${statusFilter}${ratingFilter}${filtersortColumn}&sortOrder=${this.sortOrder}`
        // console.log(parameters); return
        
        this.refreshReviews(parameters);
    }

    sort(data: any) {
        this.sortColumn = data;
        this.sortDirection = !this.sortDirection;
        this.sortOrder = this.sortDirection ? `asc` : `desc`;
        let statusFilter = this.statusFilter ? `&status=${this.statusFilter}` : '';
        let ratingFilter = this.ratingFilter ? `&rating=${this.ratingFilter}` : '';

        let searchReviewsName = this.searchNamefilter ? `&reviewName=${this.searchNamefilter}` : '';
        let domainFilter = this.domainFilter ? `&domainId=${this.domainFilter}` : '';
        let filterParentCategory = this.categoryFilter ? `&parentCategory=${this.categoryFilter}` : '';
        let filtersortColumn = this.sortColumn ? `&sortColumn=${this.sortColumn}` : '';
        let sortparameters = `page=${this.service.page}${searchReviewsName}${domainFilter}${filterParentCategory}${filtersortColumn}${statusFilter}${ratingFilter}&sortOrder=${this.sortOrder}`
        this.refreshReviews(sortparameters);
    }

    ngOnInit() {
        this.domainService.getallDomains().subscribe((domain) => {
            this.domains = domain.data;
        });

        this.categoryService.getallCategories().subscribe((categories) => {
            this.categories = categories.data;
        })

        this.refreshReviews();
    }

    addReview(res: any) {
        const modalRef = this.modalService.open(AddEditProductReviewComponent);
        modalRef.componentInstance.props = {
            title: 'Add Review',
            type: 'add',
            page: `page=${this.service.page}`,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshReviews();
        });
    }

    editReview(data: any) {
        const modalRef = this.modalService.open(AddEditProductReviewComponent);
        modalRef.componentInstance.props = {
            title: 'Edit Review',
            type: 'edit',
            page: `page=${this.service.page}`,
            data: data,
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshReviews();
        });
    }

    changeStatusreviews(res: any) {
        const modalRef = this.modalService.open(DeletemodalComponent, { centered: true, size: 'sm', windowClass: 'alert-popup' });
        modalRef.componentInstance.props = {
            title: '',
            fullTitle: `Want to ${res.active ? 'deactivate' : 'activate'} Reviews`,
            type: 'changeStatusReviews',
            page: `page=${this.service.page}`,
            data: res,
            categoryName: 'Reviews',
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshReviews();
        });
    }
    

    // deleteReviews(data: any) {
    //     const modalRef = this.modalService.open(DeletemodalComponent, { centered: true, size: 'sm', windowClass: 'alert-popup' });
    //     modalRef.componentInstance.props = {
    //         title: '',
    //         fullTitle: 'Are you sure you want to delete review',
    //         type: 'deleteReviews',
    //         page: `page=${this.service.page}`,
    //         data: data,
    //         categoryName: 'Reviews',
    //     };
    //     modalRef.componentInstance.passEntry.subscribe((res: any) => {
    //         this.refreshReviews();
    //         console.log(res);
    //     });
    // }   
    
    // approveOrDeclineReview(res: any) {
    //     const modalRef = this.modalService.open(DeletemodalComponent, { centered: true, size: 'sm', windowClass: 'alert-popup' });
    //     modalRef.componentInstance.props = {
    //         title: '',
    //         fullTitle: `Want to ${res.status != 'Approved' ? 'approved' : 'decline'} this Review`,
    //         type: 'approveOrDeclineReview',
    //         page: `page=${this.service.page}`,
    //         data: res,
    //         categoryName: 'Reviews',
    //     };
    //     modalRef.componentInstance.passEntry.subscribe((res: any) => {
    //         this.refreshReviews();
    //     });
    // }
}
