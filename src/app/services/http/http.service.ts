import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public headers = new HttpHeaders({
    
  });
  public headerswithimage = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private httpClient: HttpClient) { }

  public get(urlString:string,headers:HttpHeaders): Observable<any>{
    const url =urlString;
    return this.httpClient.get(url, {headers})
  }

  public post(urlString:string,payload,headers:HttpHeaders): Observable<any>{
    const url =urlString;
    return this.httpClient.post(url,payload, {headers})
  }

  public put(urlString:string,payload,headers:HttpHeaders): Observable<any>{
    const url =urlString;
    return this.httpClient.put(url, payload,{headers})
  }
  
  public delete(urlString:string,headers:HttpHeaders): Observable<any>{
    const url =urlString;
    return this.httpClient.delete(url, {headers})
  }

}
