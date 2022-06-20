import { CampsiteTemplate } from "./CampsiteTemplate";

export enum CampsiteRouteType {
    Single = 'Single',
    Dynamic = 'Dynamic',
}

export interface ICampsiteRoute {
    id: string;
    path: string;
    title: string;
    date_created: number;
    template: string;
    type: CampsiteRouteType;
    waitForData?: boolean;
}