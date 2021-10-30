import {
  Component,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DeletemodalComponent } from 'src/app/views/components/common/deletemodal/deletemodal.component';
import {
  SortableDirective,
  SortEvent,
} from 'src/app/services/directives/sortable.directive';
import { SortingService } from 'src/app/services/sorting.service';
import { AddEditCitysComponent } from '../add-edit-citys/add-edit-citys.component';
import { CitiesService } from '../../../../../services/cities/cities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-search-citys',
  templateUrl: './search-citys.component.html',
  styleUrls: ['./search-citys.component.scss'],
})
export class SearchCitysComponent implements OnInit, AfterViewInit {
  service: any = {
    page: 1,
    pageSize: 10,
  };
  public cityData;
  public isUp: boolean = false;
  public citys: any;
  cityList: any = [];
  collectionSize: any; //page collectionSize
  public sortOrderval = 'desc';
  public sortOrder: boolean = false;
  public sortColumn: any = 'id';

  public sortbyclick: any;
  public isLoadedTable:boolean = true;

  public cityName: any; //search filter
  public pincode: any; //search filter
  public stateDropdown: any = '';
  public states: any;

  constructor(
    private sortingService: SortingService,
    private cityService: CitiesService,
    private modalService: NgbModal,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.stateService.getallStates().subscribe((states) => {
      this.states = states.data;
    });
    this.refreshCitys();
  }

  ngAfterViewInit() {}

  //search filter
  searchCity() {
    let citySearch = this.cityName ? `&city=${this.cityName}` : '';
    let stateDropdown = this.stateDropdown
      ? `&stateId=${this.stateDropdown}`
      : '';
    let pincodeFilter = this.pincode ? `&pincode=${this.pincode}` : ``;
    let parameters = `${citySearch}${pincodeFilter}${stateDropdown}`;
    this.refreshCitys(parameters);
    this.sortbyclick ='';
  }

  refreshCitys(sortclick?: any) {
    debugger
    if (sortclick) {
     let stateDropdown = this.stateDropdown
     ? `&stateId=${this.stateDropdown}`
     : '';
      let sortingOptions = 
      this.sortColumn && this.sortbyclick
        ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortbyclick}`
        : `&sortColumn=createdDate&sortOrder=desc`;
        let citySearch = this.cityName ? `&city=${this.cityName}` : '';
        let pincodeFilter = this.pincode ? `&pincode=${this.pincode}` : ``;

      this.cityService
        .getAllCities(`page=${this.service.page}${stateDropdown}${sortingOptions}${citySearch}${pincodeFilter}`)
        .subscribe((res: any) => {
          this.cityList = res.data;
          this.collectionSize = res.totalCount;
          this.isLoadedTable = false;
        });
    } else {
      let sortingOptions =
        this.sortColumn && this.sortbyclick
          ? `&sortColumn=${this.sortColumn}&sortOrder=${this.sortbyclick}`
          : `&sortColumn=createdDate&sortOrder=desc`;
      let citynameSearch = this.cityName ? `&city=${this.cityName}` : '';
      let stateDropdown = this.stateDropdown
        ? `&stateId=${this.stateDropdown}`
        : '';
      let pincodeFilter = this.pincode ? `&pincode=${this.pincode}` : ``;
      let parameters = `page=${this.service.page}${sortingOptions}${citynameSearch}${pincodeFilter}${stateDropdown}`;

      this.cityService.getAllCities(parameters).subscribe((res: any) => {
        this.cityList = res.data;
        this.collectionSize = res.totalCount;
        this.isLoadedTable = false;
      });
    }
  }

  onSort({ column, direction }: SortEvent) {
    console.log(direction);
    this.sortingService.sortColumn = column;
    this.sortingService.sortDirection = direction;
    this.sortingService.sort(this.cityList, column, direction);

    this.refreshCitys();
  }

  sort(data: any) {
    this.sortOrder = !this.sortOrder;
    this.sortbyclick = this.sortOrder ? `asc` : `desc`;
    let sortColumn = data;
    this.sortColumn = data;
    let sortDirection = this.sortOrder ? `asc` : `desc`;
    this.refreshCitys(`&sortColumn=${sortColumn}&sortOrder=${sortDirection}`);
  }

  deleteCity(res: any) {
    console.log(res);

    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deleteCity',
      page: `page=${this.service.page}`,
      data: res,
      categoryName: 'City',
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCitys();
    });
  }

  opendialog(data: any) {
    // debugger
    console.log(data);
    const modalRef = this.modalService.open(AddEditCitysComponent);
    modalRef.componentInstance.props = {
      title: 'Add City',
      type: 'add',
      page: `page=${this.service.page}`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCitys();
    });
  }

  editCity(res: any) {
    const modalRef = this.modalService.open(AddEditCitysComponent);
    modalRef.componentInstance.props = {
      title: 'Edit City',
      type: 'edit',
      page: `page=${this.service.page}`,
      data: res,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCitys();
    });
  }

  activateDeactivate(res) {
    const modalRef = this.modalService.open(DeletemodalComponent);
    modalRef.componentInstance.props = {
      title: '',
      type: 'deactivateCity',
      page: `page=${this.service.page}`,
      data: res,
      categoryName: 'Domain',
      fullTitle: `Want to ${res.active ? 'deactivate' : 'activate'} City`,
    };
    modalRef.componentInstance.passEntry.subscribe((res: any) => {
      this.refreshCitys();
      console.log(res);
    });
  }
}
