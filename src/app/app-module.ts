import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Auth } from './_layouts/auth/auth';
import { Admin } from './_layouts/admin/admin';
import { AdminModule } from './_modules/admin/admin.module';
import { SideNavigationComponent } from './_components/side-navigation-component/side-navigation-component';
import { TopHeaderComponent } from './_components/top-header-component/top-header-component';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule, MatDateRangeInput } from '@angular/material/datepicker';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
import { HttpClientModule } from '@angular/common/http';
import { MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [App, Auth, Admin, SideNavigationComponent, TopHeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
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
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
