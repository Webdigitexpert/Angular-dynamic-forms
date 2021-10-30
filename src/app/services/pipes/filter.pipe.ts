import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: string = '', filterString: any, propName: string, filterType: string): any {
    const resultArray = [];
    if(filterType != 'slectionFilter')
    {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    for (const item of value) {
      if ((item[propName] as string).toLowerCase().includes((filterString as string).toLowerCase())) {
        resultArray.push(item);
      }
    }
  }
  else{
    if( filterString == undefined || filterString == null)
    {
      return '';
    }
    for (const item of value) {
      if ((item[propName] as string).toLowerCase()===((filterString as string).toLowerCase())) {
        resultArray.push(item);
      }
    }
  }
    console.log(resultArray);
    return resultArray;
   
  }
}
