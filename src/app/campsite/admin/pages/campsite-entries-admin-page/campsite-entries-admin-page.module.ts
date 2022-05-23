import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampsiteEntriesAdminPageComponent } from './campsite-entries-admin-page.component';
import { CampsitePageHeaderModule } from '../../components/campsite-page-header/campsite-page-header.module';
import { CampsiteTableModule } from '../../components/campsite-table/campsite-table.module';
import { FormsModule } from '@angular/forms';
import { CampsiteInputModule } from '../../components/campsite-input/campsite-input.module';



@NgModule({
  declarations: [
    CampsiteEntriesAdminPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CampsitePageHeaderModule,

    CampsiteInputModule,
    CampsiteTableModule
  ],
  exports: [
    CampsiteEntriesAdminPageComponent
  ],
})
export class CampsiteEntriesAdminPageModule { }
