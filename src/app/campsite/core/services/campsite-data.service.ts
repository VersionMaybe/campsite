import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CampsiteModule } from "../campsite.module";
import { CampsiteDataProvider } from "../definitions/CampsiteDataProvider";
import { CampsiteEntry, CampsiteEntryBlockTypes, CampsiteEntryComponent } from "../definitions/CampsiteEntry";
import { CampsiteRouteType, ICampsiteRoute } from "../definitions/CampsiteRoute";

@Injectable({
    providedIn: 'root'
})
export class CampsiteDataService {

    dataProvider!: CampsiteDataProvider;

    constructor(
        private route: ActivatedRoute
    ) {
        this.dataProvider = CampsiteModule.dataProvider;
    }

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
        return await this.dataProvider.getDataForSingle(path);
    }

    public async setDataForSingle<T extends CampsiteEntry>(path: string, data: CampsiteEntryBlockTypes<T>) {
        return await this.dataProvider.setDataForSingle(path, data);
    }

    public getAllRoutes(): Promise<ICampsiteRoute[]> {
        return this.dataProvider.getAllRoutes();
    }
}