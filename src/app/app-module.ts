import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Auth } from './_layouts/auth/auth';
import { Admin } from './_layouts/admin/admin';
import { AdminModule } from './_modules/admin/admin.module';
import { SideNavigationComponent } from './_components/side-navigation-component/side-navigation-component';
import { TopHeaderComponent } from './_components/top-header-component/top-header-component';

@NgModule({
  declarations: [App, Auth, Admin, SideNavigationComponent, TopHeaderComponent],
  imports: [BrowserModule, AppRoutingModule, AdminModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
