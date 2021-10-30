import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
    selector: 'app-add-product-modal',
    templateUrl: './add-product-modal.component.html',
    styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
    public ProductAddPopupForm: FormGroup;
    public title: string = 'Add Product';
    public categoryaddedit: any; //for dropdown
    public categories: any; //for dropdown
    public isAddBtnLoaded: boolean = false;

    constructor(
        private productService: ProductService,
        private ngbModal: NgbActiveModal,
        private categoryService: CategoriesService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        // this.categoryService.getallCategories().subscribe((categories) => {
        //     this.categories = categories.data;
        // });
        this.categoryService.getCategoriesParentChild().subscribe((res)=>{
            this.categoryaddedit = res.data;
            console.log(res);
        },(err:any)=>{
            console.log(err)
        })
        this.ProductAddPopupForm = this.formBuilder.group({
            add_product_category: new FormControl('', [Validators.required]),
            ismaster: new FormControl('', []),
            isvarient: new FormControl('', []),
        });
        this.ProductAddPopupForm.get('ismaster').setValue(true);
    }

    closeModal() {
        this.ngbModal.close();
    }

    addProduct() {
        this.isAddBtnLoaded = true;
        if (this.ProductAddPopupForm.valid) {
            this.ngbModal.close();
            this.router.navigateByUrl('/products/add-product', {
                state: this.ProductAddPopupForm.value
            });
        }
        this.isAddBtnLoaded = false;
    }
}