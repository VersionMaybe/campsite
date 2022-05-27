import { CampsiteTemplate } from "./CampsiteTemplate";

export enum CampsiteRouteType {
    Single = 'Single',
    Dynamic = 'Dynamic',
}

export interface ICampsiteRoute {
    id: string;
    path: string;
    template: string;
    type: CampsiteRouteType;
    waitForData?: boolean;
}