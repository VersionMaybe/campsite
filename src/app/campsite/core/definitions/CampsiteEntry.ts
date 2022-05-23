import { CampsiteTemplate } from "./CampsiteTemplate";

export interface ICampsiteEntry<T extends CampsiteTemplate> {
    meta: ICampsiteEntryMeta
    template: T['id'];
    data: ReturnType<T['export']>
}

export interface ICampsiteEntryMeta {
    title: string;
    date_created: number;
    date_last_updated: number;
    enabled: boolean;
    linked_route: string;
}