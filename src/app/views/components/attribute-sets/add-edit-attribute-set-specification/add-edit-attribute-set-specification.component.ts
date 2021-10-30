import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AttributeSetSpecificationService } from 'src/app/services/attributeSetSpecification/attribute-set-specification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-attribute-set-specification',
  templateUrl: './add-edit-attribute-set-specification.component.html',
  styleUrls: ['./add-edit-attribute-set-specification.component.scss']
})
export class AddEditAttributeSetSpecificationComponent implements OnInit {
  @Input() props: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public title: string;
  public type: string;
  public attributeSetSpecificationForm: FormGroup;
  public data: any;
  public pages: any;
  public editAttributeSetSpecificationId: any;
  public checkeditems:any =[];
  public checkboxerr:boolean =false;
  public isUnitChecked: boolean = false;

  public attributeSetId:any;
  public editid:any // to edit record id of attribute setId

  constructor(
    private ngbModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private attributeSetSpecificationService: AttributeSetSpecificationService,
    private toastr: ToastrService
  ) { }

  checkboxVal(ischeck:any,data:any){
    if(ischeck.target.checked){
      this.isUnitChecked = true;
      this.checkeditems.push(data);
      console.log(this.checkeditems);
      this.checkboxerr =false;
    }
    else{
      this.isUnitChecked = false;
      this.attributeSetSpecificationForm.controls['unit'].setValue('');
      this.checkeditems.pop(data);
      console.log(this.checkeditems)
    }
  }

  ngOnInit() {
    this.attributeSetSpecificationForm = this.formBuilder.group({
      attributeLabel: new FormControl('', [Validators.required]),
      attributeSetId: new FormControl(''),
      isAlphaNumeric: new FormControl('false'),
      isFacet: new FormControl(''),
      isMandatory: new FormControl(''),
      unit: new FormControl(''),
      isUnit:new FormControl(''),
    });
    this.setDialogProps(this.props);
    console.log(this.type);
  }

  get controls() {
    return this.attributeSetSpecificationForm.controls;
  }

  setDialogProps(dialogdata: any) {
    // debugger
    this.title = dialogdata.title;
    this.type = dialogdata.type;
    this.data = dialogdata.data;
    this.pages = dialogdata.page;
    this.attributeSetId = this.type=='edit' ? this.data.attributeSetId:``;
    this.editid = this.type =='edit' ? this.data.attributeSetMaster.encryptedId:``;
    if (['edit'].includes(this.type)) {
      this.editAttributeSetSpecificationId = this.data.encryptedId;
      this.attributeSetSpecificationForm.patchValue(this.data);
      if(this.data.unit)
      {
        this.isUnitChecked = true;
        this.attributeSetSpecificationForm.controls['isUnit'].setValue(true);
        this.attributeSetSpecificationForm.controls['isAlphaNumeric'].setValue(this.data.isAlphaNumeric);
      }
      this.attributeSetSpecificationForm.controls['attributeSetId'].setValue(JSON.parse(sessionStorage.getItem('attribute_Set_EncryptedId')));
    }
    else{
      this.attributeSetSpecificationForm.controls['attributeSetId'].setValue(this.data);
    }
  }

  closeModal() {
    this.onClose()
  }
  createAttributeSetSpecification() {
    if (this.attributeSetSpecificationForm.valid) {
      this.attributeSetSpecificationService.postAttributeSetSpecifications(this.attributeSetSpecificationForm.value).subscribe(
        (res: any) => {
          if (res.status) {
            this.onClose();
            this.toastr.success(`${res.message}`);
          } else {
            if (res.message) {
              this.toastr.error(`${res.message}`);
            } else {
              this.toastr.error(`attributeSetSpecification creattion failed`);
            }
          }
        },
        (err: any) => {
          this.onClose();
          this.toastr.error(`${err}`);
          console.log(err);
        }
      );
    } else {
      console.log('invalid')
      this.attributeSetSpecificationForm.markAllAsTouched();
    }
  }

  editAttributeSetSpecification() {
    // debugger
    if (this.attributeSetSpecificationForm.valid) {
      this.attributeSetSpecificationService.updateAttributeSetSpecifications(this.attributeSetSpecificationForm.value, this.editid,this.editAttributeSetSpecificationId).subscribe(
        (res: any) => {
          console.log(res)
          if (res.status) {
            this.onClose();
            console.log('updated');
            this.toastr.success(`${res.message}`);
          } else {
            if (res.message) {
              console.log('updated fail status false mesage');
              this.toastr.error(`${res.message}`);
            } else {
              console.log('updated failed ');
              this.toastr.error(`attributeSetSpecification creattion failed`);
            }
          }
        },
        (err: any) => {
          this.onClose();
          this.toastr.error(`${err}`);
          console.log(err);
        }
      );
    } else {
      this.attributeSetSpecificationForm.markAllAsTouched();
    }
  }

  onClose() {
    this.passEntry.next(this.pages);
    this.ngbModal.close();
  }
}
