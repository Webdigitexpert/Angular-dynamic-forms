import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  constructor() {}

  public sortColumn: any;
  public sortDirection: any;

  sort(data: [], column: any, direction: any): any[] {
    console.log(data);
    if (direction === '' || column === '') {
      console.log('nodirection', data);
      return data;
    } else {
      if (direction === 'asc') {
        const user = data.sort((a, b) => 0 - (a[column] > b[column] ? -1 : 1));

        console.log(user);
      } else {
        const user = data.sort((a, b) => 0 - (a[column] > b[column] ? 1 : -1));

        console.error(user);
      }
    }
  }
}
