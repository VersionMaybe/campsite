import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampsiteEntriesAdminPageComponent } from './campsite-entries-admin-page.component';
import { CampsitePageHeaderModule } from '../../components/campsite-page-header/campsite-page-header.module';



@NgModule({
  declarations: [CampsiteEntriesAdminPageComponent],
  imports: [
    CommonModule,

    CampsitePageHeaderModule
  ],
  exports: [CampsiteEntriesAdminPageComponent],
})
export class CampsiteEntriesAdminPageModule { }
