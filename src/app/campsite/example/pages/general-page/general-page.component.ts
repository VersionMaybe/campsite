import { Component, OnInit } from '@angular/core';
import { QuoteBlock } from 'src/app/campsite/core/blocks/quote-block';
import { CampsiteEntry } from 'src/app/campsite/core/definitions/CampsiteEntry';

export class GeneralPage extends CampsiteEntry {
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
