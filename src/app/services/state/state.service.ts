import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { Observable,throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private httpService: HttpService) { }

  getallStates(): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/states/findAllStates`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  getStates(data: any) {

    const url = `${environment.baseUrl}/api/v1/states/getAllStates?${data}`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));

  }

  postStates(payload: any) {
    const url = `${environment.baseUrl}/api/v1/states/saveOrUpdate`;
    return this.httpService
      .post(url, payload, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  updateStates(payload: any, id: any) {
    const url = `${environment.baseUrl}/api/v1/states/saveOrUpdate`;
    return this.httpService
      .post(
        url,
        {
          "state": payload.state,
          "active": payload.active,
          "id": id,
        },
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }

  deleteState(id: any) {
    const url = `${environment.baseUrl}/api/v1/states/deleteById/${id}`;
    return this.httpService
      .delete(
        url,
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }

  activateDeactivateState(id: any, status: any) {
    const url = `${environment.baseUrl}/api/v1/states/activateDeactivate/${id}/${status}`;
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
