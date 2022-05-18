import { IAdminItem } from "../../admin/definitions/IAdminItem";
import { CampsiteDataProvider } from "./CampsiteDataProvider";

export interface CampsiteConfig {
    pageModules?: any[]
    dataProvider?: CampsiteDataProvider;
    adminExtensions?: IAdminItem[];
}