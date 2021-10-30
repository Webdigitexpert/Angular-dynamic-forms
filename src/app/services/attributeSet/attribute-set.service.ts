import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AttributeSetService {
  public _attributeSets: Subject<any> = new Subject<any>();
  public _attributeSets$ = this._attributeSets.asObservable();

  constructor(private httpService: HttpService) {}

  getAttributeSetData(data: any) {
    this._attributeSets.next(data);
  }

  getAttributeSets(data: any) {
    const url = `${environment.baseUrl}/api/v1/Attributes/getAllAttributes?${data}`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }
  postAttributeSet(payload, permissions): Observable<any> {
    debugger
    let domainMaster = payload.domainMaster ? payload.domainMaster : null;
    let categoryDescriptionId = payload.categoryDescriptionIds ?  payload.categoryDescriptionIds:null;
    const url = `${environment.baseUrl}/api/v1/Attributes/saveOrUpdate`;
    return this.httpService
      .post(url, 
        {
          "attributeSetName":payload.attributeSetName,
          "categoryDescriptionIds":categoryDescriptionId,
          "domainMaster":domainMaster,
          "masterVarientFlag":payload.masterVarientFlag
        },
         this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }
  updateAttributeSet(payload: any, id: any, permissions) {
    // debugger;
    const url = `${environment.baseUrl}/api/v1/Attributes/saveOrUpdate/`;
    let domainMaster = payload.domainMaster ? payload.domainMaster : null;
    let categoryDescriptionId = payload.categoryDescriptionIds ?  payload.categoryDescriptionIds:null;
    return this.httpService
      .post(
        url,
        {
          attributeSetName: payload.attributeSetName,
          domainMaster: domainMaster,
          masterVarientFlag: payload.masterVarientFlag,
          categoryDescriptionIds: categoryDescriptionId,
          id: id,
        },
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }
  deleteAttributeSet(id: any) {
    const url = `${environment.baseUrl}/api/v1/Attributes/deleteById/${id}`;
    return this.httpService
      .delete(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  activateDeactivateAttributeSet(id: any, status: any) {
    const url = `${environment.baseUrl}/api/v1/Attributes/activateDeactivate/${id}/${status}`;
    return this.httpService
      .post(
        url,
        {
          status: status,
        },
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }

  Errorhandling(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error(err.error.message);
    } else {
      console.error(`Backend returned code ${err.status}`);
    }
    return throwError('Please try again later.');
  }
}
