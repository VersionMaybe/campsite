import { Component, OnInit } from '@angular/core';
import { QuoteBlock } from 'src/app/campsite/core/blocks/quote-block/quote-block.component';
import { CampsiteTemplate } from 'src/app/campsite/core/definitions/CampsiteTemplate';

export class GeneralPage extends CampsiteTemplate {
  name = 'General Page';
  id = 'generalPage';
  blocks = {
    heroQuote: new QuoteBlock()
  }
  component = GeneralPageComponent;
}

@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss']
})
export class GeneralPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
