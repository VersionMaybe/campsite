import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampsiteEntriesAdminPageComponent } from './campsite-entries-admin-page.component';
import { CampsitePageHeaderModule } from '../../components/campsite-page-header/campsite-page-header.module';
import { CampsiteTableModule } from '../../components/campsite-table/campsite-table.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CampsiteEntriesAdminPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CampsitePageHeaderModule,

    CampsiteTableModule
  ],
  exports: [
    CampsiteEntriesAdminPageComponent
  ],
})
export class CampsiteEntriesAdminPageModule { }
