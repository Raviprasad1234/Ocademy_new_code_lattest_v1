import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
    selector: '[onlyCharacters]'
  })

export class OnlyCharactersDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initalValue.replace(/[^a-zA-Z' ']*/g, '');
    if ( initalValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
};