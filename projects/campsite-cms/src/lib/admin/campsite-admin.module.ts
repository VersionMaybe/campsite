import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampsiteAdminRoutingModule } from './campsite-admin-routing.module';
import { CampsiteAdminComponent } from './campsite-admin.component';
import { AdminNavModule } from './components/admin-nav/admin-nav.module';
import { CampsiteRoutingAdminPageModule } from './pages/campsite-routing-admin-page/campsite-routing-admin-page.module';
import { CampsiteEntriesAdminPageModule } from './pages/campsite-entries-admin-page/campsite-entries-admin-page.module';
import { CampsiteModalModule } from './components/campsite-modal/campsite-modal.module';


@NgModule({
  declarations: [CampsiteAdminComponent],
  imports: [
    CommonModule,
    CampsiteAdminRoutingModule,

    // Components
    AdminNavModule,
    CampsiteModalModule,

    // Pages
    CampsiteEntriesAdminPageModule,
    CampsiteRoutingAdminPageModule,
  ],
  exports: [CampsiteAdminComponent],
})
export class CampsiteAdminModule { }
