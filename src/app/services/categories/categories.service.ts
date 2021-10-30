import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, throwError,Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categorySubject = new Subject();
  public categorySubject$ = this.categorySubject.asObservable();
  constructor(private httpService: HttpService) {}

  getallCategories(): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/categoryMaster/findAllCategoryNameAndId`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  getCategories(data: any): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/categoryMaster/getAllCategories?${data}`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  postCategory(data: any, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([image], {
        type: 'application/octet-stream',
      })
    );
    formData.append(
      'category',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      })
    );

    const url = `${environment.baseUrl}/api/v1/categoryMaster/saveOrUpdate`;
    return this.httpService
      .post(url, formData, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  updateCategory(data: any, id: any, image?: File): Observable<any> {

    const formData = new FormData();

    formData.append(
      'file',
      new Blob([image], {
        type: 'application/octet-stream',
      })
    );
    let obj = { id: id };
    let totalobj = { ...data, ...obj };
    console.log(totalobj);
    formData.append(
      'category',
      new Blob([JSON.stringify(totalobj)], {
        type: 'application/json',
      })
    );

    const url = `${environment.baseUrl}/api/v1/categoryMaster/saveOrUpdate`;
    return this.httpService
      .post(url, formData, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  deleteCategory(id: any): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/categoryMaster/deleteById/${id}`;
    return this.httpService
      .delete(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  activeorInactive(encryptedid: any, active: boolean) {
    const url = `${environment.baseUrl}/api/v1/categoryMaster/activateDeactivate/${encryptedid}/${active}`;
    return this.httpService
      .post(url, null, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  getCategoriesParentChild(): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/categoryMaster/findAllCategoryNameAndSubCategoryNameAndId`;
    return this.httpService
      .get(url, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }

  getCategoryList(data:any){
    // debugger
    this.categorySubject.next(data);
  }

  paramSettings(data: any, id: any): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/categoryMaster/addReviewParams/${id}`;
    return this.httpService
      .post(url, data, this.httpService.headers)
      .pipe(catchError(this.Errorhandling));
  }
  
  getCategoryMasterById(id: any): Observable<any> {
    const url = `${environment.baseUrl}/api/v1/categoryMaster/getCategoryMasterById/${id}`;
    return this.httpService
      .get(url, this.httpService.headers)
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
