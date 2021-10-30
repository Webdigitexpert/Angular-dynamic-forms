import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    constructor(private httpService: HttpService) { }

    getallReviews(data: any) {
        const url = `${environment.baseUrl}/api/v1/userReview/getAllReviews?${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    deleteReviews(id: any) {
        const url = `${environment.baseUrl}/api/v1/userReview/deleteById/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }

    activateDeactivateReviews(id: any, status: any) {
        const url = `${environment.baseUrl}/api/v1/userReview/activateDeactivate/${id}/${status}`;
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

    postReviews(payload: any,status:any) {
        debugger
        const url = `${environment.baseUrl}/api/v1/userReview/saveOrUpdate`;
        let obj ={
            "createdDate":payload.createdDate.toISOString().slice(0, 19) + 'Z',
            "productId":payload.productId,
            "reviewBy":payload.reviewBy,
            "reviewText":payload.reviewText,
            "status":payload.status,
            "reviewRating":payload.reviewRating,
            "make":payload.make,
            "model":payload.model,
            "tags":payload.tags.toString(),
        }
        return this.httpService.post(url, obj, this.httpService.headers)
            .pipe(catchError(this.Errorhandling));
    }

    updateReviews(payload: any,status: any, id: any) {
        debugger
        const url = `${environment.baseUrl}/api/v1/userReview/saveOrUpdate`;

        return this.httpService
          .post(
            url,
            {
                "updatedDate":payload.createdDate.toISOString().slice(0, 19) + 'Z',
                "productId":payload.productId,
                "reviewBy":payload.reviewBy,
                "reviewText":payload.reviewText,
                "status":payload.status,
                "reviewRating":payload.reviewRating,
                "make":payload.make,
                "model":payload.model,
                "tags":payload.tags.toString(),
                "id":id,
            },
            this.httpService.headers
          )
          .pipe(catchError(this.Errorhandling));
      }
    

    // approveOrDeclineReview(id: any, status: any) {
    //     const url = `${environment.baseUrl}/api/v1/userReview/approveOrDeclineReview?id=${id}&approveDeclineFlag=${status}`;
    //     return this.httpService
    //         .get(
    //             url,
    //             this.httpService.headers
    //         )
    //         .pipe(catchError(this.Errorhandling));
    // }

    Errorhandling(err: HttpErrorResponse) {
        if (err.error instanceof ErrorEvent) {
            console.error(err.error.message);
        } else {
            console.error(`Backend returned code ${err.status}`);
        }
        return throwError('Please try again later.');
    }
}
