export enum CampsiteRouteType {
    Single = 'Single',
    Dynamic = 'Dynamic',
}

export interface ICampsiteRoute {
    id: string;
    path: string;
    entry: string;
    type: CampsiteRouteType;
    waitForData?: boolean;
}