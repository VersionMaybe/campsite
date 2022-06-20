import { Component, OnInit } from '@angular/core';
import { CampsiteBlock, CampsiteBlockComponent } from '../../definitions/CampsiteBlock';
import { NumberField } from '../../fields/number-field';
import { ParagraphField } from '../../fields/paragraph-field';

export class QuoteBlock extends CampsiteBlock {
  group = 'Core';
  name = 'Quote';
  id = 'quote';
  fields = {
    text: new ParagraphField().default('This is a hard-coded quote'),
    likes: new NumberField().default(2),
  };
  component = QuoteBlockComponent;
}

@Component({
  selector: 'app-quote-block',
  templateUrl: './quote-block.component.html',
  styleUrls: ['./quote-block.component.scss']
})
export class QuoteBlockComponent extends CampsiteBlockComponent<QuoteBlock> {
}
