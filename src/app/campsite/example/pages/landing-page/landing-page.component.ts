import { Component, OnInit } from '@angular/core';
import { QuoteBlock } from 'src/app/campsite/core/blocks/quote-block/quote-block.component';
import { CampsiteTemplate, CampsiteTemplateComponent } from 'src/app/campsite/core/definitions/CampsiteTemplate';
import { CampsiteDataService } from 'src/app/campsite/core/services/campsite-data.service';

export class LandingPage extends CampsiteTemplate {
  name = 'Landing Page';
  id = 'landingPage';
  blocks = {
    heroQuote: new QuoteBlock('Hero Quote')
  }
  component = LandingPageComponent;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends CampsiteTemplateComponent<LandingPage> implements OnInit {
  ngOnInit(): void { }
}
