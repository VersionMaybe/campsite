import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampsiteTableComponent } from './campsite-table.component';
import { CampsiteTableRowComponent } from '../campsite-table-row/campsite-table-row.component';
import { CampsiteTableColComponent } from '../campsite-table-col/campsite-table-col.component';



@NgModule({
  declarations: [
    CampsiteTableComponent,
    CampsiteTableRowComponent,
    CampsiteTableColComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CampsiteTableComponent,
    CampsiteTableRowComponent,
    CampsiteTableColComponent,
  ]
})
export class CampsiteTableModule { }
