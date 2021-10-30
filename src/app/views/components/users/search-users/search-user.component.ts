import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as $ from 'jquery';
import { DeletemodalComponent } from '../../common/deletemodal/deletemodal.component';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { UserService } from 'src/app/services/users/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//declare var $: any;
@Component({
  selector: 'app-search-users',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit, AfterViewInit {
  trimOPtion: '' | 'blur' | false = '';
  public searchKey: any;
  public isActive: any = '';
  service: any = {
    page: 1,
    pageSize: 4,
    maxSize: 5,
  };
  public editid: any;
  public isPagination: boolean = true;
  public userData;
  public users: any;
  public sortOrder: boolean = false;
  public sortDirection: any = '';
  public sortColumn: any;
  public ordersort: any;

  public isactiveUrl: any;

  public parameters: any; //passing parameters
  public sortingDirection: any;
  public isLoadedTable:boolean=true;

  userList: any;
  collectionSize: any;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.refreshCountries();
  }

  sort(data: any) {
    this.sortOrder = !this.sortOrder;
    this.sortDirection = this.sortOrder ? `asc` : `desc`;
    this.sortColumn = data;
    let sortDirection = this.sortOrder ? `asc` : `desc`;
    this.sortingDirection = this.sortOrder ? `asc` : `desc`;
    let sortData = data;
    let totalparameters = `&sortColumn=${sortData}&sortOrder=${sortDirection}`;
    this.refreshCountries(totalparameters);
  }

  ngAfterViewInit() {}

  refreshCountries(active?: any) {
    debugger;
    //pagination active inactive
    if (active) {
      let searchKey = this.searchKey ? `&name=${this.searchKey}` : '';
      let activeorInactive = this.isActive ? `&active=${this.isActive}` : '';
      let sortingOptions =
        this.sortColumn && this.sortDirection
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortDirection}`
          : `&sortColumn=createdDate&sortOrder=desc`;

      this.userService
        .getUsers(
          `page=${this.service.page}${searchKey}${activeorInactive}${sortingOptions}`
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            this.userList = res.data;
            this.collectionSize = res.totalCount;
            console.log(this.userList);
            this.isLoadedTable = false;
          },
          (err: any) => {
            console.log(err);
          }
        );
    }
    //without active inactive filter
    else {
      let searchbyName = this.searchKey ? `&name=${this.searchKey}` : ``;
      let activeInactive = this.isActive ? `&active=${this.isActive}` : ``;
      let sortparameters =
        this.sortColumn || this.sortDirection
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortingDirection}`
          : `&sortColumn=createdDate&sortOrder=desc`;

      let totalparameters = `page=${this.service.page}${sortparameters}${searchbyName}${activeInactive}`;
      this.userService.getUsers(`${totalparameters}`).subscribe(
        (res: any) => {
          this.userList = res.data;
          this.collectionSize = res.totalCount;
          console.log(this.userList);
          this.isLoadedTable = false;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  opendialog(data: any) {
    const modalRef = this.modalService.open(AddEditUserComponent);
    modalRef.componentInstance.props = {
      title: 'Add User',
      type: 'add',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.userService.getUsers(res).subscribe((result: any) => {
        console.log(result);
        this.refreshCountries();
      });
    });
  }

  editUser(res: any) {
    const modalRef = this.modalService.open(AddEditUserComponent);
    modalRef.componentInstance.props = {
      title: 'Edit User',
      type: 'edit',
      data: res,
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCountries();
      console.log(res);
    });
  }

  deleteUser(res: any) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deleteUser',
      data: res,
      categoryName: 'User',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCountries();
      console.log(res);
    });
  }

  activateDeactivate(res) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deactivateUser',
      page: `page=${this.service.page}`,
      data: res,
      categoryName: 'User',
      fullTitle: `Want to ${res.active ? 'deactivate' : 'activate'} User`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCountries();
      console.log(res);
    });
  }

  getData(data) {
    if (data.target.value === '') {
      this.isPagination = true;
      console.log(data.target.value);
      // this.refreshCountries();
    }
    console.log(data.target.value);
  }

  userStatus() {
    // debugger
    this.sortDirection = '';
    let searchKey = this.searchKey ? `&name=${this.searchKey}` : '';
    let activeorInactive = this.isActive ? `&active=${this.isActive}` : '';
    let totalSearch = `${searchKey}${activeorInactive}`;
    this.refreshCountries(totalSearch);
  }
}
