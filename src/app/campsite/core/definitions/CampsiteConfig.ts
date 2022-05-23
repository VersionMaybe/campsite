import { IAdminItem } from "../../admin/definitions/IAdminItem";
import { CampsiteBlock } from "./CampsiteBlock";
import { CampsiteDataProvider } from "./CampsiteDataProvider";
import { CampsiteTemplate } from "./CampsiteEntry";
import { CampsiteField } from "./CampsiteFieldType";

export interface CampsiteConfig {
    pageModules?: any[]
    dataProvider: CampsiteDataProvider;
    adminExtensions?: IAdminItem[];
    register?: {
        fields?: CampsiteField[];
        blocks?: CampsiteBlock[];
        templates?: CampsiteTemplate[];
    };
}