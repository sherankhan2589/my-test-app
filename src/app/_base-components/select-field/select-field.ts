import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-select-field',
  standalone: false,
  templateUrl: './select-field.html',
  styleUrl: './select-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectField),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectField),
      multi: true,
    },
  ],
})
export class SelectField implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() fieldName: string = '';
  @Input() labelClass: string = '';
  @Input() validationMessages: any = {};
  @Input() apiErrors: any = {};
  @Input() placeholder: string = 'Enter text';
  @Input() required: boolean = false;
  @Input() showRequired: boolean = true;
  @Input() isMultiSelect: boolean = false;
  @Input() preIcon: string = 'ph-text-aa';
  @Input() dataList: any[] = [];
  @Input() isEnabledSearch = false;
  @Input() enableSelectAll = false;
  @Input() readOnly: boolean = false;
  @Input() showError: boolean = true;
  @Output() change = new EventEmitter<any>();
  @ViewChild('pageFormSelect') pageFormSelect!: MatSelect;

  value: any;
  selectedValues: any;
  control!: FormControl;
  filterControl = new FormControl('');
  selectAllControl = new FormControl(true);
  filteredOptions: any[] = [];
  touched = false;
  disabled = false;
  searchTerm: string = '';
  isAllSelected = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataList']) {
      this.filteredOptions = [...this.dataList];
      this.isAllSelected = this.selectedValues?.length == this.dataList.length;
      this.selectAllControl.setValue(this.isAllSelected, { emitEvent: false });
    }
  }

  ngOnInit(): void {
    this.filterControl.valueChanges.subscribe((search) => {
      this.applyFilter(search);
      if (!search || search.length == 0) {
        this.selectedValues = [...this.value];
      }
    });

    this.selectAllControl.valueChanges.subscribe((isChecked: any) => {
      if (isChecked) {
        this.selectedValues = this.filteredOptions.map((item) => item.id);
      } else {
        this.selectedValues = [];
      }
      this.value = [...this.selectedValues];
      this.updateValue();
    });
  }

  applyFilter(searchText: string | null): void {
    if (!searchText || searchText.length === 0) {
      this.filteredOptions = [...this.dataList];
      this.selectedValues.push(...this.value);
      this.selectAllControl.enable({ emitEvent: false });
      return;
    }
    this.selectAllControl.disable({ emitEvent: false });

    const lower = searchText.toLowerCase();
    this.filteredOptions = this.dataList.filter((opt) => opt.name.toLowerCase().includes(lower));
  }

  // ControlValueAccessor
  writeValue(value: any[]): void {
    if (this.isMultiSelect) {
      this.value = Array.isArray(value) ? [...value] : [];
      this.selectedValues = this.value ? [...this.value] : [];
    } else {
      this.value = value ?? null;
      this.selectedValues = this.value ? this.value : null;
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    event.stopPropagation();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ---- Event handlers ----
  onSelectionChange(selectedValues: any[]): void {}

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  // ---- Validation ----
  validate(control: FormControl): ValidationErrors | null {
    this.control = control;
    /*
    if (this.required && (!this.value || this.value.length === 0)) {
      return { required: true }
    } 
    */
    return null;
  }

  onChange: (value: any[]) => void = () => {};
  onTouched: () => void = () => {};

  compareWithFn(a: any, b: any): boolean {
    return a === b;
  }

  ngAfterViewInit() {
    this.pageFormSelect.optionSelectionChanges.subscribe((e: any) => {
      if (e.isUserInput) this.onChangeOption(e.source.value, e.source.selected);
    });
  }

  onChangeOption(sourceId: any, isSelected: boolean) {
    if (this.isMultiSelect) {
      if (isSelected) {
        if (!this.value.includes(sourceId)) {
          this.value.push(sourceId);
        }
      } else {
        const index = this.value.indexOf(sourceId);
        if (index >= 0) {
          this.value.splice(index, 1);
        }
      }
    } else {
      // Single select fix
      this.value = isSelected ? sourceId : null;
    }

    this.updateValue();
    this.updateSelectAllState();
  }

  updateValue() {
    this.onChange(this.value);
    this.change.emit(this.value);
    this.markAsTouched();
  }

  updateSelectAllState() {
    const allSelected = this.value.length === this.dataList.length;
    this.isAllSelected = allSelected;
    this.selectAllControl.setValue(allSelected, { emitEvent: false });
  }
}
