import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CitiesService } from '../../../../../services/cities/cities.service';
import { ProductService } from '../../../../../services/product/product.service';
import { OfferService } from '../../../../../services/product/offer/offer-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-offer',
  templateUrl: './add-edit-offer.component.html',
  styleUrls: ['./add-edit-offer.component.scss'],
})
export class AddEditOfferComponent implements OnInit {
  @Input() props: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public title: string;
  public type: string;
  public offerForm: FormGroup;
  public data: any;
  private cities: any;
  public products:any;
  public isAddBtnLoaded: boolean = false;
  public isEditBtnLoaded: boolean = false;
  public pages:any;

  constructor(
    private ngbModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private cityService: CitiesService,
    private productService:ProductService,
    private offerService:OfferService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.productService.findAllProducts().subscribe((res: any)=>{
      this.products = res.data;
      console.log(this.products);
    })
    this.cityService.findallCities().subscribe((res: any) => {
      this.cities = res.data;
    });

    this.offerForm = this.formBuilder.group({
      productId: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      cityId: new FormControl('', [Validators.required]),
      offerDetail: new FormControl('', [Validators.required]),
    });
    this.setDialogProps(this.props);
    console.log(this.type);
  }

  get controls() {
    return this.offerForm.controls;
  }

  setDialogProps(dialogdata: any) {
    console.log(dialogdata.res);
    this.title = dialogdata.title;
    this.type = dialogdata.type;
    this.data = dialogdata.data;
    this.pages = dialogdata.page;
    if (['edit'].includes(this.type)) {
      this.offerForm.patchValue(this.data);
    }
  }

  closeModal() {
    this.passEntry.next(this.pages);
    this.ngbModal.close();
  }

  createOffer() {
    if(this.offerForm.valid){
      this.offerService.postOffer(this.offerForm.value).subscribe( (res: any) => {
        if (res.status) {
            this.closeModal();
            this.toastr.success(`${res.message}`);
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
    })
      console.log(this.offerForm.value);
    }
    else{
      this.offerForm.markAllAsTouched();
    }
    
  }
  editOffer() {
    this.offerForm.markAllAsTouched();
    console.log(this.offerForm.value);
  }
}
