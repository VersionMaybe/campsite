import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CiBaseComponent } from '../ci-base.component';

@Component({
  selector: 'app-ci-icon-button',
  templateUrl: './ci-icon-button.component.html',
  styleUrls: ['./ci-icon-button.component.scss']
})
export class CiIconButtonComponent extends CiBaseComponent {
  value: string = '';
  @Output() action = new EventEmitter<void>();

  doAction() {
    if (this.disabled) return;
    this.action.emit();
  }
}
