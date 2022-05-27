import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampsiteRoutingAdminPageComponent } from './campsite-routing-admin-page.component';
import { CampsitePageHeaderModule } from '../../components/campsite-page-header/campsite-page-header.module';
import { CampsiteTableModule } from '../../components/campsite-table/campsite-table.module';
import { CampsiteInputModule } from '../../components/campsite-input/campsite-input.module';



@NgModule({
  declarations: [
    CampsiteRoutingAdminPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CampsitePageHeaderModule,
    CampsiteInputModule,
    CampsiteTableModule
  ],
  exports: [
    CampsiteRoutingAdminPageComponent
  ],
})
export class CampsiteRoutingAdminPageModule { }
