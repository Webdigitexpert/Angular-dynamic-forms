import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpService } from './http/http.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpService) {   }

  getMock(){
      const url =`${environment.baseUrl}/getmock`;
      return this.httpService.get(url,this.httpService.headers)
      .pipe(
        catchError(this.Errorhandling)
        );
  }
  postMock(payload){
    const url =`${environment.baseUrl}/postmock`;
    return this.httpService.post(url,payload, this.httpService.headers)
    .pipe(
      catchError(this.Errorhandling)
      );
}
updateMock(id:any,payload:any){
  const url =`${environment.baseUrl}/updatemock/${id}`;
  return this.httpService.put(url,payload,this.httpService.headers)
  .pipe(
    catchError(this.Errorhandling)
    );
}
deleteMock(id:any){
  const url =`${environment.baseUrl}/deletemock/${id}`;
  return this.httpService.delete(url,this.httpService.headers)
  .pipe(
    catchError(this.Errorhandling)
    );
}



Errorhandling(err:HttpErrorResponse){
  if(err.error instanceof ErrorEvent){
    console.error(err.error.message)
  }else{
    console.error(
      `Backend returned code ${err.status}` )
    
  }
  return throwError("Please try again later.");

  
}

}
