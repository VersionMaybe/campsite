import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CampsiteEntry, CampsiteEntryBlockTypes, CampsiteEntryComponent } from "../definitions/CampsiteEntry";
import { CampsiteRouteType, ICampsiteRoute } from "../definitions/CampsiteRoute";

@Injectable({
    providedIn: 'root'
})
export class CampsiteDataService {

    constructor(
        private route: ActivatedRoute
    ) { }

    public async getCurrentRouteData(component?: CampsiteEntryComponent<any>) {
        const snapshot = this.route.firstChild?.snapshot;
        if (!snapshot) return null;
        const data = await this.getRouteData(snapshot.data['campsiteData'], snapshot.params);
        if (component) this.hydrateRouteWithData(component, data);
        return data;
    }

    public async getRouteData(route: ICampsiteRoute, params?: any) {
        switch (route.type) {
            case CampsiteRouteType.Single:
                return await this.getDataForSingle(route.path);
            default:
                return undefined;

        }
    }

    public hydrateRouteWithData(component: CampsiteEntryComponent<any>, data: any) {
        component.blocks = data;
    }

    public satanisePath(path: string) {
        return this.replaceAll(path, '/', '\\');
    }

    private replaceAll(string: string, find: string, replace: string) {
        return string.replace(new RegExp(find, 'g'), replace);
    }

    public async getDataForSingle<T extends CampsiteEntry>(path: string): Promise<CampsiteEntryBlockTypes<T> | undefined> {
        path = this.satanisePath(path);
        // TODO: Make this pull from firebase
        const item = localStorage.getItem(`campsite/entries/singles/${path}`);
        return item ? JSON.parse(item) : undefined;
    }

    public async setDataForSingle<T extends CampsiteEntry>(path: string, data: CampsiteEntryBlockTypes<T>) {
        path = this.satanisePath(path);
        // TODO: Make this pull from firebase
        localStorage.setItem(`campsite/entries/singles/${path}`, JSON.stringify(data));
    }

    public getAllRoutes(): Promise<ICampsiteRoute[]> {
        return new Promise((res) => {
            // TODO: Make this pull from firebase
            setTimeout(() => {
                res([
                    {
                        path: 'landing',
                        entry: 'landingPage',
                        type: CampsiteRouteType.Single
                    },
                    {
                        path: 'another-page/haydn',
                        entry: 'landingPage',
                        type: CampsiteRouteType.Single
                    }
                ])
            }, 0);
        })
    }
}