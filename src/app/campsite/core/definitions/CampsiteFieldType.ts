import { ParsedPropertyType } from "@angular/compiler";
import { CampsitePrimitive, CampsitePrimitiveType } from "./CampsitePrimitive";

export type CampsiteFieldType<T extends CampsiteField> = CampsitePrimitiveType<T['data']>;

export abstract class CampsiteField {
    abstract group: string;
    abstract name: string;
    abstract id: string;
    abstract data: CampsitePrimitive<any, any>;


    public default(value: CampsitePrimitiveType<this['data']>) {
        this.data.set(value);
        return this;
    }
}