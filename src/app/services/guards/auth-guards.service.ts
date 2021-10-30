import { Injectable } from '@angular/core';
import {  CanActivate,Router } from "@angular/router";
import { AuthenticationService } from "../auth/authentication.service";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate {

  constructor(private authService: AuthenticationService,private router: Router,private toastr: ToastrService) { }

  canActivate():boolean {
    const adminDetails:any = this.authService.getAdminDetails();
    if(adminDetails && adminDetails.data){
      return true;
    }
    else{
      this.router.navigate(['/login'])
      this.toastr.error('Need to login');
      return false;
      
    }
  }

}
