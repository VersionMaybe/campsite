export interface IAdminItem {
    id: string;
    label: string;
    icon: string;
    alerts?: number;
    component?: any;
    children?: IAdminItemChild[];
}

export interface IAdminItemChild {
    id: string;
    label: string;
    component?: any;
}