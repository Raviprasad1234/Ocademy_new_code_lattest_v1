import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
    selector: '[avoidSpacess]'
  })

export class AvoidSpacesDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initalValue.replace(/\s/g,'');
    if ( initalValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
};
