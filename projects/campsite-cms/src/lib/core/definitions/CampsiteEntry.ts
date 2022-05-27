import { CampsiteTemplate } from "./CampsiteTemplate";

export interface ICampsiteEntry<T extends CampsiteTemplate> {
    meta: ICampsiteEntryMeta
    data: ReturnType<T['export']>
}

export interface ICampsiteEntryMeta {
    title: string;
    id: string;
    date_created: number;
    date_last_updated?: number;
    enabled: boolean;
    linked_route: string;
}