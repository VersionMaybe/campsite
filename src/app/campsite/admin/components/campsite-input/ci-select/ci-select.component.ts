import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CiBaseComponent } from '../ci-base.component';

export class CampsiteSelectOption {
  label: string = '';
  value: any;
  icon?: string;
}

@Component({
  selector: 'app-ci-select',
  templateUrl: './ci-select.component.html',
  styleUrls: ['./ci-select.component.scss']
})
export class CiSelectComponent extends CiBaseComponent {

  @Input() searchable = false;
  @Input() options: CampsiteSelectOption[] = [];
  @Input() selected!: CampsiteSelectOption;
  @Output() selectedChange = new EventEmitter<CampsiteSelectOption>();
  @Input() prefix: string = '';
  @Input() suffix: string = '';

  search = '';

  constructor(
    private element: ElementRef<HTMLElement>
  ) { super(); }

  get value() {
    return this.selected?.value;
  };

  @Input() set value(val: any) {
    this.changeSelected(this.options.find((x) => x.value == val) as any);
  };

  changeSelected(item: CampsiteSelectOption) {
    if (this.selected !== item) {
      this.selected = item;
      this.selectedChange.emit(this.selected);
      this.search = '';
    }
  }

  select(item: CampsiteSelectOption) {
    this.changeSelected(item);
    this.valueChange.emit(this.value);
    this.blur();
  }

  toggle() {
    this.blur();
  }

  blur() {
    if (this.element.nativeElement.contains(document.activeElement)) {
      setTimeout(() => {
        (document.activeElement as HTMLButtonElement).blur();
      }, 50);
    }
  }

}
