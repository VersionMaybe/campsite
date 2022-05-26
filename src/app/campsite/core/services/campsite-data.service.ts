import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CampsiteModule } from "../campsite.module";
import { CampsiteDataProvider } from "../definitions/CampsiteDataProvider";
import { CampsiteTemplate, CampsiteEntryBlockTypes, CampsiteTemplateComponent } from "../definitions/CampsiteTemplate";
import { CampsiteRouteType, ICampsiteRoute } from "../definitions/CampsiteRoute";
import { ICampsiteEntry } from "../definitions/CampsiteEntry";
import { ICampsiteExport } from "../definitions/CampsiteExport";

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
                return await this.getDataForRoute(route.id);
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

    public async getDataForRoute<T extends CampsiteTemplate>(singleID: string): Promise<ICampsiteEntry<T> | undefined> {
        return await this.dataProvider.getDataForRoute(singleID);
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

    public async exportAll() {
        const routes = await this.getAllRoutes();
        const entries = await this.getAllEntries();
        const campsiteObject: ICampsiteExport = {
            meta: {
                routes
            },
            data: {
                entries
            }
        };


        return new Blob([JSON.stringify(campsiteObject, null, '\t')]);
    }

    public async download(name: string, item: any) {
        const blob = window.URL.createObjectURL(item);
        const element = window.document.createElement('a');
        element.href = blob;
        element.download = name;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}