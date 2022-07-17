import { CampsiteTemplate, CampsiteEntryBlockTypes } from "./CampsiteTemplate";
import { CampsiteRouteType, ICampsiteRoute } from "./CampsiteRoute";
import { ICampsiteEntry } from "./CampsiteEntry";
import { Route, Routes } from "@angular/router";
import { CampsiteDataResolver } from "../resolvers/campsite.resolver";
import { CampsiteSimpleGuard } from "../guards/campsite-simple.guard";
import { InjectionToken } from "@angular/core";
import { ICampsiteUser } from "./CampsiteUser";

export const PRELOADED_ROUTES = new InjectionToken<Route[]>('CampsitePreloadedRoutes')

export abstract class CampsiteDataProvider {

    // Generators
    public generateID(): string {
        const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'
        let autoId = ''
        for (let i = 0; i < 20; i++) {
            autoId += CHARS.charAt(
                Math.floor(Math.random() * CHARS.length)
            )
        }
        return autoId;
    }

    public async preloadRoutes(templates: CampsiteTemplate[]) {
        const routes = await this.getAllRoutes();
        const configRoutes: Routes = [];

        routes.forEach((e) => {
            const component = templates.find((x) => x.id === e.template);

            configRoutes.push({
                path: e.path,
                component: component?.component,
                data: {
                    campsiteData: e
                },
                canActivate: [CampsiteSimpleGuard],
                resolve: {
                    campsiteEntryData: CampsiteDataResolver
                }
            })
        })

        return [
            ...configRoutes,
            { path: 'admin', loadChildren: () => import('../../admin/campsite-admin.module').then(m => m.CampsiteAdminModule) },
            { path: '**', redirectTo: '404' },
            { path: '**', redirectTo: '' }
        ]
    }

    // Users
    public abstract getUserDetails(uid: string): Promise<ICampsiteUser>;
    public abstract setUserDetails(uid: string, details: Partial<ICampsiteUser>): Promise<boolean>;
    public abstract getCurrentUserDetails(): Promise<ICampsiteUser>;
    public abstract login(): Promise<ICampsiteUser>;
    public abstract logout(): Promise<void>;

    // Routes
    public abstract getAllRoutes(): Promise<ICampsiteRoute[]>;
    public abstract getDataForRoute<T extends CampsiteTemplate>(routeID: string): Promise<ICampsiteEntry<T> | undefined>;

    public abstract setRoute(details: ICampsiteRoute): Promise<boolean>;
    public abstract removeRoute(details: ICampsiteRoute): Promise<boolean>;

    // Entries
    public abstract getAllEntries(): Promise<ICampsiteEntry<any>[]>;

    public abstract getEntryForSingle<T extends CampsiteTemplate>(path: string): Promise<ICampsiteEntry<T> | undefined>;
    public abstract setEntryForSingle<T extends CampsiteTemplate>(path: string, data: ICampsiteEntry<T>): Promise<boolean>;
    public abstract removeEntryForSingle(path: string): Promise<boolean>;

    public abstract uploadFile(file: File): Promise<string>;
}
