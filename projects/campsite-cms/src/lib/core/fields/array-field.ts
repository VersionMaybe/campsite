import { CampsiteField } from "../definitions/CampsiteField";
import { ArrayPrimitive } from "../primitives/array-primitive";
import { NumberPrimitive } from "../primitives/number-primitive";

export class ArrayField<T> extends CampsiteField {
    group = 'Core';
    name = 'Array';
    id = 'array';
    data = new ArrayPrimitive<T>([]);
}