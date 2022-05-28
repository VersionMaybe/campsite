import { IAdminItem } from "../../admin/definitions/IAdminItem";
import { CampsiteBlock } from "./CampsiteBlock";
import { CampsiteDataProvider } from "./CampsiteDataProvider";
import { CampsiteTemplate } from "./CampsiteTemplate";
import { CampsiteField } from "./CampsiteField";
import { first, ReplaySubject } from "rxjs";

export interface ICampsiteConfig {
    pageModules?: any[]
    dataProvider: CampsiteDataProvider;
    adminExtensions?: IAdminItem[];
    register?: {
        fields?: CampsiteField[];
        blocks?: CampsiteBlock[];
        templates?: CampsiteTemplate[];
    };
}

export class CampsiteConfig {
    public static version = '0.0.2-a.5';
    public static pageModules?: any[]
    public static dataProvider?: CampsiteDataProvider;
    public static adminExtensions?: IAdminItem[];
    public static register?: {
        fields?: CampsiteField[];
        blocks?: CampsiteBlock[];
        templates?: CampsiteTemplate[];
    };

    public static initialised = new ReplaySubject<boolean>(1);

    public static waitForInitialisation() {
        return CampsiteConfig.initialised.pipe(first()).toPromise();
    }

    public static initialise(options: ICampsiteConfig) {
        Object.keys(options).forEach((key) => {
            console.log(key, options[key as keyof ICampsiteConfig] as any)
            CampsiteConfig[key as keyof typeof CampsiteConfig] = options[key as keyof ICampsiteConfig] as any;
        })
    }
}