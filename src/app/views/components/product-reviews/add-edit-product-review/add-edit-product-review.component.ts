import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/services/review/review.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
    selector: 'app-add-edit-product-review',
    templateUrl: './add-edit-product-review.component.html',
    styleUrls: ['./add-edit-product-review.component.scss']
})
export class AddEditProductReviewComponent implements OnInit {
    @Input() props: any;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    public title: string;
    public type: string;
    public reviewForm: FormGroup;
    public data: any;

    public pages: any;
    public editId: any;
    finalArr:any
    tagsObjectValue:any = []
    tagsArrayValue:any=[]
    
    public isAddBtnLoaded: boolean = false;
    public isEditBtnLoaded: boolean = false;
    public status ="Approved";
    public products:any;
    public tagsinput:any=[];
    public tagsinputobj:any;

    constructor(
        private ngbModal: NgbActiveModal, 
        private formBuilder: FormBuilder, 
        private reviewservice: ReviewService, 
        private toastr: ToastrService,
        private productService:ProductService
    ) { }

    ngOnInit(): void {
        this.productService.findAllProducts().subscribe((res:any)=>{
            this.products = res.data;
            console.log(res);
        })
        this.reviewForm = this.formBuilder.group({
            productId: new FormControl('', []),
            reviewText: new FormControl('', [Validators.required]),
            reviewRating: new FormControl('', [Validators.required]),
            make: new FormControl('', [Validators.required]),
            model: new FormControl('', [Validators.required]),
            tags: new FormControl('', [Validators.required]),
            reviewBy: new FormControl('', [Validators.required]),
            createdDate: new FormControl('', []),
            status:new FormControl('',[])
        })
        this.setDialogProps(this.props)
    }

    setDialogProps(dialogdata: any) {
        this.title = dialogdata.title;
        this.type = dialogdata.type;
        this.data = dialogdata.data;
        this.pages = dialogdata.page;
        if (['edit'].includes(this.type)) {
            this.editId = dialogdata.data.encryptedId;
            this.reviewForm.patchValue(this.data);
            if(this.data.tags) {
                this.tagsinputobj = this.data.tags;
                let arr = this.data.tags.split(',');
                console.log(arr)
                this.reviewForm.get('tags').patchValue(arr)
            }
            this.reviewForm.get('createdDate').patchValue(this.formatDate(this.data.updatedDate ? this.data.updatedDate : this.data.createdDate));
            // this.reviewForm.get('createdDate').patchValue((this.data.updatedDate ? this.data.updatedDate : this.data.createdDate));
        }
        console.log('dialogdata.res', dialogdata);
        
    }


    private formatDate(date) {
        const d = new Date(date);
        console.log(d)
        let month = '' + (d.getMonth() + 1);
        console.log(month)
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return d;

      }


    createReview() {
        this.isAddBtnLoaded = true;
        if (this.reviewForm.valid) {
            this.reviewForm.value.tags.map((tag) => {
                if(tag) {
                    this.tagsinput.push(tag.value)
                }
            })
            console.log(this.tagsinput)
            console.log(this.reviewForm.value);
            this.reviewForm.get('tags').setValue(this.tagsinput);
            console.log(this.reviewForm.value);
            this.reviewservice.postReviews(this.reviewForm.value,this.status).subscribe(
                (res: any) => {
                    if (res.status) {
                        this.closeModal();
                        this.toastr.success(`${res.message}`);
                        this.tagsinput =[];
                        this.isAddBtnLoaded = false;
                    } else {
                        if (res.message) {
                            this.toastr.error(`${res.message}`);
                        } else {
                            this.toastr.error(`Reviews Not Added Successfully`);
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
            this.reviewForm.markAllAsTouched();
            this.isAddBtnLoaded = false;
        }
    }
    editReview() {
        // this.reviewForm.value.tags.map((tag:any) => {
        //     if(typeof(tag)) {
        //         console.log('object');
        //     }
        //     if(tag.value !="") {
        //         this.tagsinput.push(tag.value);
        //     }
        // })
        // this.isEditBtnLoaded = true;
        if (this.reviewForm.valid) {
            console.log(this.reviewForm.value.tags)
            this.reviewForm.value.tags.map((tag:any)=>{
                console.log(typeof(tag));
                if(typeof(tag)=='string') {
                    this.tagsArrayValue.push(tag)
                } else if(typeof(tag)=='object') {
                    this.tagsObjectValue.push(tag.value)
                }
            });
            this.tagsinput = [...this.tagsArrayValue, ...this.tagsObjectValue]
            // console.log(this.tagsinput.toString())
        //     let obj ={}
        //     let arr1 = []
        //     arr1.push(this.tagsinput)
        //     console.log(arr1)
        //     obj = {...this.tagsinputobj,...arr1};
        //     console.log(this.tagsinput)
        //     console.log(this.reviewForm.value);
            this.reviewForm.get('tags').setValue(this.tagsinput);
            console.log(this.reviewForm.value);

            this.reviewservice.updateReviews(this.reviewForm.value,this.status, this.editId).subscribe(
                (res: any) => {
                    if (res.status) {
                        this.closeModal();
                        this.toastr.success(`${res.message}`);
                        this.tagsinput = [];
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
            this.reviewForm.markAllAsTouched();
            this.isEditBtnLoaded = false;
        }
    }

    closeModal() {
        this.passEntry.next(this.pages);
        this.ngbModal.close();
    }


}
