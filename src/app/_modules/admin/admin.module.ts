import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from '../../_components/users-component/users-component';
import { DashboardComponent } from '../../_components/dashboard-component/dashboard-component';
import { ComponentHeader } from '../../_components/component-header/component-header';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, DashboardComponent, ComponentHeader],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
