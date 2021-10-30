import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
    FormControl,
    FormGroup,
    Validators,
    FormBuilder,
} from '@angular/forms';
import { DomainService } from '../../../../services/domain/domain.service';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-edit-category',
    templateUrl: './add-edit-category.component.html',
    styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent implements OnInit {
    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    public title: string;
    public type: string;
    public data: any;
    public categoryForm: FormGroup;
    public productReviewForm: FormGroup;
    public domains: any;
    public parentCategories: any;
    public pages: any;
    public editId: any;
    public nullvalue: null = null;

    public file: any; // add edit category image

    public editLogo: any;//to display edit image
    public hidelogo: boolean = false; // to hide edit logo
    public encryptedid: any //for param review

    public isAddBtnLoaded: boolean = false; //loader 
    public isEditBtnLoaded: boolean = false; //loader
    public isReviewSettings: boolean = false;//loader

    public parentChildCategory: any// to send added edited records to subject

    constructor(
        private ngbModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private domainService: DomainService,
        private categoryService: CategoriesService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.domainService.getallDomains().subscribe((domain) => {
            this.domains = domain.data;

            console.log(this.domains);
        });

        this.categoryService.getallCategories().subscribe((category) => {
            this.parentCategories = category.data;
        });

        this.categoryForm = this.formBuilder.group({
            categoryName: new FormControl('', [
                Validators.required
            ]),
            categoryDescription: new FormControl(''),
            metaTitle: new FormControl(''),
            metaDescription: new FormControl(''),
            parentCategory: new FormControl(null),
            domainId: new FormControl(null),
        });

        this.productReviewForm = this.formBuilder.group({
            param1: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            param2: new FormControl('', [Validators.maxLength(100)]),
            param3: new FormControl('', [Validators.maxLength(100)]),
            param4: new FormControl('', [Validators.maxLength(100)]),
            param5: new FormControl('', [Validators.maxLength(100)]),
        })

        this.setDialogProps(this.props);
    }

    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.editId = dialogdata.type == 'edit' ? dialogdata.data.id : ``;
        if (['edit'].includes(this.type)) {
            this.categoryForm.patchValue(this.data);
            this.editLogo = dialogdata.data.categoryImage ? dialogdata.data.categoryImage.url : ``;
        }
        this.encryptedid = dialogdata.type == 'productreview' ? dialogdata.data.encryptedId : ``;
        this.pages = dialogdata.page;
        if (['productreview'].includes(this.type)) {
            this.productReviewForm.patchValue(this.data.reviewParams);
        }
    }

    closeModal() {
        this.ngbModal.close();
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const image = event.target.files[0];
            this.hidelogo = true;
            this.file = image;
            console.log(this.file);
        }
    }

    createCategory() {
        this.isAddBtnLoaded = true;
        let file = this.file ? this.file : "";

        if (this.categoryForm.valid) {
            this.categoryService
                .postCategory(this.categoryForm.value, file)
                .subscribe(
                    (res: any) => {
                        if (res && res.status) {
                            this.isAddBtnLoaded = false;
                            this.onClose();
                            this.toastr.success(`${res.message}`);
                            this.getcategoryList()
                        } else {
                            if (res.message) {
                                this.toastr.error(`${res.message}`);
                                this.getcategoryList()
                            } else {
                                this.toastr.error(`domain creattion failed`);
                            }
                            this.isAddBtnLoaded = false;
                        }
                    },
                    (err: any) => {
                        this.onClose();
                        this.toastr.error(`${err}`);
                        console.log(err);
                    }
                );
        } else {
            console.log('invalid');
            this.categoryForm.markAllAsTouched();
        }
    }

    editCategory() {
        this.isEditBtnLoaded = true;
        let file = this.file ? this.file : "";
        // console.log(this.categoryForm.value);
        // console.log(this.categoryForm.valid);
        // return;
        
        if (this.categoryForm.valid) {
            this.categoryService
                .updateCategory(this.categoryForm.value, this.editId, file)
                .subscribe(
                    (res: any) => {
                        if (res && res.status) {
                            this.isEditBtnLoaded = false;
                            this.onClose();
                            this.toastr.success(`${res.message}`);
                            this.getcategoryList()
                        } else {
                            if (res.message) {
                                this.toastr.error(`${res.message}`);
                                this.getcategoryList()
                            } else {
                                this.toastr.error(`domain creattion failed`);
                            }
                            this.isEditBtnLoaded = false;
                        }
                    },
                    (err: any) => {
                        this.onClose();
                        this.toastr.error(`${err}`);
                        console.log(err);
                    }
                );
        } else {
            console.log('invalid');
            this.categoryForm.markAllAsTouched();
        }
    }

    createSettings() {
        this.isReviewSettings = true;
        if (this.productReviewForm.valid) {
            this.categoryService
                .paramSettings(this.productReviewForm.value, this.encryptedid)
                .subscribe(
                    (res: any) => {
                        if (res && res.status) {
                            this.isReviewSettings = false;
                            this.onClose();
                            this.toastr.success(`${res.message}`);
                            this.getcategoryList()
                        } else {
                            if (res.message) {
                                this.toastr.error(`${res.message}`);
                                this.getcategoryList()
                            } else {
                                this.toastr.error(`domain creattion failed`);
                            }
                            this.isReviewSettings = false;
                        }
                    },
                    (err: any) => {
                        this.onClose();
                        this.toastr.error(`${err}`);
                        console.log(err);
                    }
                );
        } else {
            console.log('invalid');
            this.categoryForm.markAllAsTouched();
        }



    }

    getcategoryList() {
        this.categoryService
            .getCategoriesParentChild()
            .subscribe((parentchildcategories: any) => {
                this.parentChildCategory = parentchildcategories;
            });

        this.categoryService.getCategoryList(this.parentChildCategory);
    }


    onClose() {
        this.passEntry.next(this.pages);
        this.ngbModal.close();
    }
}
