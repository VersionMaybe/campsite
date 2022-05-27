import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampsiteEditEntryComponent } from './campsite-edit-entry.component';
import { CampsitePageHeaderModule } from '../../components/campsite-page-header/campsite-page-header.module';
import { CampsiteTableModule } from '../../components/campsite-table/campsite-table.module';
import { CampsiteInputModule } from '../../components/campsite-input/campsite-input.module';
import { BlockRenderModule } from '../../components/block-render/block-render.module';



@NgModule({
  declarations: [CampsiteEditEntryComponent],
  imports: [
    CommonModule,

    CampsitePageHeaderModule,
    CampsiteInputModule,
    CampsiteTableModule,
    BlockRenderModule
  ],
  exports: [CampsiteEditEntryComponent],
})
export class CampsiteEditEntryModule { }
