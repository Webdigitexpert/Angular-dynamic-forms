import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { DeletemodalComponent } from '../../common/deletemodal/deletemodal.component';
import { ProductService } from 'src/app/services/product/product.service';
import { DomainService } from 'src/app/services/domain/domain.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ManufacturerService } from 'src/app/services/manufacturer/manufacturer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-products',
    templateUrl: './search-products.component.html',
    styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

    service: any = {
        page: 1,
        pageSize: 4,
        maxSize: 5
    };

    public sortColumnDefault: any = 'createdDate';
    public sortColumn: any;
    public sortOrderDefault: any = 'desc';
    public collectionSize: any; // to get the collection size
    public searchNamefilter: any; //filter to search name
    public sortDirection: boolean;
    public sortOrder: any;

    public productsList: any = [];

    public domains: any; //for dropdown
    public categories: any; //for dropdown
    public manufacturers: any; //for dropdown

    public categoryFilter: any = ""; //filter with parent category
    public domainFilter: any = ""; //filter with domain
    public manufacturerFilter: any = ""; //filter with Manufacturer

    public isLoadedTable: boolean = true;

    constructor(
        private modalService: NgbModal,
        private productService: ProductService,
        private domainService: DomainService,
        private categoryService: CategoriesService,
        private manufacturerService: ManufacturerService,
        private router: Router,
    ) { }

    refreshProducts(isFilter?: any) {
        if (isFilter) {
            this.productService.getallProducts(isFilter).subscribe((products) => {
                this.productsList = products.data;
                this.collectionSize = products.totalCount;
                this.isLoadedTable = false;
            });
        } else {
            let parameters = `page=${this.service.page}&sortColumn=${this.sortColumnDefault}&sortOrder=${this.sortOrderDefault}`;
            this.productService.getallProducts(parameters).subscribe((products) => {
                this.productsList = products.data;
                this.collectionSize = products.totalCount;
                this.isLoadedTable = false;
                console.log(products.data);
                
            });
        }
    }


    searchProducts() {
        this.sortOrder = this.sortDirection ? `asc` : `desc`;
        let searchProductsName = this.searchNamefilter ? `&productName=${this.searchNamefilter}` : '';

        let domainFilter = this.domainFilter ? `&domainIds=${this.domainFilter}` : '';
        let manufacturerFilter = this.manufacturerFilter ? `&manufacturerIds=${this.manufacturerFilter}` : '';
        let categoryFilter = this.categoryFilter ? `&categoryIds=${this.categoryFilter}` : '';

        let filtersortColumn = this.sortColumn ? `&sortColumn=${this.sortColumn}` : '';
        let parameters = `page=${this.service.page}${searchProductsName}${domainFilter}${manufacturerFilter}${categoryFilter}${filtersortColumn}&sortOrder=${this.sortOrder}`
        this.refreshProducts(parameters);
    }

    
    sort(data: any) {
        this.sortColumn = data;
        this.sortDirection = !this.sortDirection;
        this.sortOrder = this.sortDirection ? `asc` : `desc`;
        let searchProductsName = this.searchNamefilter ? `&productName=${this.searchNamefilter}` : '';

        let domainFilter = this.domainFilter ? `&domainIds=${this.domainFilter}` : '';
        let manufacturerFilter = this.manufacturerFilter ? `&manufacturerIds=${this.manufacturerFilter}` : '';
        let categoryFilter = this.categoryFilter ? `&categoryIds=${this.categoryFilter}` : '';
    
        let filtersortColumn = this.sortColumn ? `&sortColumn=${this.sortColumn}` : '';
        let sortparameters = `page=${this.service.page}${searchProductsName}${domainFilter}${filtersortColumn}${manufacturerFilter}${categoryFilter}&sortOrder=${this.sortOrder}`
        this.refreshProducts(sortparameters);
    }

    ngOnInit() {
        this.domainService.getallDomains().subscribe((domain) => {
            this.domains = domain.data;
        });

        this.categoryService.getallCategories().subscribe((categories) => {
            this.categories = categories.data;
        })

        this.manufacturerService.getallManufacturerWithId().subscribe((manufacturers) => {
            this.manufacturers = manufacturers.data;
        })

        this.refreshProducts();
    }

    changeStatusproducts(res: any) {
        const modalRef = this.modalService.open(DeletemodalComponent, { centered: true, size: 'sm', windowClass: 'alert-popup' });
        modalRef.componentInstance.props = {
            title: '',
            fullTitle: `Want to ${res.active ? 'deactivate' : 'activate'} Products`,
            type: 'changeStatusProducts',
            page: `page=${this.service.page}`,
            data: res,
            categoryName: 'Products',
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshProducts();
        });
    }

    cloneProduct(res: any) {
        const modalRef = this.modalService.open(DeletemodalComponent, { centered: true, size: 'sm', windowClass: 'alert-popup' });
        modalRef.componentInstance.props = {
            title: '',
            fullTitle: `Want to clone this product`,
            type: 'cloneProduct',
            page: `page=${this.service.page}`,
            data: res,
            categoryName: 'Products',
        };
        modalRef.componentInstance.passEntry.subscribe((res: any) => {
            this.refreshProducts();
        });
    }

    addproduct(data: any) {
        const modalRef = this.modalService.open(AddProductModalComponent, { centered: true });
        modalRef.componentInstance.props = {
            title: 'Add User',
            type: 'add',
        };
    }

    editProduct(data: any) {
        this.router.navigateByUrl('/products/edit-product', {
            state: data
        });
    }

    deleteProduct(data: any) {
        const modalRef = this.modalService.open(DeletemodalComponent, { centered: true, size: 'sm', windowClass: 'alert-popup' });
        modalRef.componentInstance.props = {
            title: '',
            type: 'deleteProduct',
        };
    }
}
