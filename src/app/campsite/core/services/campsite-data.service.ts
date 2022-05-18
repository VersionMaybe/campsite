import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LandingPage } from "../../example/pages/landing-page/landing-page.component";
import { CampsiteEntry, CampsiteEntryBlockTypes, CampsiteEntryComponent } from "../definitions/campsite-entry";
import { CampsiteRouteType, ICampsiteRoute } from "../definitions/ICampsiteRouteData";

@Injectable({
    providedIn: 'root'
})
export class CampsiteDataService {

    constructor(
        private route: ActivatedRoute
    ) { }

    public async getCurrentRouteData() {
        const snapshot = this.route.firstChild?.snapshot;
        if (!snapshot) return null;
        return await this.getRouteData(snapshot.data['campsiteData'], snapshot.params);
    }

    public async getRouteData(route: ICampsiteRoute, params?: any) {
        if (route.type === CampsiteRouteType.Single) {
            return await this.getDataForSingle(route.path);
        }

        return null;
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
            }, 500);
        })
    }
}