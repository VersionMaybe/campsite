import { CampsitePrimitive } from "../definitions/CampsitePrimitive";
import { NumberPrimitive } from "./number-primitive";
import { StringPrimitive } from "./string-primitive";

export class TextPrimitive extends CampsitePrimitive<string, {
    min_length: NumberPrimitive,
    max_length: NumberPrimitive,
}> {
    validate(value: any) {
        if (typeof value !== 'string') return 'Value needs to be of type: String';
        if (this.settings.min_length.value > 0 && this.value?.length < this.settings.min_length.value) return 'Text is too short';
        if (this.settings.max_length.value > 0 && this.value?.length > this.settings.min_length.value) return 'Text is too long';
        return null;
    }
}