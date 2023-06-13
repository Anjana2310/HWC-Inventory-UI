import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableFormControl]'
})
export class DisableFormControlDirective {

  @Input()
  set disableFormControl(condition: boolean) {
    const action = this.ngControl.control.parent.disabled || condition ? 'disable' : 'enable';
    if (action == 'disable' && !this.ngControl.control.parent.disabled)
      this.ngControl.control.setValue(null);
    // this.ngControl.control.markAsTouched();
    this.ngControl.control[action]();

    // if (this.ngControl && this.ngControl.control) {
    //   const formStatus = this.ngControl.control.parent && this.ngControl.control.parent.disabled;
    //   const controlStatus = this.ngControl.control.disabled;

    //   if (!(formStatus || controlStatus)) {
    //     const action = condition ? 'disable' : 'enable';
    //     if (action == 'disable') {
    //       this.ngControl.control.setValue(null);
    //     }
    //     this.ngControl.control[action]();
    //   }
    // }
  }

  constructor(private ngControl: NgControl) {
  }

}
