import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from '../../_components/users-component/users-component';
import { DashboardComponent } from '../../_components/dashboard-component/dashboard-component';
import { ComponentHeader } from '../../_components/component-header/component-header';
import { ReactiveFormsModule } from '@angular/forms';
import { InputField } from '../../_base-components/input-field/input-field';
import { ModalHeader } from '../../_base-components/modal-header/modal-header';
import { SelectField } from '../../_base-components/select-field/select-field';
import { DatatableListing } from '../../_base-components/datatable-listing/datatable-listing';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerActions,
  MatDatepickerModule,
  MatDateRangeInput,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSortHeader, MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    UsersComponent,
    DashboardComponent,
    ComponentHeader,
    InputField,
    ModalHeader,
    SelectField,
    DatatableListing,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDateRangeInput,
    MatDatepicker,
    MatDatepickerActions,
    MatDateRangePicker,
    MatInput,
    MatFormField,
    MatDatepickerModule,
    MatDateRangeInput,
    MatCheckbox,
    MatPaginator,
    MatProgressBar,
    MatTable,
    MatIcon,
    MatColumnDef,
    HttpClientModule,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatRowDef,
    MatSortHeader,
    MatSortModule,
    MatHeaderRow,
    MatRow,
    MatCell,
    MatHeaderCell,
  ],
})
export class AdminModule {}
