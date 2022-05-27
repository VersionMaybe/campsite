import { Component } from "@angular/core";
import { CampsiteDataService } from "../services/campsite-data.service";
import { CampsiteBlock, CampsiteBlockFieldsTypes } from "./CampsiteBlock";
import { ICampsiteEntryMeta } from "./CampsiteEntry";

export type CampsiteEntryBlocksData<T extends CampsiteTemplate> = { [P in keyof T['blocks']]: string };
export type CampsiteEntryBlockTypes<T extends CampsiteTemplate> = { [P in keyof T['blocks']]: CampsiteBlockFieldsTypes<T['blocks'][P]['fields']> };

export interface ICampsiteTemplate<T extends CampsiteTemplate> {
    name: T['name'];
    id: T['id'];
    blocks: CampsiteEntryBlocksData<T>;
}

@Component({ template: '' })
export abstract class CampsiteTemplateComponent<T extends CampsiteTemplate> {
    meta!: ICampsiteEntryMeta;
    blocks!: CampsiteEntryBlockTypes<T>;

    constructor(
        private campsiteDataService: CampsiteDataService
    ) { this.campsiteDataService.getCurrentRouteData(this); }
}

export abstract class CampsiteTemplate {
    abstract name: string;
    abstract id: string;
    abstract blocks: { [key: string]: CampsiteBlock };
    abstract component?: any;

    export() {
        const data: any = {};
        Object.keys(this.blocks).forEach(key => {
            data[key] = this.blocks[key].export();
        });
        return data;
    }

    set(data: CampsiteEntryBlocksData<this>) {
        Object.keys(data).forEach(key => {
            this.blocks[key].set(JSON.parse(data[key]));
        });
    }
}