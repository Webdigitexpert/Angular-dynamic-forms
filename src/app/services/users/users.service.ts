import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _users:Subject<any>=new Subject<any>();
  public _users$ = this._users.asObservable();
 
  constructor(private httpService:HttpService) {   }



  getUserData(data:any){

    this._users.next(data);
  }


  getUsers(data:any){
      const url =`${environment.baseUrl}/api/v1/users/allUsers?${data}`;
      return this.httpService.get(url,this.httpService.headers)
      .pipe(
        catchError(this.Errorhandling)
        );
  }
  postUser(payload,permissions):Observable<any>{
    // debugger
    let obj = payload.userDomain.join(',');
    console.log(obj);
    const url =`${environment.baseUrl}/api/v1/users/saveOrUpdate`;
    return this.httpService.post(url,{"name":payload.name, "username":payload.userName,"password":payload.confirmpassword,"domain":obj,"permission":permissions,"role":payload.userrole}, this.httpService.headers)
    .pipe(
      catchError(this.Errorhandling)
      );
}
updateUser(payload:any,id:any,permissions){

  const url =`${environment.baseUrl}/api/v1/users/saveOrUpdate/`;
  let obj = payload.domain.join(',');
  console.log(obj);
  
  return this.httpService.post(url,{"name":payload.name, "username":payload.username,"domain":obj,"password":payload.editpassword,"role":payload.role,"permission":permissions,  "id":id},this.httpService.headers)
  .pipe(
    catchError(this.Errorhandling)
    );
   
}
deleteUser(id:any){
  const url =`${environment.baseUrl}/api/v1/users/deleteById/${id}`;
  return this.httpService.delete(url,this.httpService.headers)
  .pipe(
    catchError(this.Errorhandling)
    );
}


activeorInactive(encryptedid:any,active:boolean){
  const url =`${environment.baseUrl}/api/v1/users/activateDeactivate/${encryptedid}/${active}`;
  return this.httpService.post(url,null,this.httpService.headers)
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
