import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private ngbModal:NgbModal) { }
  openDialog(props: any, component:any,size:any) {
    
    var modelRef = this.ngbModal.open(component, { size: size});
    modelRef.componentInstance.props = props;
    modelRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      console.log(receivedEntry);
      })

     
    return modelRef.result;
  }

}
