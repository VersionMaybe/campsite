import { CampsiteField } from "../definitions/campsite-field";
import { NumberPrimitive } from "../primitives/number-primitive";
import { TextPrimitive } from "../primitives/text-primitive";

export class UrlField extends CampsiteField {
    group = 'Core';
    name = 'URL';
    id = 'url';
    data = new TextPrimitive('', {
        min_length: new NumberPrimitive(0),
        max_length: new NumberPrimitive(50),
    });
}