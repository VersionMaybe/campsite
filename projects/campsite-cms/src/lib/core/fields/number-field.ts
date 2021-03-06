import { CampsiteField } from "../definitions/CampsiteField";
import { NumberPrimitive } from "../primitives/number-primitive";

export class NumberField extends CampsiteField {
    group = 'Core';
    name = 'Number';
    id = 'number';
    data = new NumberPrimitive(0);
}