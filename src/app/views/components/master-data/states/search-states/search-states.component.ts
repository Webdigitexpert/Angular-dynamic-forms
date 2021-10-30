import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { DeletemodalComponent } from 'src/app/views/components/common/deletemodal/deletemodal.component';
import {
  SortableDirective,
  SortEvent,
} from 'src/app/services/directives/sortable.directive';
import { SortingService } from 'src/app/services/sorting.service';
import { AddEditStatesComponent } from '../add-edit-states/add-edit-states.component';
import { StateService } from 'src/app/services/state/state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-states',
  templateUrl: './search-states.component.html',
  styleUrls: ['./search-states.component.scss'],
})
export class SearchStatesComponent implements OnInit, AfterViewInit {
  service: any = {
    page: 1,
    pageSize: 4,
    maxSize: 5,
  };
  public stateData;
  public isUp: boolean = false;
  public states: any;
  stateList: any = [];
  collectionSize: any;
  public sortOrder: boolean = false;
  public sortDirection: any;

  public sortColumn: any;
  public ordersort: any; //get request all
  public isLoadedTable:boolean =true;

  constructor(
    private dialogService: DialogServiceService,
    private sortingService: SortingService,
    private stateService: StateService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.refreshStates();
  }

  ngAfterViewInit() {}

  refreshStates(isSort?: any) {
    if (isSort) {
      this.stateService
        .getStates(`page=${this.service.page}${isSort}`)
        .subscribe(
          (res: any) => {
            this.stateList = res.data;
            this.collectionSize = res.totalCount;
            this.isLoadedTable = false;
          },
          (err: any) => {
            console.log(err);
          }
        );
    } else {
      let sortingoptions =
        this.sortColumn && this.sortDirection
          ? `sortColumn=${this.sortColumn}&sortOrder=${this.sortDirection}`
          : `sortColumn=createdDate&sortOrder=desc`;
      let pageparameters = `${sortingoptions}&page=${this.service.page}`;

      this.stateService.getStates(pageparameters).subscribe(
        (res: any) => {
          this.stateList = res.data;
          this.collectionSize = res.totalCount;
          this.isLoadedTable = false;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  sort(data: any) {
    this.sortOrder = !this.sortOrder;
    this.sortDirection = this.sortOrder ? `asc` : `desc`;
    this.sortColumn = data;

    let sortDirection = this.sortOrder ? `asc` : `desc`;
    let sortColumn = data;
    let parameters = `&sortColumn=${sortColumn}&sortOrder=${sortDirection}`;
    this.refreshStates(parameters);
  }

  opendialog(data: any) {
    const modalRef = this.modalService.open(AddEditStatesComponent);
    modalRef.componentInstance.props = {
      title: 'Add State',
      type: 'add',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshStates();
      console.log(res);
    });
  }

  editState(res: any) {
    const modalRef = this.modalService.open(AddEditStatesComponent);
    modalRef.componentInstance.props = {
      title: 'Edit State',
      type: 'edit',
      data: res,
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshStates();
      console.log(res);
    });
  }

  deleteState(res: any) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deleteState',
      data: res,
      page: `page=${this.service.page}`,
      categoryName: 'State',
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshStates();
      console.log(res);
    });
  }

  changeStatusStates(res: any) {
    const modalRef = this.modalService.open(DeletemodalComponent, {
      centered: true,
      size: 'sm',
      windowClass: 'alert-popup',
    });
    modalRef.componentInstance.props = {
      title: '',
      fullTitle: `Want to ${res.active ? 'deactivate' : 'activate'} state`,
      type: 'changeStatusStates',
      page: `page=${this.service.page}`,
      data: res,
      categoryName: 'States',
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshStates();
    });
  }
}
