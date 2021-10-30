import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  constructor(private httpService: HttpService) { }

  getallDomains(): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/domainMaster/findAllDomainNameAndId`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  getDomains(data: any) {

    const url = `${environment.baseUrl}/api/v1/domainMaster/findAllDomainMaster?${data}`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));

  }

  postDomains(payload: any) {
    const url = `${environment.baseUrl}/api/v1/domainMaster/saveOrUpdate`;
    return this.httpService
      .post(url, payload, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  updateDomains(payload: any, id: any) {
    debugger
    const url = `${environment.baseUrl}/api/v1/domainMaster/saveOrUpdate`;
    return this.httpService
      .post(
        url,
        {
          "domainName": payload.domainName,
          "domainUrl": payload.domainUrl,
          "id": id,
        },
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }

  deleteDomain(id: any) {
    // debugger
    const url = `${environment.baseUrl}/api/v1/domainMaster/deleteById/${id}`;
    return this.httpService
      .delete(
        url,
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }

  activeorInactive(encryptedid:any,active:boolean){
    const url =`${environment.baseUrl}/api/v1/domainMaster/activateDeactivate/${encryptedid}/${active}`;
    return this.httpService.post(url,null,this.httpService.headers)
    .pipe(
      catchError(this.Errorhandling)
      );
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
