import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ManufacturerService } from '../../../../services/manufacturer/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from "../../../../services/categories/categories.service";
import { DomainService } from 'src/app/services/domain/domain.service';
import { element } from 'protractor';

@Component({
    selector: 'app-add-edit-manufacturers',
    templateUrl: './add-edit-manufacturers.component.html',
    styleUrls: ['./add-edit-manufacturers.component.scss']
})
export class AddEditManufacturersComponent implements OnInit {
    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    public title: string;
    public type: string;
    public data: any;
    public manufacturerForm: FormGroup;

    public domains: any;
    public parentCategories: any;

    public pages: any;
    public editId: any;
    public manufacturerLogo: any;

    public file: any;// image

    public parentCategory: any;// image
    public setSelectedcategory: any;// image

    public isAddBtnLoaded: boolean = false;
    public isEditBtnLoaded: boolean = false;
    public multiselectDomain: any;//to send to muliselect dropdown component;
    public multiselectarray: any
    public multiselectDomainArr = [];


    constructor(
        private ngbModal: NgbActiveModal,
        private manufacturerService: ManufacturerService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private domainService: DomainService,
        private categoryService: CategoriesService,
    ) { }

    ngOnInit(): void {
        this.manufacturerForm = this.formBuilder.group({
            manufacturerName: new FormControl('', [Validators.required]),
            // manufacturerLogo: new FormControl('', [Validators.required]),
            description: new FormControl('', []),
            // selectCategory: new FormControl('', [Validators.required]),
            metaTitle: new FormControl('', []),
            metaDescription: new FormControl('', []),
            parentCategory: new FormControl('', []),
            domainId: new FormControl('', []),
        });
        this.setDialogProps(this.props);

        this.domainService.getallDomains().subscribe((domain) => {
            this.domains = domain.data;
            this.multiselectDomain = {
                data: this.domains,
                bindName: 'domainName',
                bindValue: 'id'
            }
        })
        this.categoryService.getallCategories().subscribe((category) => {
            this.parentCategories = category.data;
        })
    }

    getselectedCategory(event: any) {
        this.parentCategory = event;
    }
    getmultipleDomains(data: any) {

    }

    closeModal() {
        this.passEntry.next(this.pages);
        this.ngbModal.close();
    }

    setDialogProps(dialogdata: any) {
        console.log(dialogdata);
        
        this.title = dialogdata.title;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.pages = dialogdata.page;
        if (['edit'].includes(this.type)) {
            this.editId = dialogdata.data.id;
            this.setSelectedcategory = dialogdata.data.parentCategory;
            this.manufacturerLogo = dialogdata.data.manufacturerLogo ? dialogdata.data.manufacturerLogo.url : '-';
            this.manufacturerForm.patchValue(this.data);
        }
    }


    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const image = event.target.files[0];
            this.file = image;
        }
    }

    createManufacturer() {
        this.isAddBtnLoaded = true;
        if (this.parentCategory) {
            this.manufacturerForm.get('parentCategory').setValue(this.parentCategory);
        }
        if (this.manufacturerForm.valid) {
            this.manufacturerService.postManufacturer(this.manufacturerForm.value, this.file).subscribe(
                (res: any) => {
                    if (res.status) {
                        this.closeModal();
                        this.toastr.success(`${res.message}`);
                        this.isAddBtnLoaded = false;
                    } else {
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Manufacturer Not Added Successfully`);
                        }
                        this.isAddBtnLoaded = false;
                    }
                },
                (err: any) => {
                    this.closeModal();
                    this.toastr.error(`${err}`);
                    console.log(err);
                }
            );
        } else {
            console.log('invalid');
            this.manufacturerForm.markAllAsTouched();
            this.isAddBtnLoaded = false;
        }
    }

    editManufacturer() {
        debugger
        this.isEditBtnLoaded = true;
        if (this.parentCategory) {
            this.manufacturerForm.get('parentCategory').setValue(this.parentCategory);
        }

        if (this.manufacturerForm.valid) {
            this.manufacturerService.updateManufacturer(this.manufacturerForm.value, this.editId, this.file).subscribe(
                (res: any) => {
                    if (res.status) {
                        this.closeModal();
                        this.toastr.success(`${res.message}`);
                        this.isEditBtnLoaded = false;
                    } else {
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Manufacturer Not Edited`);
                        }
                        this.isEditBtnLoaded = false;
                    }
                },
                (err: any) => {
                    this.closeModal();
                    this.toastr.error(`${err}`);
                    console.log(err);
                }
            );
        } else {
            console.log('invalid')
            this.manufacturerForm.markAllAsTouched();
            this.isEditBtnLoaded = false;
        }
    }

}
