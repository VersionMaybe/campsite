import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBlockComponent } from './list-block.component';
import { BlockRenderModule } from '../../../admin/components/block-render/block-render.module';
import { CampsiteInputModule } from '../../../admin/components/campsite-input/campsite-input.module';



@NgModule({
  declarations: [
    ListBlockComponent
  ],
  imports: [
    CommonModule,
    CampsiteInputModule,
    BlockRenderModule
  ],
  exports: [
    ListBlockComponent
  ],
})
export class ListBlockModule { }
