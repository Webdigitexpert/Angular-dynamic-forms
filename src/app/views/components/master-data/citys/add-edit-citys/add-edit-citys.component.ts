import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CitiesService } from '../../../../../services/cities/cities.service';
import { StateService } from '../../../../../services/state/state.service'

@Component({
  selector: 'app-add-edit-citys',
  templateUrl: './add-edit-citys.component.html',
  styleUrls: ['./add-edit-citys.component.scss'],
})
export class AddEditCitysComponent implements OnInit {
  @Input() props: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public title: string;
  public type: string;
  public cityForm: FormGroup;
  public data: any;
  public pages: any;
  public allStates:any;
  public editId:any;
  public isAddBtnLoaded: boolean = false; //loader 
  public isEditBtnLoaded:boolean = false; //loader

  constructor(
    private ngbModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cityService: CitiesService,
    private stateService:StateService,
  ) {}

  ngOnInit() {
    this.stateService.getallStates().subscribe((result: any) => {
      console.log(result);
      this.allStates = result.data;
    })


    this.cityForm = this.formBuilder.group({
      city: new FormControl('', [Validators.required,Validators.maxLength(100)]),
      aliasName:new FormControl('',[Validators.maxLength(100)]),
      stateId: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
    });
    this.setDialogProps(this.props);
    console.log(this.type);
  }

  get controls() {
    return this.cityForm.controls;
  }

  setDialogProps(dialogdata: any) {
    // debugger
    this.title = dialogdata.title;
    this.type = dialogdata.type;
    this.data = dialogdata.data;
    this.editId = dialogdata.type=='edit' ? dialogdata.data.id:``;
    this.pages = dialogdata.page;

    if (['edit'].includes(this.type)) {
      this.cityForm.patchValue(this.data);
    }
  }

  closeModal() {
    this.ngbModal.close();
  }
  createCity() {
    this.isAddBtnLoaded = true;
    console.log(this.cityForm.value);
    if (this.cityForm.valid) {
      this.cityService
        .createCity(this.cityForm.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res && res.status) {
              this.toastr.success(`${res.message}`);
              this.isAddBtnLoaded = false;
              this.onClose();
            } else {
              if (res.message) {
                this.toastr.error(`${res.message}`);
              } else {
                this.toastr.error(`Create city Failed`);
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
      this.cityForm.markAllAsTouched();
      this.isAddBtnLoaded = false;
    }
  }

  editCity() {
    this.isEditBtnLoaded = true;
    console.log(this.cityForm.value);
    if (this.cityForm.valid) {
      this.cityService
        .editCity(this.cityForm.value,this.editId)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res && res.status) {
              this.toastr.success(`${res.message}`);
              this.isEditBtnLoaded = false;
              this.onClose();
            } else {
              if (res.message) {
                this.toastr.error(`${res.message}`);
              } else {
                this.toastr.error(`Update city Failed`);
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
      this.cityForm.markAllAsTouched();
    }
  }

  onClose() {
    this.passEntry.next(this.pages);
    this.ngbModal.close();
  }
}
