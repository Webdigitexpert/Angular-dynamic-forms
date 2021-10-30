import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private httpService: HttpService) { }

    findAllProducts(){
        const url =`${environment.baseUrl}/api/v1/product/getAllProductIdAndName`;
        return this.httpService.get(url,this.httpService.headers);
    }

    getallProducts(data: any) {
        const url = `${environment.baseUrl}/api/v1/product/findAllProducts?${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    activateDeactivateProduct(id: any, status: any) {
        const url = `${environment.baseUrl}/api/v1/product/activateDeactivate/${id}/${status}`;
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

    postProducts(payload: any) {
        const url = `${environment.baseUrl}/api/v1/product/saveOrUpdate`;
        return this.httpService.post(url, payload, this.httpService.headerswithimage)
            .pipe(catchError(this.Errorhandling));
    }
    cloneProducts(payload: any) {
        console.log(payload);
        return;
        
        const url = `${environment.baseUrl}/api/v1/product/saveOrUpdate`;
        return this.httpService.post(url, payload, this.httpService.headerswithimage)
            .pipe(catchError(this.Errorhandling));
    }

    getAllAttributesetbycategory(id: any) {
        const url = `${environment.baseUrl}/api/v1/attributeLabel/findByCategoryId/${id}`;
        return this.httpService.get(url, this.httpService.headers)
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
