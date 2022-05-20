import { CampsiteDataProvider } from "../definitions/CampsiteDataProvider";
import { ICampsiteRoute } from "../definitions/CampsiteRoute";
import { FirebaseOptions } from '@angular/fire/app';


export class FirebaseDataProvider extends CampsiteDataProvider {

    constructor(options: FirebaseOptions) {
        super();
    }

    private satanisePath(path: string) {
        return this.replaceAll(path, '/', '\\');
    }

    private replaceAll(string: string, find: string, replace: string) {
        return string.replace(new RegExp(find, 'g'), replace);
    }

    public getDataForSingle(path: string) {
        path = this.satanisePath(path);
        const item = localStorage.getItem(`campsite/entries/singles/${path}`);
        return item ? JSON.parse(item) : undefined;
    }

    public async setDataForSingle(path: string, data: any) {
        path = this.satanisePath(path);
        localStorage.setItem(`campsite/entries/singles/${path}`, JSON.stringify(data));
        return true;
    }

    public async setRoute(details: ICampsiteRoute) {
        const routes = await this.getAllRoutes();
        const existing = routes.findIndex((x) => x.id === details.id);

        if (existing === -1) routes.push(details);
        else routes[existing] = details;

        localStorage.setItem(`campsite/routes`, JSON.stringify(routes));
        return true;
    }

    public async removeRoute(details: ICampsiteRoute) {
        const routes = await this.getAllRoutes();
        const existing = routes.findIndex((x) => x.id === details.id);

        if (existing === -1) return false;
        else routes.splice(existing, 1);

        localStorage.setItem(`campsite/routes`, JSON.stringify(routes));
        return true;
    }

    public getAllRoutes(): Promise<ICampsiteRoute[]> {
        return new Promise((res) => {
            const item = localStorage.getItem(`campsite/routes`);
            const routes = item ? JSON.parse(item) : [];
            res(routes);
        })
    }

    public async getAllEntries() {
        let localKeys: any = {};

        for (var key in localStorage) {
            if (key.startsWith('campsite/entries')) {
                const data = localStorage.getItem(key);
                if (data) localKeys[key] = JSON.parse(data);
            }
        }

        return localKeys;
    }
}