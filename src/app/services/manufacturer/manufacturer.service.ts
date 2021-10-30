import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ManufacturerService {
    constructor(private httpService: HttpService) { }

    getallManufacturer(data: any) {
        const url = `${environment.baseUrl}/api/v1/manufacturerMaster/getAllManufacturer?${data}`;
        return this.httpService.get(url, this.httpService.headers)
            .pipe(
                catchError(this.Errorhandling)
            );
    }

    getallManufacturerWithId():Observable<any>{
        const url =`${environment.baseUrl}/api/v1/manufacturerMaster/listingManufacturer`;
        return this.httpService.get(url,this.httpService.headers)
        .pipe(catchError(this.Errorhandling))
    }

    postManufacturer(data: any, image: File): Observable<any> {
        debugger
        const formData = new FormData();
        console.log(image);
        let imagefile = image ? image : null;
        formData.append('file', imagefile);
        formData.append('file', new Blob([imagefile], {
            type: "application/octet-stream",
        }));
        let obj = {
            "manufacturerName": data.manufacturerName ? data.manufacturerName : null,
            "parentCategory": data.parentCategory ? data.parentCategory : null,
            "domainId": data.domainId ? data.domainId : null,
            "metaDescription": data.metaDescription ? data.metaDescription : null,
            "metaTitle": data.metaTitle ? data.metaTitle : null,
            "description": data.description ? data.description : null,
        }

        formData.append('manufacturer', new Blob([JSON.stringify(obj)], {
            type: "application/json"
        }));

        const url = `${environment.baseUrl}/api/v1/manufacturerMaster/saveOrUpdate`;
        return this.httpService.post(url, formData, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }

    updateManufacturer(data: any, id: any, image?: File): Observable<any> {
        debugger
        const formData = new FormData();
        let imagefile = image ? image : '';
        // formData.append('file', imagefile);
        formData.append('file', new Blob([imagefile], {
            type: "application/octet-stream",
        }));

        let obj = {'id':id};
        let active = {'active': true};
        let editobj ={ 
                "manufacturerName": data.manufacturerName ? data.manufacturerName : null,
                "parentCategory": data.parentCategory ? data.parentCategory : null,
                "domainId": data.domainId ? data.domainId : null,
                "metaDescription": data.metaDescription ? data.metaDescription : null,
                "metaTitle": data.metaTitle ? data.metaTitle : null,
                "description": data.description ? data.description : null,
            
        }
        let totalobj = {...editobj,...obj, ...active};
        formData.append('manufacturer', new Blob([JSON.stringify(totalobj)], {
            type: "application/json",
        }));
        
        const url = `${environment.baseUrl}/api/v1/manufacturerMaster/saveOrUpdate`;
        return this.httpService.post(url, formData, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }

    deleteManufacturer(id: any) {
        const url = `${environment.baseUrl}/api/v1/manufacturerMaster/deleteById/${id}`;
        return this.httpService.delete(url, this.httpService.headers)
            .pipe(catchError(this.Errorhandling))
    }

    activateDeactivateManufacturer(id: any, status: any) {
        const url = `${environment.baseUrl}/api/v1/manufacturerMaster/activateDeactivate/${id}/${status}`;
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

    getallManufacturerbycategory(id: any) {
        const url = `${environment.baseUrl}/api/v1/manufacturerMaster/findByParentCategory/${id}`;
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
