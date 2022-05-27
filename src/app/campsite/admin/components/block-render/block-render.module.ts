import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockRenderComponent } from './block-render.component';
import { CampsiteInputModule } from '../campsite-input/campsite-input.module';
import { CampsiteTableModule } from '../campsite-table/campsite-table.module';



@NgModule({
  declarations: [
    BlockRenderComponent
  ],
  imports: [
    CommonModule,
    CampsiteInputModule,
    CampsiteTableModule
  ],
  exports: [
    BlockRenderComponent
  ],
})
export class BlockRenderModule { }
