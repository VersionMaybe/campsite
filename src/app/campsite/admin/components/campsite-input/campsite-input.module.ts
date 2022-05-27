import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiTextComponent } from './ci-text/ci-text.component';
import { FormsModule } from '@angular/forms';
import { CiSelectComponent } from './ci-select/ci-select.component';
import { CiIconButtonComponent } from './ci-icon-button/ci-icon-button.component';

@NgModule({
  declarations: [
    CiTextComponent,
    CiSelectComponent,
    CiIconButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CiTextComponent,
    CiSelectComponent,
    CiIconButtonComponent
  ]
})
export class CampsiteInputModule { }
