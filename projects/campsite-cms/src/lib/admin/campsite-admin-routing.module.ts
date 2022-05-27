import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampsiteAdminComponent } from './campsite-admin.component';

const routes: Routes = [
  {
    path: '',
    component: CampsiteAdminComponent
  },
  {
    path: ':item',
    component: CampsiteAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampsiteAdminRoutingModule { }
