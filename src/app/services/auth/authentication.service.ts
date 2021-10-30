import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,private router:Router) { }
  public basePath:any = environment.baseUrl;

  adminlogin(data:any){
    const url = `${this.basePath}/api/v1/authenticate`
    return this.http.post(url,data);
  }

  getAdminDetails() {
    return JSON.parse(localStorage.getItem('adminDetails'));
  }
  logout() {
    this.router.navigate(['/login'])
    return localStorage.clear();
    
  }


}
