import { CampsiteBlock, ICampsiteBlock } from "../definitions/CampsiteBlock";
import { NumberField } from "../fields/number-fields";
import { ParagraphField } from "../fields/paragraph-field";

export class QuoteBlock extends CampsiteBlock {
    group = 'Core';
    name = 'Quote';
    id = 'quote';
    fields = {
        text: new ParagraphField().default('This is a hard-coded quote'),
        likes: new NumberField().default(2),
    };
}