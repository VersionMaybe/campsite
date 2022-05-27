import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-campsite-table-col',
  templateUrl: './campsite-table-col.component.html',
  styleUrls: ['./campsite-table-col.component.scss']
})
export class CampsiteTableColComponent implements AfterViewInit {

  type: 'normal' | 'expand' | 'collapse' = 'normal';

  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'type-' + this.type);
  }

}
