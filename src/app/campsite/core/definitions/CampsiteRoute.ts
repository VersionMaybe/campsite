export enum CampsiteRouteType {
    Static = 'Static',
    Dynamic = 'Dynamic',
}

export interface ICampsiteRoute {
    id: string;
    path: string;
    entry: string;
    type: CampsiteRouteType;
    waitForData?: boolean;
}