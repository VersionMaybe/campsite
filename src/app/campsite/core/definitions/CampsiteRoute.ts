export enum CampsiteRouteType {
    Static = 'single',
    Dynamic = 'multiple',
}

export interface ICampsiteRoute {
    path: string;
    entry: string;
    type: CampsiteRouteType;
    waitForData?: boolean;
}