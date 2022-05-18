import { Component, OnInit } from '@angular/core';
import { QuoteBlock } from 'src/app/campsite/core/blocks/quote-block';
import { CampsiteEntry, CampsiteEntryComponent } from 'src/app/campsite/core/definitions/CampsiteEntry';
import { CampsiteDataService } from 'src/app/campsite/core/services/campsite-data.service';

export class LandingPage extends CampsiteEntry {
  name = 'Landing Page';
  id = 'landingPage';
  blocks = {
    heroQuote: new QuoteBlock()
  }
  component = LandingPageComponent;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends CampsiteEntryComponent<LandingPage> implements OnInit {

  constructor(
    private campsiteData: CampsiteDataService
  ) {
    super(campsiteData);
  }

  ngOnInit(): void {
    console.log('Loaded Landing Page!');
  }
}
