import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampsiteAdminRoutingModule } from './campsite-admin-routing.module';
import { CampsiteAdminComponent } from './campsite-admin.component';
import { AdminNavModule } from './components/admin-nav/admin-nav.module';
import { CampsiteEntriesAdminPageModule } from './pages/campsite-entries-admin-page/campsite-entries-admin-page.module';


@NgModule({
  declarations: [CampsiteAdminComponent],
  imports: [
    CommonModule,
    CampsiteAdminRoutingModule,

    // Components
    AdminNavModule,

    // Pages
    CampsiteEntriesAdminPageModule
  ],
  exports: [CampsiteAdminComponent],
})
export class CampsiteAdminModule { }
