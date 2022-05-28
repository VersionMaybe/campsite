import { Component, Input } from "@angular/core";
import { CampsiteField, CampsiteFieldType } from "./CampsiteField";
import { CampsitePrimitive } from "./CampsitePrimitive";

export type CampsiteBlockFieldsTypes<T extends CampsiteBlock['fields']> = { [P in keyof T]: CampsiteFieldType<T[P]> };

export interface ICampsiteBlock<T extends CampsiteBlock> {
    group: T['group'];
    name: T['name'];
    id: T['id'];
    fields: CampsiteBlockFieldsTypes<T['fields']>;
}

export interface ICampsiteBlockField {
    id: string;
    value: any;
}

@Component({ template: '' })
export abstract class CampsiteBlockComponent<T extends CampsiteBlock> {
    @Input() block!: T;

    setData(data: any, block: CampsitePrimitive<any, {}>) {
        block.set(data);
    }
}

export abstract class CampsiteBlock {
    abstract group: string;
    abstract name: string;
    abstract id: string;
    abstract component: any;
    abstract fields: { [key: string]: CampsiteField };

    label(name: string) {
        this.name = name;
        return this;
    }

    export() {
        const data: any = {};
        Object.keys(this.fields).forEach(key => {
            data[key] = this.fields[key].data.get();
        });

        return data;
    }

    set(data: CampsiteBlockFieldsTypes<this['fields']>) {
        Object.keys(data).forEach(key => {
            this.fields[key].data.set(data[key]);
        });
    }
}