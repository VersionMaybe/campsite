import { NodeWithI18n } from "@angular/compiler";
import { Component } from "@angular/core";
import { QuoteBlock } from "../blocks/quote-block";
import { CampsiteDataService } from "../services/campsite-data.service";
import { CampsiteBlock, CampsiteBlockFieldsTypes } from "./campsite-block";

export type CampsiteEntryBlocksData<T extends CampsiteEntry> = { [P in keyof T['blocks']]: string };
export type CampsiteEntryBlockTypes<T extends CampsiteEntry> = { [P in keyof T['blocks']]: CampsiteBlockFieldsTypes<T['blocks'][P]['fields']> };

export interface ICampsiteEntry<T extends CampsiteEntry> {
    name: T['name'];
    id: T['id'];
    blocks: CampsiteEntryBlocksData<T>;
}

@Component({ template: '' })
export abstract class CampsiteEntryComponent<T extends CampsiteEntry> {
    blocks!: CampsiteEntryBlockTypes<T>;

    constructor(
        private campsiteDataService: CampsiteDataService
    ) {
        this.campsiteDataService.getCurrentRouteData().then((e) => {
            if (!e) {
                console.log('Failed to load data...');
            } else {
                console.log('Data', e);
                this.campsiteDataService.hydrateRouteWithData(this, e);
            }
        });
    }
}

export abstract class CampsiteEntry {
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