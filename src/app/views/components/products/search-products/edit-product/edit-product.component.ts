import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product/product.service';
import { DomainService } from 'src/app/services/domain/domain.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ManufacturerService } from 'src/app/services/manufacturer/manufacturer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})

export class EditProductComponent implements OnInit {
    public productForm: FormGroup;
    public isEditBtnLoaded: boolean = false;
    public isfromLoaded: boolean = true;

    public domains: any; //for dropdown
    public categories: any; //for dropdown
    public manufacturers: any; //for dropdown

    public routegetdata: any; //filter with Manufacturer
    public categoryServiceData: any; //filter with Manufacturer

    constructor(
        private productService: ProductService,
        private domainService: DomainService,
        private categoryService: CategoriesService,
        private manufacturerService: ManufacturerService,
        private formBuilder: FormBuilder, 
        private router: Router,
        private toastr: ToastrService
    ) {
        this.routegetdata = this.router.getCurrentNavigation().extras.state;
     }

    ngOnInit(): void {
        this.domainService.getallDomains().subscribe((domain) => {
            this.domains = domain.data;
        });

        this.categoryService.getallCategories().subscribe((categories) => {
            this.categories = categories.data;
        })

        this.manufacturerService.getallManufacturerWithId().subscribe((manufacturers) => {
            this.manufacturers = manufacturers.data;
        })

        this.productForm = this.formBuilder.group({
            productName: new FormControl('', []),
            domain: new FormControl('', [Validators.required]),
            manufacturer: new FormControl('', [Validators.required]),
            category: new FormControl('', [Validators.required]),
            isPopular: new FormControl('', [Validators.required]),
            isUpcoming: new FormControl('', [Validators.required]),
            productLaunchDate: new FormControl('', [Validators.required]),
            productExpertRating: new FormControl('', [Validators.required]),
            productExpertReview: new FormControl('', [Validators.required]),
            currency: new FormControl('', [Validators.required]),
            productPrice: new FormControl('', [Validators.required]),
            productTaxAmount: new FormControl('', [Validators.required]),
            productMake: new FormControl('', [Validators.required]),
            productModel: new FormControl('', [Validators.required]),
            titleSEO: new FormControl('', [Validators.required]),
            keywordSEO: new FormControl('', [Validators.required]),
            productExpiryDate: new FormControl('', [Validators.required]),
            productShortDescription: new FormControl('', [Validators.required]),
            descriptionSEO: new FormControl('', []),
            ismaster: new FormControl('', []),
            isvarient: new FormControl('', []),
        });
        if(!this.routegetdata){
            this.router.navigate(['products']);
        }else{
            console.log(this.routegetdata.domainMasters[0].id);
            
            this.productForm.patchValue({
                productName: this.routegetdata.productName,
                domain: this.routegetdata.domainMasters[0].id,
                manufacturer: this.routegetdata.manufacturerMaster.id,
                category: this.routegetdata.categoryMasters[0].id,
                isPopular: this.routegetdata.isPopular,
                isUpcoming: this.routegetdata.isUpcoming,
                productLaunchDate: this.routegetdata.productLaunchDate,
                productExpertRating: this.routegetdata.productExpertRating,
                productExpertReview: this.routegetdata.productExpertReview,
                currency: this.routegetdata.currency,
                productPrice: this.routegetdata.productPrice,
                productTaxAmount: this.routegetdata.productTaxAmount,
                productMake: this.routegetdata.productMake,
                productModel: this.routegetdata.productModel,
                titleSEO: this.routegetdata.titleSEO,
                keywordSEO: this.routegetdata.keywordSEO,
                productExpiryDate: this.routegetdata.productExpiryDate,
                productShortDescription: this.routegetdata.productShortDescription,
                descriptionSEO: this.routegetdata.descriptionSEO,
                ismaster: this.routegetdata.ismaster,
                isvarient:this.routegetdata.isvarient,
            });
            this.isfromLoaded = false;
            console.log(this.routegetdata);
        }
    }

    editProduct() {
        this.isEditBtnLoaded = true;
        if (this.productForm.valid) {
            this.productService.postProducts(this.productForm.value).subscribe(
                (res: any) => {
                    if (res.status) {
                        // this.closeModal(); Go back to list
                        this.toastr.success(`${res.message}`);
                        this.isEditBtnLoaded = false;
                    } else {
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Products Not Edited Successfully`);
                        }
                        this.isEditBtnLoaded = false;
                    }
                },
                (err: any) => {
                    // this.closeModal(); Go back to list
                    this.toastr.error(`${err}`);
                    console.log(err);
                }
            );
        } else {
            console.log('invalid');
            this.productForm.markAllAsTouched();
            this.isEditBtnLoaded = false;
        }
    }

    cancleProduct() {
        this.router.navigate(['products']);
    }
}