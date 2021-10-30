import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { UserService } from '../../../../services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { DomainService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  @Input() props: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @ViewChild('multiSelect') multiSelect;
  public cb: any;
  public access: string;
  all = [
    {
      id: 1,
      value: 'read',
      checked: false,
    },
    {
      id: 2,
      value: 'write',
      checked: false,
    },
  ];
  cd: string;
  selected = [];
  public finalCheckedData;
  public title: string;
  public type: string;
  public userForm: FormGroup;
  public userFormEdit: FormGroup;
  public data: any;
  public checkeditems: any = [];
  public checkboxerr: boolean = true;
  public editid: any;
  public ispasswordEdit: boolean;
  public text = ""

  public pages: any; //page nos from parent

  public pageno: any; //from parent

  public permissionlist: any;

  public domainList: any;

  public checkPermission: any;

  public totalPermissions: any;

  public editIscheck:any;// to display permission

  public iseditChecked:boolean;

  //by default editing permissions
  public isReadaccess: boolean = false;
  public isWriteaceess: boolean = false;

  public editDomainDropdown=[];//to apply patch value to domain dropdown
  selectedItemsList: { id: number; name: string; checked: boolean }[];

  public isAddBtnLoaded: boolean = false; //loader 
  public isEditBtnLoaded:boolean = false; //loader
  

  constructor(
    private ngbModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private domainService: DomainService
  ) {}

  setValue(e) {
    var SomeData: any = document.getElementsByName(e.target.name);
    var newArr = [];
    for (var i = 0; i < SomeData.length; i++) {
      if (SomeData[i].checked) {
        var CheckedData = SomeData[i].value;
        newArr.push(CheckedData);
        this.finalCheckedData = newArr.join(',');
      }
    }
    console.log(this.finalCheckedData);
  }


changed(event?: any) {
  console.log(event)
  this.text = event ? 'read,write':'read';
  
}



  isPasswordEditable(data: any) {
    if (data.target.checked) {
      this.ispasswordEdit = true;
    } else {
      this.ispasswordEdit = false;
    }
  }

  ngOnInit() {

    this.changed()
    this.domainService.getallDomains().subscribe(
      (res: any) => {
        this.domainList = res.data;
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.userForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        userName: new FormControl('', [
          Validators.required,
          Validators.maxLength(100),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10)
        ]),
        confirmpassword: new FormControl('', [Validators.required]),
        userDomain: new FormControl('', [Validators.required]),
        userrole: new FormControl('', [Validators.required]),
      },
      {
        validator: this.MustMatch('password', 'confirmpassword'),
      }
    );

    console.log(this.userForm.controls)

    this.userFormEdit = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      editpassword: new FormControl('', [Validators.minLength(6),Validators.maxLength(10)]),
      domain: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      checkboxes: this.formBuilder.array([]),
    });
    this.setDialogProps(this.props);
    console.log(this.type);
  }

  get controls() {
    return this.userForm.controls;
  }

  get editcontrols() {
    return this.userFormEdit.controls;
  }
  setDialogProps(dialogdata: any) {
    // debugger
    this.pages = dialogdata.page;
    this.title = dialogdata.title;
    this.type = dialogdata.type;
    this.data = dialogdata.type =='edit' ? dialogdata.data :``;
    this.editid =dialogdata.type =='edit' ? dialogdata.data.id : ``;
    this.editDomainDropdown = dialogdata.type =='edit' ?  (dialogdata.data.domain).split(',') : ``;
    
    if(dialogdata.type =='edit' && dialogdata.data.permission && dialogdata.data.permission =='read'){
      this.text = 'read';
      this.iseditChecked = false;
    }
    else if(dialogdata.type =='add'){
      this.text = 'read';
    }
    else{
      this.text='read,write';
      this.iseditChecked = true;
    }
    this.checkPermission = dialogdata.type =='edit' ? dialogdata.data.permission:``;

    if (['edit'].includes(this.type)) {
      console.log(this.all);
      this.userFormEdit.patchValue({
        name: this.data.name,
        username: this.data.username,
        domain: this.editDomainDropdown,
        role: this.data.role,
      });
      console.log(this.checkPermission);
      this.selected = this.data.permission;
      console.log(this.selected);
    }
  }

  editControls() {
    return this.userFormEdit.controls;
  }

  closeModal() {
    this.ngbModal.close();
  }
  createUser() {
  this.isAddBtnLoaded = true;
    if (this.userForm.valid) {
      this.userService.postUser(this.userForm.value, this.text).subscribe(
        (res: any) => {
          console.log(res);
          if (res && res.status) {
            this.toastr.success(`${res.message}`);
            this. isAddBtnLoaded = false;
            this.onClose();
           
          } else {
            if (res.message) {
              this.toastr.error(`${res.message}`);
              
            } else {
              this.toastr.error(`Create user Failed`);
            }
            this. isAddBtnLoaded = false;
          }
        },
        (err: any) => {
          this.onClose();
          this.toastr.error(`${err}`);
          console.log(err);
        }
      );
    } else {
      this.userFormEdit.markAllAsTouched();
    }
  }

  editUser() {
    this.isEditBtnLoaded = true;
    if (this.userFormEdit.valid) {
      console.log(this.cd);
      this.userService
        .updateUser(this.userFormEdit.value, this.editid, this.text)
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
                this.toastr.error(`Update Failed`);
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
      this.userFormEdit.markAllAsTouched();
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onClose() {
    this.passEntry.next(this.pages);
    this.ngbModal.close();
  }
  
}
