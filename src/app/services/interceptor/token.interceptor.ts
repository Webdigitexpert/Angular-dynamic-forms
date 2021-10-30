import { Injectable  } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpHeaders,
  } from '@angular/common/http';
  import { Observable, of } from 'rxjs';
  import { catchError, tap } from 'rxjs/operators';
  import { Router } from '@angular/router';
  import { AuthenticationService } from "../auth/authentication.service";
  import { ToastrService } from 'ngx-toastr';

  @Injectable()
  export class TokenInterceptor implements HttpInterceptor {
      constructor(private authService: AuthenticationService,private router: Router,private toastr: ToastrService){}

      intercept(
          request:HttpRequest<unknown>,
          next:HttpHandler
      ):Observable<HttpEvent<unknown>>{
          const adminDetails = this.authService.getAdminDetails();
          let token = '';
          if(adminDetails && adminDetails.data){
              token = adminDetails.data;
          }
          let setHeader ={};
          if(!request.url.includes('/login')){
              setHeader ={
                Authorization: `Bearer ${token}`,
              }
          }
          const modified = request.clone({
              headers : new HttpHeaders(setHeader)
          });
          return next.handle(modified).pipe(
              catchError((error)=>{
                if (error) {
                    
                    this.authService.logout();
                    this.router.navigate(['/login']);
                  }
                  if(error.error && error.error.text){
                    this.toastr.error(error.error.text);
                  }
                  else{
                    this.toastr.error('Server is not responding at the moment');
                  console.log(error);
                  }
                  
                  return of(error);
              })
          )
      }
  }
