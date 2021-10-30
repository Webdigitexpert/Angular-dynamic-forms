import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private httpService: HttpService) {}
  getAllCities(data: any): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/cities/getAllCities?${data}`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  findallCities() {
    const url = `${environment.baseUrl}/api/v1/cities/findAllCities`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  createCity(data: any): Observable<any> {
    // debugger;
    console.log(data);
    const url = `${environment.baseUrl}/api/v1/cities/saveOrUpdate`;
    return this.httpService
      .post(
        url,
        {
          city: data.city,
          stateId: data.stateId,
          aliasName: data.aliasName,
          pincode: data.pincode,
        },
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }

  editCity(data: any, id: any): Observable<any> {
    // debugger;

    console.log(data, id);
    const url = `${environment.baseUrl}/api/v1/cities/saveOrUpdate`;
    return this.httpService
      .post(
        url,
        {
          city: data.city,
          stateId: data.stateId,
          aliasName: data.aliasName,
          pincode: data.pincode,
          id: id,
        },
        this.httpService.headers
      )
      .pipe(catchError(this.Errorhandling));
  }

  deleteCity(id: any): Observable<any> {
    // debugger
    const url = `${environment.baseUrl}/api/v1/cities/deleteById/${id}`;
    return this.httpService
      .delete(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  activeorInactive(encryptedid: any, active: boolean) {
    const url = `${environment.baseUrl}/api/v1/cities/activateDeactivate/${encryptedid}/${active}`;
    return this.httpService
      .post(url, null, this.httpService.headers)
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
