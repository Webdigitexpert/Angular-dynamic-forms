import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DomainService } from '../../../../services/domain/domain.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-domain',
  templateUrl: './add-edit-domain.component.html',
  styleUrls: ['./add-edit-domain.component.scss'],
})
export class AddEditDomainComponent implements OnInit {
  @Input() props: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public title: string;
  public type: string;
  public domainForm: FormGroup;
  public data: any;
  public pages: any;
  public editDomainId: any;
  public isAddBtnLoaded: boolean = false; //loader 
  public isEditBtnLoaded:boolean = false; //loader

  constructor(
    private ngbModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private domainService: DomainService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.domainForm = this.formBuilder.group({
      domainName: new FormControl('', [Validators.required]),
      domainUrl: new FormControl('', [Validators.required]),
    });
    this.setDialogProps(this.props);
    console.log(this.type);
  }

  get controls() {
    return this.domainForm.controls;
  }

  setDialogProps(dialogdata: any) {

    this.title = dialogdata.title;
    this.type = dialogdata.type;
    this.data = dialogdata.data;
    this.pages = dialogdata.page;
    this.editDomainId = this.data.id;
    if (['edit'].includes(this.type)) {
      this.domainForm.patchValue(this.data);
    }
  }

  closeModal() {
    this.onClose()
  }
  createDomain() {
    this.isAddBtnLoaded = true;
    if (this.domainForm.valid) {
      this.domainService.postDomains(this.domainForm.value).subscribe(
        (res: any) => {
          if (res && res.status) {
            this.isAddBtnLoaded = false;
            this.onClose();
            this.toastr.success(`${res.message}`);
          } else {
            if (res.message) {
              this.toastr.error(`${res.message}`);
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
      console.log('invalid')
      this.domainForm.markAllAsTouched();
    }
  }

  editDomain() {
    this.isEditBtnLoaded =true;
    if (this.domainForm.valid) {
      this.domainService.updateDomains(this.domainForm.value, this.editDomainId).subscribe(
        (res: any) => {
          console.log(res)
          if (res && res.status) {
            this.isEditBtnLoaded =false;
            this.onClose();
            console.log('updated');
            this.toastr.success(`${res.message}`);
          } else {
            if (res.message) {
              console.log('updated fail status false mesage');
              this.toastr.error(`${res.message}`);
            } else {
              console.log('updated failed ');
              this.toastr.error(`domain creattion failed`);
            }
            this.isEditBtnLoaded =false;
          }
        },
        (err: any) => {
          this.onClose();
          this.toastr.error(`${err}`);
          console.log(err);
        }
      );
    } else {
      this.domainForm.markAllAsTouched();
    }
  }

  onClose() {
    this.passEntry.next(this.pages);
    this.ngbModal.close();
  }
}
