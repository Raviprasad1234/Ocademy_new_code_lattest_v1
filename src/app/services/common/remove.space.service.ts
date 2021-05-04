import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
    selector: '[removeSpacess]'
  })

export class RemoveSpacesDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initalValue.replace(/\s/g,'');
    if ( initalValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
};


// new FormControl(field.fieldValue || '', [Validators.required, this.noWhitespace])

// <div *ngIf="yourForm.hasError('whitespace')">Please enter valid text</div>

// public noWhitespace(control: FormControl) {
//   let isWhitespace = (control.value || '').trim().length === 0;
//   let isValid = !isWhitespace;
//   return isValid ? null : { 'whitespace': true }
// }
