import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../../http/http.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private httpService: HttpService) {}

  getallOffer() {
    const url = `${environment.baseUrl}`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  offerListing(data:any){
    const url =`${environment.baseUrl}/api/v1/offer/allOffer?${data}`;
    return this.httpService.get(url,this.httpService.headers).pipe(catchError(this.Errorhandling))
  }

  postOffer(payload: any) {
    const url = `${environment.baseUrl}/api/v1/offer/saveOrUpdate`;
    let obj = {
      "startDate": payload.startDate.toISOString().slice(0, 19) + 'Z',
      "endDate": payload.endDate.toISOString().slice(0, 19) + 'Z',
       "offerDetail": payload.offerDetail,
      "cityId": payload.cityId,
      "productId": payload.productId,
  }
    return this.httpService
      .post(url, obj, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  editOffer(payload: any,id:any) {
    const url = `${environment.baseUrl}/api/v1/offer/saveOrUpdate`;
    let obj = {
      "startDate": payload.startDate.toISOString().slice(0, 19) + 'Z',
      "endDate": payload.endDate.toISOString().slice(0, 19) + 'Z',
       "offerDetail": payload.offerDetail,
      "cityId": payload.cityId,
      "productId": payload.productId,
      "id":id
  }
    return this.httpService
      .post(url, obj, this.httpService.headers)
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
