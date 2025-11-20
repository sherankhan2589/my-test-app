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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  ],
})
export class AdminModule {}
