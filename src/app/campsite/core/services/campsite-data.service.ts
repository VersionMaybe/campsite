import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CampsiteModule } from "../campsite.module";
import { CampsiteDataProvider } from "../definitions/CampsiteDataProvider";
import { CampsiteTemplate, CampsiteEntryBlockTypes, CampsiteTemplateComponent } from "../definitions/CampsiteTemplate";
import { CampsiteRouteType, ICampsiteRoute } from "../definitions/CampsiteRoute";
import { ICampsiteEntry } from "../definitions/CampsiteEntry";

@Injectable({
    providedIn: 'root'
})
export class CampsiteDataService {

    dataProvider!: CampsiteDataProvider;

    preloadedData?: any;

    constructor(
        private route: ActivatedRoute
    ) { this.dataProvider = CampsiteModule.config.dataProvider; }

    public async getCurrentRouteData(component?: CampsiteTemplateComponent<any>) {
        const snapshot = this.route.firstChild?.snapshot;
        if (!snapshot) return null;
        let data: ICampsiteEntry<CampsiteTemplate> | undefined = undefined;

        if (this.preloadedData) {
            data = this.preloadedData;
            this.preloadedData = undefined;
        } else {
            data = await this.getRouteData(snapshot.data['campsiteData'], snapshot.params);
        }

        if (component && data) this.hydrateRouteWithData(component, data);
        return data;
    }

    public async getRouteData(route: ICampsiteRoute, params?: any) {
        switch (route.type) {
            case CampsiteRouteType.Single:
                return await this.getDataForSingle(route.id);
            default:
                return undefined;

        }
    }

    public async putAsidePreloadedData(data: any) {
        this.preloadedData = data;
    }

    public hydrateRouteWithData(component: CampsiteTemplateComponent<any>, data: ICampsiteEntry<any>) {
        component.blocks = data.data;
        component.meta = data.meta;
    }

    public satanisePath(path: string) {
        return this.replaceAll(path, '/', '\\');
    }

    private replaceAll(string: string, find: string, replace: string) {
        return string.replace(new RegExp(find, 'g'), replace);
    }

    public getAllEntries(): Promise<ICampsiteEntry<any>[]> {
        return this.dataProvider.getAllEntries();
    }

    public async getDataForSingle<T extends CampsiteTemplate>(singleID: string): Promise<ICampsiteEntry<T> | undefined> {
        return await this.dataProvider.getDataForSingle(singleID);
    }

    public async setDataForSingle<T extends CampsiteTemplate>(singleID: string, data: ICampsiteEntry<T>) {
        return await this.dataProvider.setDataForSingle(singleID, data);
    }

    public getAllRoutes(): Promise<ICampsiteRoute[]> {
        return this.dataProvider.getAllRoutes();
    }

    public async setRoute(details: ICampsiteRoute) {
        return await this.dataProvider.setRoute(details);
    }

    public async removeRoute(details: ICampsiteRoute) {
        return await this.dataProvider.removeRoute(details);
    }
}