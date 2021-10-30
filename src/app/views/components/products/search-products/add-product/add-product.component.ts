import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product/product.service';
import { DomainService } from 'src/app/services/domain/domain.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ManufacturerService } from 'src/app/services/manufacturer/manufacturer.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
    public productForm: FormGroup;
    public isAddBtnLoaded: boolean = false;
    public isfromLoaded: boolean = true;
    public attributesCount: any = [];

    public attributes: any;
    // {
    //         "AS102-Attribute on 18 oct": [
    //             {
    //                 "id": "144",
    //                 "createdDate": "2021-10-19T12:26:47Z",
    //                 "updatedDate": "2021-10-19T12:26:47Z",
    //                 "createdBy": "test1",
    //                 "updatedBy": "test1",
    //                 "version": null,
    //                 "deleted": false,
    //                 "active": true,
    //                 "encryptedId": "dMVrDRqpx5Y=",
    //                 "attributeSetMaster": {
    //                     "id": "AS102",
    //                     "createdDate": "2021-10-19T12:24:04Z",
    //                     "updatedDate": "2021-10-19T12:24:04Z",
    //                     "createdBy": "test1",
    //                     "updatedBy": "test1",
    //                     "version": null,
    //                     "deleted": false,
    //                     "active": true,
    //                     "encryptedId": "LgLNK3e4nC4=",
    //                     "attributeSetName": "Attribute on 18 oct",
    //                     "categoryDescriptionIds": "1",
    //                     "parentCategoryId": null,
    //                     "categoryId": "1",
    //                     "categoryName": "yoing again",
    //                     "domainMasterName": null,
    //                     "masterVarientFlag": "M"
    //                 },
    //                 "attributeSetId": "AS102",
    //                 "attributeLabel": "Battery 1",
    //                 "isAlphaNumeric": true,
    //                 "unit": "Volt",
    //                 "isFacet": true,
    //                 "isMandatory": true,
    //                 "mandatory": true,
    //                 "alphaNumeric": true,
    //                 "facet": true
    //             },
    //             {
    //                 "id": "145",
    //                 "createdDate": "2021-10-19T12:27:00Z",
    //                 "updatedDate": "2021-10-19T12:27:00Z",
    //                 "createdBy": "test1",
    //                 "updatedBy": "test1",
    //                 "version": null,
    //                 "deleted": false,
    //                 "active": true,
    //                 "encryptedId": "SvSm4n5RkLI=",
    //                 "attributeSetMaster": {
    //                     "id": "AS102",
    //                     "createdDate": "2021-10-19T12:24:04Z",
    //                     "updatedDate": "2021-10-19T12:24:04Z",
    //                     "createdBy": "test1",
    //                     "updatedBy": "test1",
    //                     "version": null,
    //                     "deleted": false,
    //                     "active": true,
    //                     "encryptedId": "LgLNK3e4nC4=",
    //                     "attributeSetName": "Attribute on 18 oct",
    //                     "categoryDescriptionIds": "1",
    //                     "parentCategoryId": null,
    //                     "categoryId": "1",
    //                     "categoryName": "yoing again",
    //                     "domainMasterName": null,
    //                     "masterVarientFlag": "M"
    //                 },
    //                 "attributeSetId": "AS102",
    //                 "attributeLabel": "Battery 2",
    //                 "isAlphaNumeric": true,
    //                 "unit": "Volt",
    //                 "isFacet": true,
    //                 "isMandatory": true,
    //                 "mandatory": true,
    //                 "alphaNumeric": true,
    //                 "facet": true
    //             },
    //             {
    //                 "id": "145",
    //                 "createdDate": "2021-10-19T12:27:00Z",
    //                 "updatedDate": "2021-10-19T12:27:00Z",
    //                 "createdBy": "test1",
    //                 "updatedBy": "test1",
    //                 "version": null,
    //                 "deleted": false,
    //                 "active": true,
    //                 "encryptedId": "SvSm4n5RkLI=",
    //                 "attributeSetMaster": {
    //                     "id": "AS102",
    //                     "createdDate": "2021-10-19T12:24:04Z",
    //                     "updatedDate": "2021-10-19T12:24:04Z",
    //                     "createdBy": "test1",
    //                     "updatedBy": "test1",
    //                     "version": null,
    //                     "deleted": false,
    //                     "active": true,
    //                     "encryptedId": "LgLNK3e4nC4=",
    //                     "attributeSetName": "Attribute on 18 oct",
    //                     "categoryDescriptionIds": "1",
    //                     "parentCategoryId": null,
    //                     "categoryId": "1",
    //                     "categoryName": "yoing again",
    //                     "domainMasterName": null,
    //                     "masterVarientFlag": "M"
    //                 },
    //                 "attributeSetId": "AS102",
    //                 "attributeLabel": "Battery 2",
    //                 "isAlphaNumeric": true,
    //                 "unit": "Volt",
    //                 "isFacet": true,
    //                 "isMandatory": true,
    //                 "mandatory": true,
    //                 "alphaNumeric": true,
    //                 "facet": true
    //             }
    //         ],
    //         "AS103-Attribute on 19 oct": [
    //             {
    //                 "id": "146",
    //                 "createdDate": "2021-10-19T12:29:45Z",
    //                 "updatedDate": "2021-10-19T12:29:45Z",
    //                 "createdBy": "test1",
    //                 "updatedBy": "test1",
    //                 "version": null,
    //                 "deleted": false,
    //                 "active": true,
    //                 "encryptedId": "c7__PLS__pmwjUC1c=",
    //                 "attributeSetMaster": {
    //                     "id": "AS103",
    //                     "createdDate": "2021-10-19T12:28:48Z",
    //                     "updatedDate": "2021-10-19T12:28:48Z",
    //                     "createdBy": "test1",
    //                     "updatedBy": "test1",
    //                     "version": null,
    //                     "deleted": false,
    //                     "active": true,
    //                     "encryptedId": "HNfVVZfoiOc=",
    //                     "attributeSetName": "Attribute on 19 oct",
    //                     "categoryDescriptionIds": "1",
    //                     "parentCategoryId": null,
    //                     "categoryId": "1",
    //                     "categoryName": "yoing again",
    //                     "domainMasterName": null,
    //                     "masterVarientFlag": "M"
    //                 },
    //                 "attributeSetId": "AS103",
    //                 "attributeLabel": "Screen Size 1",
    //                 "isAlphaNumeric": true,
    //                 "unit": "Volt",
    //                 "isFacet": true,
    //                 "isMandatory": true,
    //                 "mandatory": true,
    //                 "alphaNumeric": true,
    //                 "facet": true
    //             },
    //             {
    //                 "id": "147",
    //                 "createdDate": "2021-10-19T12:29:49Z",
    //                 "updatedDate": "2021-10-19T12:29:49Z",
    //                 "createdBy": "test1",
    //                 "updatedBy": "test1",
    //                 "version": null,
    //                 "deleted": false,
    //                 "active": true,
    //                 "encryptedId": "KzKNpAjF8kc=",
    //                 "attributeSetMaster": {
    //                     "id": "AS103",
    //                     "createdDate": "2021-10-19T12:28:48Z",
    //                     "updatedDate": "2021-10-19T12:28:48Z",
    //                     "createdBy": "test1",
    //                     "updatedBy": "test1",
    //                     "version": null,
    //                     "deleted": false,
    //                     "active": true,
    //                     "encryptedId": "HNfVVZfoiOc=",
    //                     "attributeSetName": "Attribute on 19 oct",
    //                     "categoryDescriptionIds": "1",
    //                     "parentCategoryId": null,
    //                     "categoryId": "1",
    //                     "categoryName": "yoing again",
    //                     "domainMasterName": null,
    //                     "masterVarientFlag": "M"
    //                 },
    //                 "attributeSetId": "AS103",
    //                 "attributeLabel": "Screen Size 2",
    //                 "isAlphaNumeric": true,
    //                 "unit": "Volt",
    //                 "isFacet": true,
    //                 "isMandatory": true,
    //                 "mandatory": true,
    //                 "alphaNumeric": true,
    //                 "facet": true
    //             }
    //     ]
    // };


    public uploadedimages: any = [];
    public uploadedimagesSend: any = [];
    public thispreviewimageUrl: any;

    public uploadedvideos: any = [];
    public uploadedvideosSend: any = [];
    public thispreviewvideoUrl: any;

    public addattarbutefrom: any;
    public categoryMastersId: any;

    public domains: any; //for dropdown
    public categories: any; //for dropdown
    public categoryaddedit: any; //for dropdown
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

        // this.categoryService.getallCategories().subscribe((categories) => {
        //     this.categories = categories.data;
        // })
        this.categoryService.getCategoriesParentChild().subscribe((res) => {
            this.categoryaddedit = res.data;
            console.log(res);
        }, (err: any) => {
            console.log(err)
        })

        // this.manufacturerService.getallManufacturerWithId().subscribe((manufacturers) => {
        //     this.manufacturers = manufacturers.data;
        // })

        this.productForm = this.formBuilder.group({
            productName: new FormControl('', []),
            domainMasters: new FormControl('', []),
            manufacturerMaster: new FormControl('', []),
            categoryMasters: new FormControl('', []),
            isPopular: new FormControl('', []),
            productLaunchDate: new FormControl('', []),
            productExpertRating: new FormControl('', []),
            productExpertReview: new FormControl('', []),
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
            productImages: new FormControl('', []),
            productVideos: new FormControl('', []),
            productAttributes: new FormArray([]),
        });

        if (!this.routegetdata) {
            this.router.navigate(['products']);
        } else {
            this.manufacturerService.getallManufacturerbycategory(this.routegetdata.add_product_category).subscribe((res) => {
                this.manufacturers = res.data;
            })
            this.productService.getAllAttributesetbycategory(this.routegetdata.add_product_category).subscribe((res) => {
                console.log('attributes', res);
                this.attributes = res.data[0];
                this.addattarbutefrom = this.productForm.get('productAttributes') as FormArray;
                for (const item in this.attributes) {
                    for (const newitem in this.attributes[item]) {
                        this.addattarbutefrom.push(
                            new FormGroup({
                                id: new FormControl(this.attributes[item][newitem].attributeSetId, []),
                                attributeLabel: new FormControl(this.attributes[item][newitem].attributeLabel, []),
                                attributeValue: new FormControl('', []),
                            })
                        );
                    };
                };
            })
            this.categoryService.getCategoryMasterById(this.routegetdata.add_product_category).subscribe((cat) => {
                this.categoryMastersId = cat.data.id;
                this.productForm.get('categoryMasters').setValue(cat.data.id);
                this.productForm.get('categoryMasters').disable();
                this.isfromLoaded = false;
            });

            if (this.routegetdata.ismaster != '') {
                this.productForm.get('ismaster').setValue(this.routegetdata.ismaster);
                this.productForm.get('ismaster').disable();
            }
            if (this.routegetdata.isvarient != '') {
                this.productForm.get('isvarient').setValue(this.routegetdata.isvarient);
                this.productForm.get('isvarient').disable();
            }
            this.productForm.get('currency').setValue('INR');
        }

    }
    splitstring(string:any){
        return string.split("-");
    }
    addProduct() {
        this.isAddBtnLoaded = true;
        this.productForm.get('productImages').setValue(this.uploadedimagesSend);
        this.productForm.get('productVideos').setValue(this.uploadedvideosSend);

        this.productForm.value.productLaunchDate = this.productForm.value.productLaunchDate.toISOString().slice(0, 19) + 'Z';
        this.productForm.value.productExpiryDate = this.productForm.value.productExpiryDate.toISOString().slice(0, 19) + 'Z';

        this.productForm.value.manufacturerMaster = {id : this.productForm.value.manufacturerMaster };
        this.productForm.value.categoryMasters = [{id : this.categoryMastersId }];
        this.productForm.value.domainMasters = [{id : this.productForm.value.domainMasters }];
        // console.log(this.productForm.value);
        // return;

        if (this.productForm.valid) {
            this.productService.postProducts(this.productForm.value).subscribe(
                (res: any) => {
                    if (res.status) {
                        // this.closeModal(); Go back to list
                        this.toastr.success(`${res.message}`);
                        this.isAddBtnLoaded = false;
                        this.router.navigate(['products']);
                    } else {
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Products Not Added Successfully`);
                        }
                        this.isAddBtnLoaded = false;
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
            this.isAddBtnLoaded = false;
        }
    }
    cancleProduct() {
        this.router.navigate(['products']);
    }

    onImageUploadChange(productImage: HTMLInputElement, productImagedesc: HTMLInputElement) {
        if (productImage.files && productImage.files[0]) {
            const image = productImage.files[0];
            this.uploadedimages.push({
                image: image,
                url: this.thispreviewimageUrl,
                name: image.name,
                description: productImagedesc.value,
            });
            this.uploadedimagesSend.push({
                url: image,
            });
            productImagedesc.value = ''
            productImage.value = ''
        }
    }

    fileChangeEvent(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event) => { // called once readAsDataURL is completed
                this.thispreviewimageUrl = event.target.result;
            }
        }
    }

    deleteThisImage(id: any) {
        delete this.uploadedimages[id]
    }


    onVideoUploadChange(productVideo: HTMLInputElement, productVideodesc: HTMLInputElement) {
        if (productVideo.files && productVideo.files[0]) {
            const video = productVideo.files[0];
            console.log(video);

            this.uploadedvideos.push({
                video: video,
                type: video.type,
                url: this.thispreviewvideoUrl,
                name: video.name,
                description: productVideodesc.value,
            });
            this.uploadedvideosSend.push({
                url: video,
            });
            console.log(this.uploadedvideos);

            productVideodesc.value = ''
            productVideo.value = ''
        }
    }

    videofileChangeEvent(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event) => { // called once readAsDataURL is completed
                this.thispreviewvideoUrl = event.target.result;
            }
        }
    }

    deleteThisVideo(id: any) {
        delete this.uploadedvideos[id]
    }
}