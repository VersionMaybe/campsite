import { CampsitePrimitive } from "../definitions/CampsitePrimitive";

export class StringPrimitive extends CampsitePrimitive<string, {}> {
    validate(value: any) {
        if (typeof value !== 'string') return 'Value needs to be of type: String';
        return null;
    }
}