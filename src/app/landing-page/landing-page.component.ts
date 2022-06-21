import { AfterContentChecked, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CampsiteDataService, CampsiteTemplate, CampsiteTemplateComponent, ListBlock, QuoteBlock } from 'campsite-cms';
import { QuoteComponent } from '../templates/sections/quote/quote.component';

export class LandingPage extends CampsiteTemplate {
  name = 'Landing Page';
  id = 'landingPage';
  blocks = {
    quotes: new ListBlock()
      .allowed([
        new QuoteBlock()
      ])
      .label('Testing')
  }
  component = LandingPageComponent;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends CampsiteTemplateComponent<LandingPage> implements AfterContentChecked {
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
  map = [
    { id: new QuoteBlock().id, component: QuoteComponent },
  ];
  done = false;

  constructor(
    private dataService: CampsiteDataService
  ) {
    super(dataService)
  }

  override async ngOnInit() {
    await this.dataService.getCurrentRouteData(this);
    this.load();
  }

  ngAfterContentChecked() {
    this.load();
  }

  load() {
    if (!this.vc || !this.blocks || this.done) return;
    this.done = true;

    this.blocks.quotes.blocks.forEach((e) => {
      const createThis = this.map.find((x) => x.id === e.type) as any;
      const comp = this.vc.createComponent(createThis.component) as any;
      comp.instance['data'] = e.data;
    })
  }
}
