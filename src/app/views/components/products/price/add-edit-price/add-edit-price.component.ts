import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-edit-price',
  templateUrl: './add-edit-price.component.html',
  styleUrls: ['./add-edit-price.component.scss']
})
export class AddEditPriceComponent implements OnInit {
  @Input() props: any;
  public title:string;
  public type:string;
  public priceForm:FormGroup;
  public data:any;

  constructor( private ngbModal:NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.priceForm = this.formBuilder.group({
      productId:new FormControl('',[Validators.required]),
      exShowroomPrice:new FormControl('',[Validators.required]),
      RTO:new FormControl('',[Validators.required]),
      insurance:new FormControl('',[Validators.required]),
      fastTag:new FormControl('',[Validators.required]),
      extendedWarrantyCharges:new FormControl('',[Validators.required]),
      amcCharges:new FormControl('',[Validators.required]),
      accessoriesCharges:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
    }
    )
    this.setDialogProps(this.props);
    console.log(this.type)
  }

  get controls(){
    return this.priceForm.controls;
  }

  setDialogProps(dialogdata: any) {
   
    console.log(dialogdata.res);
    this.title = dialogdata.title;
    this.type = dialogdata.type;
    this.data = dialogdata.data;
     if (['edit'].includes(this.type)) {
       this.priceForm.patchValue(this.data);
     }
  }

  closeModal(){
    this.ngbModal.close();
  }

  createPrice(){
    this.priceForm.markAllAsTouched();
    console.log(this.priceForm.value);
  }
  editPrice(){
    this.priceForm.markAllAsTouched();
    console.log(this.priceForm.value);
  }

}
