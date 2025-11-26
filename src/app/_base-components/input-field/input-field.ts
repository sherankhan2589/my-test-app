import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  Optional,
  Output,
  signal,
  SkipSelf,
} from '@angular/core';
import {
  FormControl,
  ControlContainer,
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';
import { DateRangeValues } from '../../_models/base-model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  @Input() radioValue: any;
  @Input() error: string = '';
  @Input() validationMessage: string = '';
  @Input() apiErrors: any = {};
  @Input() dateRangeValues: DateRangeValues = { start: null, end: null };
  @Input() showError: boolean = false;
  @Input() required: boolean = false;
  @Input() showRequired: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() showPickerHint: boolean = true;
  @Output() change = new EventEmitter<any>();
  @Output() keyupEvent = new EventEmitter<string>();

  control!: FormControl;
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

  validate(control: FormControl): ValidationErrors | null {
    this.control = control;
    return null;
  }

  writeValue(value: any): void {
    this.value = value;
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

  ngOnInit() {
    if (this.controlContainer && this.fieldName) {
      this.control = this.controlContainer.control?.get(this.fieldName) as FormControl;
    }
  }

  inputOnChnage(event: Event): void {
    const inputValue = event.target as HTMLInputElement;
    this.value = inputValue.value;
    this.onChange(this.value);
    this.markAsTouched();
  }

  onKeyUp(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.keyupEvent.emit(value);
  }

  onInputChangeMatDate(event: MatDatepickerInputEvent<Date>): void {
    this.value.set(event.value);
    this.onChange(this.value);
    this.markAsTouched();
  }

  onInputChangeDateTime(event: any) {
    const value = event.target.value;
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('en-GB', { hour12: true });
  }

  onInputChangeMatDatePicker(
    event: MatDatepickerInputEvent<Date>,
    inputType: string = 'start'
  ): void {
    if (inputType === 'start') {
      this.dateRangeValues.start = event.value;
      this.dateRangeValues.end = null;
    } else {
      this.dateRangeValues.end = event.value;
      this.value.set(event.value);
      if (event.value != null) {
        this.change.emit(this.dateRangeValues);
      }
      this.onChange(this.value);
      this.markAsTouched();
    }
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.control?.setValue(input.checked);
    this.markAsTouched();
  }
  onRadioChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.control?.setValue(input.value);
    this.markAsTouched();
  }
}
