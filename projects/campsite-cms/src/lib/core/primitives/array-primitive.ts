import { CampsitePrimitive } from "../definitions/CampsitePrimitive";

export class ArrayPrimitive<T> extends CampsitePrimitive<T[], {}> {
    validate(value: T[]): string | null {
        return Array.isArray(value) ? null : 'Value needs to be an Array.';
    }
}