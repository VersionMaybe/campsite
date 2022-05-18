import { CampsitePrimitive } from "../definitions/campsite-primitive";

export class NumberPrimitive extends CampsitePrimitive<number, {}> {
    validate(value: any) {
        if (typeof value !== 'number') return 'Value needs to be of type: Number';
        return null;
    }
}