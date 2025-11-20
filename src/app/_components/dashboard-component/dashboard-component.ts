import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-component',
  standalone: false,
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
})
export class DashboardComponent {
  formData = signal<[]>([]);

  _form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.formData.update((res) => (res = this._form.value));
    this._form.reset();
    console.warn(this.formData());
  }

  // numberOnly(event: any) {
  //   event.target.value = event.target.value.replace(/[^0-9]/g, '');
  //   this._form.get('password')?.setValue(event.target.value);
  // }
}
