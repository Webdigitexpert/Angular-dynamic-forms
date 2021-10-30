import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AttributeSetService } from 'src/app/services/attributeSet/attribute-set.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from "../../../../services/categories/categories.service";
import { DomainService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-add-edit-attribute-sets',
  templateUrl: './add-edit-attribute-sets.component.html',
  styleUrls: ['./add-edit-attribute-sets.component.scss']
})
export class AddEditAttributeSetsComponent implements OnInit {
  @Input() props: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public title: string;
  public type: string;
  public data: any;
  public attributeSetForm: FormGroup;

  public domains: any;
  public parentCategories: any;

  public pages: any;
  public editId: any;
  public attributeSetLogo: any;

  public file: any;// image

  public parentCategory: any;// image
  public setSelectedcategory: any;// image

  public isAddBtnLoaded: boolean = false;
  public isEditBtnLoaded: boolean = false;
  public variantCheck:any;
  public categoryaddedit:any;
  public childCategory=[];
  

  constructor(
      private ngbModal: NgbActiveModal,
      private attributeSetService: AttributeSetService,
      private toastr: ToastrService,
      private formBuilder: FormBuilder,
      private domainService: DomainService,
      private categoryService: CategoriesService,
  ) { }

  ngOnInit(): void {
    debugger
    this.categoryService.getCategoriesParentChild().subscribe((res)=>{
        this.categoryaddedit = res.data;
        console.log(res);
    },(err:any)=>{
        console.log(err)
    })
    this.domainService.getallDomains().subscribe((domain) => {
        this.domains = domain.data;
    })
    this.categoryService.getallCategories().subscribe((category) => {
        this.parentCategories = category.data;
    })

      this.attributeSetForm = this.formBuilder.group({
          attributeSetName: new FormControl('', [Validators.required]),
          description: new FormControl('', []),
          metaTitle: new FormControl('', []),
          metaDescription: new FormControl('', []),
          categoryDescriptionIds: new FormControl('', []),
          domainMaster: new FormControl('', []),
          masterVarientFlag:new FormControl('M',[])
      });
      this.setDialogProps(this.props);
      
   
  }

  getselectedCategory(event : any){
      this.parentCategory = event;
  }

  closeModal() {
      this.passEntry.next(this.pages);
      this.ngbModal.close();
  }

  setDialogProps(dialogdata: any) {
      debugger
      this.title = dialogdata.title;
      this.type = dialogdata.type;
      this.data = dialogdata.data;
      this.pages = dialogdata.page;
      if (['edit'].includes(this.type)) {
        this.attributeSetForm.patchValue(this.data);
          this.editId = dialogdata.data.encryptedId;
          this.variantCheck = dialogdata.data.masterVarientFlag;
          this.setSelectedcategory = this.data.categoryDescriptionIds ? dialogdata.data.categoryDescriptionIds.split(','):``;
        //   this.attributeSetLogo = dialogdata.data.attributeSetLogo.url ? dialogdata.data.attributeSetLogo.url : ``;
          
      }
  }


  onFileSelect(event) {
      if (event.target.files.length > 0) {
          const image = event.target.files[0];
          this.file = image;
      }
  }

  createAttributeSet() {
    //   debugger
      this.isAddBtnLoaded = true;
      if (this.parentCategory) {
          this.attributeSetForm.get('parentCategory').setValue(this.parentCategory.toString());
      }
      if (this.attributeSetForm.valid) {
          this.attributeSetService.postAttributeSet(this.attributeSetForm.value, this.file).subscribe(
              (res: any) => {
                  if (res.status) {
                      this.closeModal();
                      this.toastr.success(`${res.message}`);
                      this.isAddBtnLoaded = false;
                  } else {
                      if (res.message) {
                          this.toastr.error(`${res.message}`);
                      } else {
                          this.toastr.error(`AttributeSet Not Added Successfully`);
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
          this.attributeSetForm.markAllAsTouched();
          this.isAddBtnLoaded = false;
      }

      console.log(this.attributeSetForm.value)
  }

  editAttributeSet() {
    //   debugger
      this.isEditBtnLoaded = true;
      if (this.parentCategory) {
          this.attributeSetForm.get('parentCategory').setValue(this.parentCategory.toString());
      }

      if (this.attributeSetForm.valid) {
          this.attributeSetService.updateAttributeSet(this.attributeSetForm.value, this.editId, this.file).subscribe(
              (res: any) => {
                  if (res.status) {
                      this.closeModal();
                      this.toastr.success(`${res.message}`);
                      this.isEditBtnLoaded = false;
                  } else {
                      if (res.message) {
                          this.toastr.error(`${res.message}`);
                      } else {
                          this.toastr.error(`AttributeSet Not Edited`);
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
          this.attributeSetForm.markAllAsTouched();
          this.isEditBtnLoaded = false;
      }
      console.log(this.attributeSetForm.value)
  }

}