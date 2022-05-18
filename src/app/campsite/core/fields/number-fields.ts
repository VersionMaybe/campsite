import { CampsiteField } from "../definitions/campsite-field";
import { NumberPrimitive } from "../primitives/number-primitive";
import { TextPrimitive } from "../primitives/text-primitive";

export class NumberField extends CampsiteField {
    group = 'Core';
    name = 'Number';
    id = 'number';
    data = new NumberPrimitive(0);
}