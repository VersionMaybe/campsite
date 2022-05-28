import { CampsiteField } from "../definitions/CampsiteField";
import { NumberPrimitive } from "../primitives/number-primitive";
import { TextPrimitive } from "../primitives/text-primitive";

export class ParagraphField extends CampsiteField {
    group = 'Core';
    name = 'Paragraph';
    id = 'paragraph';
    data = new TextPrimitive('', {
        min_length: new NumberPrimitive(0),
        max_length: new NumberPrimitive(255),
    });
}