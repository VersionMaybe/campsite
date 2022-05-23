import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiTextComponent } from './ci-text/ci-text.component';
import { FormsModule } from '@angular/forms';
import { CiSelectComponent } from './ci-select/ci-select.component';

@NgModule({
  declarations: [
    CiTextComponent,
    CiSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CiTextComponent,
    CiSelectComponent
  ]
})
export class CampsiteInputModule { }
