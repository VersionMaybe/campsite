import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteBlockComponent } from './quote-block.component';
import { CampsiteInputModule } from '../../../admin/components/campsite-input/campsite-input.module';



@NgModule({
  declarations: [
    QuoteBlockComponent
  ],
  imports: [
    CommonModule,
    CampsiteInputModule
  ],
  exports: [
    QuoteBlockComponent
  ],
})
export class QuoteBlockModule { }
