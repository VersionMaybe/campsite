export enum CampsiteUserPermission {
    Admin = 'admin',
    Owner = 'owner'
}

export interface ICampsiteUser {
    uid: string;
    name: string;
    email: string;
    verified: boolean;
    permissions: CampsiteUserPermission[];
}