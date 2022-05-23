import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CampsiteBlock } from 'src/app/campsite/core/definitions/CampsiteBlock';

@Component({
  selector: 'app-block-render',
  templateUrl: './block-render.component.html',
  styleUrls: ['./block-render.component.scss']
})
export class BlockRenderComponent implements AfterViewInit {

  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
  @Input() block!: CampsiteBlock | any;

  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const comp = this.vc.createComponent(this.block.component) as any;
      comp.instance['block'] = this.block;
    }, 0);
  }

}
