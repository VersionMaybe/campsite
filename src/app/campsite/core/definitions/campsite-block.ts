import { CampsiteField, CampsiteFieldType } from "./campsite-field";

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

export abstract class CampsiteBlock {
    abstract group: string;
    abstract name: string;
    abstract id: string;
    abstract fields: { [key: string]: CampsiteField };

    export() {
        const data: any = {};
        Object.keys(this.fields).forEach(key => {
            data[key] = this.fields[key].data.get();
        });

        return JSON.stringify(data);
    }

    set(data: CampsiteBlockFieldsTypes<this['fields']>) {
        Object.keys(data).forEach(key => {
            this.fields[key].data.set(data[key]);
        });
    }
}