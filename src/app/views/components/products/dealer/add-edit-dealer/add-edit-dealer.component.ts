import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-edit-dealer',
  templateUrl: './add-edit-dealer.component.html',
  styleUrls: ['./add-edit-dealer.component.scss']
})
export class AddEditDealerComponent implements OnInit {
  @Input() props: any;
  public title:string;
  public type:string;
  public dealerForm:FormGroup;
  public data:any;

  constructor( private ngbModal:NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dealerForm = this.formBuilder.group({
      productId:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      PINCode:new FormControl('',[Validators.required]),
      isActive:new FormControl('',[Validators.required]),
      testDriveAvailable:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      showroomContact:new FormControl('',[Validators.required]),
      serviceContact:new FormControl('',[Validators.required]),
      testDriveContact:new FormControl('',[Validators.required]),
    }
    )
    this.setDialogProps(this.props);
    console.log(this.type)
  }

  get controls(){
    return this.dealerForm.controls;
  }

  setDialogProps(dialogdata: any) {
    // debugger;
    console.log(dialogdata.res);
    this.title = dialogdata.title;
    this.type = dialogdata.type;
    this.data = dialogdata.data;
     if (['edit'].includes(this.type)) {
       this.dealerForm.patchValue(this.data);
     }
  }

  closeModal(){
    this.ngbModal.close();
  }

  createDealer(){
    this.dealerForm.markAllAsTouched();
    console.log(this.dealerForm.value);
  }
  editDealer(){
    this.dealerForm.markAllAsTouched();
    console.log(this.dealerForm.value);
  }

}

