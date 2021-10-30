import { Directive, EventEmitter, Input, Output } from '@angular/core';

const rotate: {[key: string]: any} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export type SortColumn ='';
export type SortDirection = 'asc' | 'desc' | '' ;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection; 
}
@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableDirective {

  @Input() sortable:any ='';
  @Input() direction:any='';
  @Output() sort = new EventEmitter<any>();

  constructor() { }

  rotate() {
  
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
    console.log(this.direction)
  }

}
