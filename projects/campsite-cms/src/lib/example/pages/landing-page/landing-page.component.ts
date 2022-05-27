import { Component, OnInit } from '@angular/core';
import { QuoteBlock } from '../../../core/blocks/quote-block/quote-block.component';
import { CampsiteTemplate, CampsiteTemplateComponent } from '../../../core/definitions/CampsiteTemplate';
import { CampsiteDataService } from '../../../core/services/campsite-data.service';

export class LandingPage extends CampsiteTemplate {
  name = 'Landing Page';
  id = 'landingPage';
  blocks = {
    heroQuote: new QuoteBlock().label('Hero Text')
  }
  component = LandingPageComponent;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends CampsiteTemplateComponent<LandingPage> implements OnInit {
  ngOnInit(): void {
  }
}
