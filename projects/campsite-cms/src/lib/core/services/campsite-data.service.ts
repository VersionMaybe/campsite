import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CampsiteDataProvider } from "../definitions/CampsiteDataProvider";
import { CampsiteTemplate, CampsiteEntryBlockTypes, CampsiteTemplateComponent } from "../definitions/CampsiteTemplate";
import { CampsiteRouteType, ICampsiteRoute } from "../definitions/CampsiteRoute";
import { ICampsiteEntry, ICampsiteEntryMeta } from "../definitions/CampsiteEntry";
import { ICampsiteExport } from "../definitions/CampsiteExport";
import { Title } from "@angular/platform-browser";
import { CampsiteConfig } from "../definitions/CampsiteConfig";

@Injectable({
    providedIn: 'root'
})
export class CampsiteDataService {

    get dataProvider(): CampsiteDataProvider {
        return CampsiteConfig.dataProvider as any;
    };
    preloadedData?: any;

    constructor(
        private route: ActivatedRoute,
        private title: Title
    ) { }

    public async getCurrentRouteData(component?: CampsiteTemplateComponent<any>) {
        const snapshot = this.route.firstChild?.snapshot;
        if (!snapshot) return null;
        const data = snapshot.data['campsiteEntryData'] as ICampsiteEntry<CampsiteTemplate> | undefined;
        if (data) this.setMeta(data.meta);
        return data;
    }

    public setMeta(meta: ICampsiteEntryMeta) {
        this.title.setTitle(meta.title);
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

    public hydrate(component: CampsiteTemplateComponent<any>, data: ICampsiteEntry<any>) {
        component.blocks = data.data;
        component.meta = data.meta;
    }

    public satanise(path: string) {
        return this.replaceAll(path, '/', '\\');
    }

    private replaceAll(string: string, find: string, replace: string) {
        return string.replace(new RegExp(find, 'g'), replace);
    }

    // Routes
    public getAllRoutes(): Promise<ICampsiteRoute[]> {
        return this.dataProvider.getAllRoutes();
    }

    public async getDataForRoute<T extends CampsiteTemplate>(singleID: string): Promise<ICampsiteEntry<T> | undefined> {
        return await this.dataProvider.getDataForRoute(singleID);
    }

    public async setRoute(details: ICampsiteRoute) {
        return await this.dataProvider.setRoute(details);
    }

    public async removeRoute(details: ICampsiteRoute) {
        return await this.dataProvider.removeRoute(details);
    }

    // Entries
    public getAllEntries(): Promise<ICampsiteEntry<any>[]> {
        return this.dataProvider.getAllEntries();
    }

    public async getEntryForSingle<T extends CampsiteTemplate>(singleID: string): Promise<ICampsiteEntry<T> | undefined> {
        return await this.dataProvider.getEntryForSingle(singleID);
    }

    public async setEntryForSingle<T extends CampsiteTemplate>(singleID: string, data: ICampsiteEntry<T>) {
        data.meta.date_last_updated = Date.now()
        return await this.dataProvider.setEntryForSingle(singleID, data);
    }

    public async removeEntryForSingle(singleID: string) {
        return await this.dataProvider.removeEntryForSingle(singleID);
    }

    // Config
    public async exportCampsite() {
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

    public importCampsite(file: Blob) {
        return new Promise<boolean>((res) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const data = JSON.parse(String(reader.result)) as ICampsiteExport;
                console.log('Import this please', data);
            }, false);
            reader.readAsText(file);
        })
    }

    public async download(name: string, object: Blob | MediaSource) {
        const blob = window.URL.createObjectURL(object);
        const element = window.document.createElement('a');
        element.href = blob;
        element.download = name;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    public selectFile(type?: string): Promise<File[]> {
        return new Promise((res) => {
            console.log('Opening');
            const element = window.document.createElement('input');
            element.type = 'file';
            element.multiple = false;
            element.accept = type || '*';
            document.body.appendChild(element);
            element.click();
            element.onchange = () => {
                if (element.files && element.files.length > 0) {
                    res(Array.from(element.files));
                } else {
                    res([]);
                }

                document.body.removeChild(element);
            }
        })
    }
}