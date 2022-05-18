export enum CampsiteRouteType {
    Single = 'single'
}

export interface ICampsiteRoute {
    path: string;
    entry: string;
    type: CampsiteRouteType;
}