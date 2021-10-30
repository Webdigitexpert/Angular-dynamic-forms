import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { Observable,throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AttributeSetSpecificationService {
  constructor(private httpService: HttpService) { }

  getallAttributeSetSpecifications(): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/attributeLabel/getAllAttributeLabels`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  getAttributeSetSpecifications(data: any) {
    const url = `${environment.baseUrl}/api/v1/attributeLabel/getAllAttributeLabels?${data}`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));

  }

  postAttributeSetSpecifications(payload: any) {
    const url = `${environment.baseUrl}/api/v1/attributeLabel/saveOrUpdate`;
    return this.httpService
      .post(url, payload, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  updateAttributeSetSpecifications(payload: any,atttrId:any, id: any,) {
    // debugger
    const url = `${environment.baseUrl}/api/v1/attributeLabel/saveOrUpdate`;
    return this.httpService
      .post(
        url,
        {
          "attributeLabel": payload.attributeLabel,
          "attributeSetId" : atttrId,
          "isAlphaNumeric" : payload.isAlphaNumeric,
          "isFacet": payload.isFacet,
          "isMandatory" : payload.isMandatory,
          "unit" : payload.unit,
          "id": id,
        },
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }

  deleteAttributeSetSpecification(id: any) {
    const url = `${environment.baseUrl}/api/v1/attributeLabel/deleteById/${id}`;
    return this.httpService
      .delete(
        url,
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }
  activateDeactivateAttributeSetSpecification(id: any, status: any) {
    const url = `${environment.baseUrl}/api/v1/attributeLabel/activateDeactivate/${id}/${status}`;
    return this.httpService
        .post(
            url,
            {
                "status": status,
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
