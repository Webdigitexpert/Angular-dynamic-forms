import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { StateService } from 'src/app/services/state/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-states',
  templateUrl: './add-edit-states.component.html',
  styleUrls: ['./add-edit-states.component.scss']
})
export class AddEditStatesComponent implements OnInit {
  @Input() props: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public title: string;
  public type: string;
  public stateForm: FormGroup;
  public data: any;
  public pages: any;
  public editStateId: any;
  public isAddBtnLoaded: boolean = false; //loader 
  public isEditBtnLoaded:boolean = false; //loader

  constructor(
    private ngbModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private stateService: StateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.stateForm = this.formBuilder.group({
      state: new FormControl('', [Validators.required,Validators.maxLength(100)]),
      active: new FormControl(''),
    });
    this.setDialogProps(this.props);
    console.log(this.type);
  }

  get controls() {
    return this.stateForm.controls;
  }

  setDialogProps(dialogdata: any) {

    this.title = dialogdata.title;
    this.type = dialogdata.type;
    this.data = dialogdata.data;
    this.pages = dialogdata.page;
    if (['edit'].includes(this.type)) {
      this.stateForm.patchValue(this.data);
      this.editStateId = this.data.id;
      this.stateForm.controls['active'].setValue(this.data.active);
    }
  }

  closeModal() {
    this.onClose()
  }
  createState() {
    this.isAddBtnLoaded = true;
    if (this.stateForm.valid) {
      this.stateService.postStates(this.stateForm.value).subscribe(
        (res: any) => {
          if (res && res.status) {
            this.isAddBtnLoaded = false;
            this.onClose();
            this.toastr.success(`${res.message}`);
          } else {
            if (res.message) {
              this.toastr.error(`${res.message}`);
            } else {
              this.toastr.error(`state creattion failed`);
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
      this.stateForm.markAllAsTouched();
    }
  }

  editState() {
    this.isEditBtnLoaded = true;
    if (this.stateForm.valid) {
      this.stateService.updateStates(this.stateForm.value, this.editStateId).subscribe(
        (res: any) => {
          console.log(res)
          if (res && res.status) {
            this.isEditBtnLoaded = false;
            this.onClose();
            console.log('updated');
            this.toastr.success(`${res.message}`);
          } else {
            if (res.message) {
              console.log('updated fail status false mesage');
              this.toastr.error(`${res.message}`);
            } else {
              console.log('updated failed ');
              this.toastr.error(`state creattion failed`);
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
      this.stateForm.markAllAsTouched();
    }
  }

  onClose() {
    this.passEntry.next(this.pages);
    this.ngbModal.close();
  }
}
