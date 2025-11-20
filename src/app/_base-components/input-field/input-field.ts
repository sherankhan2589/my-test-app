import { Component, forwardRef, Host, Input, Optional, signal, SkipSelf } from '@angular/core';
import {
  FormControl,
  ControlContainer,
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroupDirective,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: false,
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputField),
      multi: true,
    },
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class InputField implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() fieldName: string = '';
  @Input() labelClass: any = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() minLength: number = 3;
  @Input() maxLength: number = 5;
  @Input() required: boolean = false;
  @Input() showRequired: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() error: string = '';
  @Input() showErrors: boolean = false;
  @Input() validationMessage: string = '';

  controls!: FormControl;
  value: any;
  touched = signal<boolean>(false);
  disabled = signal<boolean>(false);

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {}
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  onValidationChange: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  markAsTouched(): void {
    if (!this.touched()) {
      this.onTouched();
      this.touched.set(true);
    }
  }

  ngOnInit() {}

  inputOnChnage(event: Event): void {
    const inputValue = event.target as HTMLInputElement;
    this.value = inputValue.value;
    this.onChange(this.value);
    this.markAsTouched();
  }
}
