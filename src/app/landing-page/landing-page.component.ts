import { Component, OnInit } from '@angular/core';
import { CampsiteTemplate, CampsiteTemplateComponent } from 'campsite-cms';

export class LandingPage extends CampsiteTemplate {
  name = 'Landing Page';
  id = 'landingPage';
  blocks = {
    // heroQuote: new QuoteBlock().label('Hero Text')
  }
  component = LandingPageComponent;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent extends CampsiteTemplateComponent<LandingPage> {
}
