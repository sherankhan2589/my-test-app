import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './_layouts/admin/admin';

const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./_modules/admin/admin.module').then((m) => m.AdminModule),
      },
      { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
