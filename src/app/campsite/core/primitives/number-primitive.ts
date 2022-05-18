import { CampsitePrimitive } from "../definitions/CampsitePrimitive";

export class NumberPrimitive extends CampsitePrimitive<number, {}> {
    validate(value: any) {
        if (typeof value !== 'number') return 'Value needs to be of type: Number';
        return null;
    }
}