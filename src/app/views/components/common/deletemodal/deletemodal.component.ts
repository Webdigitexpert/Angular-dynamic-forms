import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { DomainService } from 'src/app/services/domain/domain.service';
import { CitiesService } from '../../../../services/cities/cities.service';
import { StateService } from 'src/app/services/state/state.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ManufacturerService } from 'src/app/services/manufacturer/manufacturer.service';
import { AttributeSetService } from 'src/app/services/attributeSet/attribute-set.service';
import { AttributeSetSpecificationService } from 'src/app/services/attributeSetSpecification/attribute-set-specification.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.scss'],
})
export class DeletemodalComponent implements OnInit {
  @Input() props: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public title: string;
  public fullTitle: string;
  public type: string;
  public data: any;
  public pages: any;
  public deleteId: any;
  public encryptedId: any;
  public categoryName: string;
  public status: boolean;
  public approved: any;

  public isBtnLoaded: boolean = false;

  constructor(
    private ngbModal: NgbActiveModal,
    private userService: UserService,
    private toastr: ToastrService,
    private domainService: DomainService,
    private cityService: CitiesService,
    private stateService: StateService,
    private categoryService: CategoriesService,
    private manufacturerService: ManufacturerService,
    private attributeSetService: AttributeSetService,
    private attributeSetSpecificationService: AttributeSetSpecificationService,
    private reviewService: ReviewService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.setDialogProps(this.props);
  }
  setDialogProps(dialogdata: any) {
    this.title = dialogdata.title;
    this.fullTitle = dialogdata.fullTitle;
    this.type = dialogdata.type;
    this.data = dialogdata.data;
    this.pages = dialogdata.pages;
    this.deleteId = dialogdata.data.id;
    this.categoryName = dialogdata.categoryName;
    this.status = dialogdata.data.active;
    this.encryptedId = dialogdata.data.encryptedId;
    this.approved = dialogdata.data.status;

  }

  onDelete() {
    switch (this.type) {
      case 'deleteUser':
        this.userService.deleteUser(btoa(this.deleteId)).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.toastr.success(`${res.message}`);
              this.onClose();
            } else {
              if (res.message) {
                this.toastr.error(`${res.message}`);
              } else {
                this.toastr.error(`Delete failed`);
              }
            }
          },
          (err: any) => {
            this.onClose();
            this.toastr.error(`${err.statusText}`);
            console.log(err);
          }
        );
        break;

      case 'deactivateUser':
        this.userService
          .activeorInactive(
            this.encryptedId,
            (this.status = this.status ? false : true)
          )
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Something went wrong`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;

      case 'deleteDomain':
        this.domainService.deleteDomain(btoa(this.deleteId)).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.toastr.success(`${res.message}`);
              this.onClose();
            } else {
              if (res.message) {
                this.toastr.error(`${res.message}`);
              } else {
                this.toastr.error(`Delete failed`);
              }
            }
          },
          (err: any) => {
            this.onClose();
            this.toastr.error(`${err.statusText}`);
            console.log(err);
          }
        );
        break;

      //deactive domain

      case 'deactivateDomain':
        this.domainService
          .activeorInactive(
            this.encryptedId,
            this.status == true ? false : true
          )
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Something went wrong`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;

      case 'deleteManufacturers':
        this.manufacturerService
          .deleteManufacturer(btoa(this.deleteId))
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Delete failed`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;

      case 'changeStatusManufacturers':
        this.isBtnLoaded = true;
        this.manufacturerService
          .activateDeactivateManufacturer(
            this.encryptedId,
            this.status == true ? false : true
          )
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Delete failed`);
                }
              }
              this.isBtnLoaded = false;
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;

      case 'deleteState':
        this.stateService.deleteState(btoa(this.deleteId)).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.toastr.success(`${res.message}`);
              this.onClose();
            } else {
              if (res.message) {
                this.toastr.error(`${res.message}`);
              } else {
                this.toastr.error(`Delete failed`);
              }
            }
          },
          (err: any) => {
            this.onClose();
            this.toastr.error(`${err.statusText}`);
            console.log(err);
          }
        );
        break;
      case 'changeStatusStates':
        this.stateService
          .activateDeactivateState(
            this.encryptedId,
            this.status == true ? false : true
          )
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Delete failed`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;
      case 'changeStatusAttributeSetSpecification':
        this.attributeSetSpecificationService
          .activateDeactivateAttributeSetSpecification(
            this.encryptedId,
            this.status == true ? false : true
          )
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Delete failed`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;

      case 'changeStatusAttributeSet':
        this.attributeSetService
          .activateDeactivateAttributeSet(
            this.encryptedId,
            this.status == true ? false : true
          )
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Delete failed`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;

      case 'deleteCity':
        this.cityService.deleteCity(btoa(this.deleteId)).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.toastr.success(`${res.message}`);
              this.onClose();
            } else {
              if (res.message) {
                this.toastr.error(`${res.message}`);
              } else {
                this.toastr.error(`Delete failed`);
              }
            }
          },
          (err: any) => {
            this.onClose();
            this.toastr.error(`${err.statusText}`);
            console.log(err);
          }
        );
        break;

      //deactivate city

      case 'deactivateCity':
        this.cityService
          .activeorInactive(
            this.encryptedId,
            this.status == true ? false : true
          )
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Something went wrong`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;

      case 'deleteAttributeSet':
        this.attributeSetService
          .deleteAttributeSet(btoa(this.deleteId))
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Delete failed`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;
      case 'deleteCategory':
        this.categoryService.deleteCategory(btoa(this.deleteId)).subscribe(
          (res: any) => {
            if (res && res.status) {
              this.toastr.success(`${res.message}`);
              this.onClose();
            } else {
              if (res.message) {
                this.toastr.error(`${res.message}`);
              } else {
                this.toastr.error(`Delete failed`);
              }
            }
          },
          (err: any) => {
            this.onClose();
            this.toastr.error(`${err.statusText}`);
            console.log(err);
          }
        );
        break;

      case 'deactivateCategory':
        this.categoryService
          .activeorInactive(
            this.encryptedId,
            (this.status = this.status ? false : true)
          )
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Something went wrong`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;

      case 'deleteAttributeSetSpecification':
        this.attributeSetSpecificationService
          .deleteAttributeSetSpecification(btoa(this.deleteId))
          .subscribe(
            (res: any) => {
              if (res && res.status) {
                this.toastr.success(`${res.message}`);
                this.onClose();
              } else {
                if (res.message) {
                  this.toastr.error(`${res.message}`);
                } else {
                  this.toastr.error(`Delete failed`);
                }
              }
            },
            (err: any) => {
              this.onClose();
              this.toastr.error(`${err.statusText}`);
              console.log(err);
            }
          );
        break;
        case 'changeStatusReviews':
            this.isBtnLoaded = true;
          this.reviewService.activateDeactivateReviews(this.encryptedId, this.status == true ? false : true).subscribe(
              (res: any) => {
                  if (res && res.status) {
                      this.toastr.success(`${res.message}`);
                      this.onClose();

                  } else {
                      if (res.message) {
                          this.toastr.error(`${res.message}`);
                      } else {
                          this.toastr.error(`Delete failed`);
                      }
                  }
                  this.isBtnLoaded = false;
              },
              (err: any) => {
                  this.onClose();
                  this.toastr.error(`${err.statusText}`);
                  console.log(err);
              }
          );
          break;
        case 'changeStatusProducts':
            this.isBtnLoaded = true;
          this.productService.activateDeactivateProduct(this.encryptedId, this.status == true ? false : true).subscribe(
              (res: any) => {
                  if (res && res.status) {
                      this.toastr.success(`${res.message}`);
                      this.onClose();

                  } else {
                      if (res.message) {
                          this.toastr.error(`${res.message}`);
                      } else {
                          this.toastr.error(`Delete failed`);
                      }
                  }
                  this.isBtnLoaded = false;
              },
              (err: any) => {
                  this.onClose();
                  this.toastr.error(`${err.statusText}`);
                  console.log(err);
              }
          );
          break;
        case 'cloneProduct':
            this.isBtnLoaded = true;
            this.productService.cloneProducts(this.data).subscribe(
              (res: any) => {
                  if (res && res.status) {
                      this.toastr.success(`${res.message}`);
                      this.onClose();

                  } else {
                      if (res.message) {
                          this.toastr.error(`${res.message}`);
                      } else {
                          this.toastr.error(`Clone failed`);
                      }
                  }
                  this.isBtnLoaded = false;
              },
              (err: any) => {
                  this.onClose();
                  this.toastr.error(`${err.statusText}`);
                  console.log(err);
              }
          );
          break;
        //   case 'approveOrDeclineReview':
        //   this.reviewService.approveOrDeclineReview(this.deleteId,  this.approved != 'Approved' ? 'Approved' : 'Decline' ).subscribe(
        //       (res: any) => {
        //           if (res && res.status) {
        //               this.toastr.success(`${res.message}`);
        //               this.onClose();

        //           } else {
        //               if (res.message) {
        //                   this.toastr.error(`${res.message}`);
        //               } else {
        //                   this.toastr.error(`Approved or Decline failed`);
        //               }
        //           }
        //       },
        //       (err: any) => {
        //           this.onClose();
        //           this.toastr.error(`${err.statusText}`);
        //           console.log(err);
        //       }
        //   );
        //   break;
    }
  }

  onClose() {
    this.passEntry.next(this.pages);
    this.ngbModal.close();
  }
}
