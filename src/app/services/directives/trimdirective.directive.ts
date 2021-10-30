import { Directive, EventEmitter,ElementRef, HostListener, Output } from '@angular/core';

@Directive({
  
  selector: '[trims]'
})
export class TrimInputDirective {
   constructor(
    private el: ElementRef
  ) {}

  @HostListener('keypress') keypress() {
    // debugger
    const value = this.el.nativeElement.value;
    // const valueTrim = value.trim();
    const valueTrim = value.trimStart();
    // if(value !== valueTrim) {
    //   this.el.nativeElement.value = valueTrim;
    // }
    this.el.nativeElement.value = valueTrim;
  }  

}