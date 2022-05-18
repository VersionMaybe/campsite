import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampsiteAdminRoutingModule } from './campsite-admin-routing.module';
import { CampsiteAdminComponent } from './campsite-admin.component';
import { AdminNavModule } from './components/admin-nav/admin-nav.module';


@NgModule({
  declarations: [CampsiteAdminComponent],
  imports: [
    CommonModule,
    CampsiteAdminRoutingModule,
    AdminNavModule
  ],
  exports: [CampsiteAdminComponent],
})
export class CampsiteAdminModule { }
