import { Injectable } from '@angular/core';
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

@Injectable({
    'providedIn': 'root'
})
export class AuthInterceptor implements HttpInterceptor{
    // constructor(private authService: AuthService, private router: Router) {}

    // intercept(
    //   request: HttpRequest<unknown>,
    //   next: HttpHandler
    // ): Observable<HttpEvent<unknown>> {
    //   const userDetails = this.authService.getAdminDetails();
    //   let token = '';
    //   if (userDetails && userDetails.token) {
    //     token = userDetails.token;
    //   } 
    //   let setHeader = {};
    //   if (!request.url.includes('/login')) {
       
    //     setHeader = {
    //       Authorization: `Bearer ${token}`,
    //     };
    //   }
    //   const modified = request.clone({
    //     headers: new HttpHeaders(setHeader),
    //   });
    //   return next.handle(modified).pipe(
    //     catchError((error) => {
    //       if (error.statusText === 'Unauthorized') {
    //         this.authService.logout();
    //         this.router.navigate(['/login']);
    //       }
    //       console.log(error);
    //       return of(error);
    //     })
    //   );
    // }

    
}