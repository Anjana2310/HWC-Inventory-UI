import {
  Directive,
  ElementRef,
  Attribute,
  HostListener,
  Input,
  Injector,
} from "@angular/core";
import { AbstractControl, NgControl } from "@angular/forms";

@Directive({
  selector:
    "[allowMin][formControlName],[allowMin][formControl],[allowMin][ngModel],[allowMin]",
})
export class MinNumberValidator {
  @Input("allowMin")
  public min: number;

  constructor(private elementRef: ElementRef, private injector: Injector) {}

  validate(input) {
    let min = this.min;

    if (+input >= +min) return true;
    else return false;
  }

  @HostListener("input", ["$event"])
  onInput(event: any) {
    let value = event.target.value;
    let ngControl = this.injector.get(NgControl, null) as NgControl;

    if (!this.validate(value)) {
      if (ngControl) ngControl.control.setValue(this.lastValue);
      else event.target.value = this.lastValue;
    }
    this.lastValue = event.target.value;
  }

  lastValue = null;
  @HostListener("focus", ["$event"])
  onFocus(event: any) {
    this.lastValue = event.target.value;
  }
  @HostListener("paste", ["$event"]) blockPaste(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener("copy", ["$event"]) blockCopy(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener("cut", ["$event"]) blockCut(event: KeyboardEvent) {
    event.preventDefault();
  }
}
