import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampsiteModalComponent } from './campsite-modal.component';
import { CampsiteEditEntryModule } from '../../modals/campsite-edit-entry/campsite-edit-entry.module';



@NgModule({
  declarations: [
    CampsiteModalComponent
  ],
  imports: [
    CommonModule,

    // Modals
    CampsiteEditEntryModule
  ],
  exports: [
    CampsiteModalComponent
  ],
})
export class CampsiteModalModule { }
