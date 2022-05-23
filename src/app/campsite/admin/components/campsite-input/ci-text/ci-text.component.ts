import { Component, Input, OnInit } from '@angular/core';
import { CiBaseComponent } from '../ci-base.component';

@Component({
  selector: 'app-ci-text',
  templateUrl: './ci-text.component.html',
  styleUrls: ['./ci-text.component.scss']
})
export class CiTextComponent extends CiBaseComponent implements OnInit {

  @Input() value: any = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() prefix: string = '';
  @Input() suffix: string = '';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
